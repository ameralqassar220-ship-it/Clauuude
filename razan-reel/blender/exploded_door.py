"""Exploded-door hero shot for Razan ads (Blender 5.x, Cycles CPU).
A black Slim 2x2 aluminium door with fluted bronze glass and two soft-close hinges. The parts start exploded and
assemble: stiles -> rails -> glass -> hinges (snap). Slow camera orbit. Transparent film + shadow catcher, so the
PNG frames can be laid over any reel background.
Usage: python exploded_door.py <out_dir> [--test] [--res 540] [--samples 32]"""
import bpy, math, sys, os
args = sys.argv[1:]; OUT = args[0]; TEST = '--test' in args
RES = int(args[args.index('--res') + 1]) if '--res' in args else 540
SAMPLES = int(args[args.index('--samples') + 1]) if '--samples' in args else 32
FPS, END = 30, 135                                  # 4.5 s
bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene; sc.render.fps = FPS; sc.frame_start, sc.frame_end = 1, END

def mat(name, rgb, rough=.35, metal=0.0, trans=0.0, ior=1.5, coat=0.0):
    m = bpy.data.materials.new(name); nt = m.node_tree; b = nt.nodes['Principled BSDF']
    b.inputs['Base Color'].default_value = (*rgb, 1); b.inputs['Roughness'].default_value = rough
    b.inputs['Metallic'].default_value = metal; b.inputs['Transmission Weight'].default_value = trans; b.inputs['IOR'].default_value = ior
    b.inputs['Coat Weight'].default_value = coat
    return m, nt, b
# matte-black anodised aluminium
ALU, _, _ = mat('alu', (.025, .025, .028), .32, 1.0, coat=.15)
# fluted bronze glass: vertical ribs via a wave texture driving a bump node
GLASS, nt, b = mat('glass', (.62, .43, .27), .03, 0, 1.0, 1.5)
wave = nt.nodes.new('ShaderNodeTexWave'); wave.wave_type = 'BANDS'; wave.bands_direction = 'X'; wave.wave_profile = 'SIN'
wave.inputs['Scale'].default_value = 26; tc = nt.nodes.new('ShaderNodeTexCoord'); nt.links.new(tc.outputs['Object'], wave.inputs['Vector'])
bump = nt.nodes.new('ShaderNodeBump'); bump.inputs['Strength'].default_value = .55
nt.links.new(wave.outputs['Fac'], bump.inputs['Height']); nt.links.new(bump.outputs['Normal'], b.inputs['Normal'])
HINGE, _, _ = mat('hinge', (.72, .72, .74), .22, 1.0)

def box(name, dims, loc, m, bevel=.003):
    bpy.ops.mesh.primitive_cube_add(location=loc); o = bpy.context.object; o.name = name
    o.scale = (dims[0] / 2, dims[1] / 2, dims[2] / 2); bpy.ops.object.transform_apply(scale=True)
    if bevel: bv = o.modifiers.new('bev', 'BEVEL'); bv.width = bevel; bv.segments = 3
    o.data.materials.append(m); bpy.ops.object.shade_smooth(); return o

W, H, P, D = .60, 2.10, .034, .030                 # door width/height, profile face width & depth (Slim 2x2 look)
parts = []
L = box('stileL', (P, D, H), (-W / 2 + P / 2, 0, H / 2), ALU); R = box('stileR', (P, D, H), (W / 2 - P / 2, 0, H / 2), ALU)
T = box('railT', (W - 2 * P, D, P), (0, 0, H - P / 2), ALU); B = box('railB', (W - 2 * P, D, P), (0, 0, P / 2), ALU)
G = box('glass', (W - 2 * P + .008, .006, H - 2 * P + .008), (0, 0, H / 2), GLASS, bevel=.001)
hinges = []
for z in (.22, H - .22):
    hg = box('hinge', (.02, .07, .12), (-W / 2 - .01, .016, z), HINGE, .003)
    bpy.ops.mesh.primitive_cylinder_add(radius=.026, depth=.016, location=(-W / 2 - .018, .06, z), rotation=(0, math.radians(90), 0))
    cup = bpy.context.object; cup.data.materials.append(HINGE); cup.parent = hg; cup.matrix_parent_inverse = hg.matrix_world.inverted(); hinges.append(hg)

# exploded offsets (dx, dy, dz, rot_y deg) and assembly windows (frame start, frame end)
def anim(o, off, rot, f0, f1, snap=False):
    final = o.location.copy(); o.location = (final.x + off[0], final.y + off[1], final.z + off[2]); o.rotation_euler = (0, math.radians(rot), math.radians(rot * .5))
    o.keyframe_insert('location', frame=1); o.keyframe_insert('rotation_euler', frame=1)
    o.keyframe_insert('location', frame=f0); o.keyframe_insert('rotation_euler', frame=f0)
    o.location = final; o.rotation_euler = (0, 0, 0); o.keyframe_insert('location', frame=f1); o.keyframe_insert('rotation_euler', frame=f1)
    for fc in o.animation_data.action.fcurves if hasattr(o.animation_data.action, 'fcurves') else []:
        for kp in fc.keyframe_points: kp.interpolation = 'BACK' if snap else 'BEZIER'; kp.easing = 'EASE_OUT' if snap else 'AUTO'
anim(L, (-.36, -.10, .04), -5, 14, 46); anim(R, (.36, -.10, -.04), 5, 14, 46)
anim(T, (0, -.12, .30), 4, 30, 60); anim(B, (0, -.38, .06), -4, 30, 60)
anim(G, (.06, -.55, .06), 7, 52, 88)
for i, hg in enumerate(hinges): anim(hg, (-.32, -.18, 0), 0, 82 + i * 5, 98 + i * 5, snap=True)

# shadow catcher floor
bpy.ops.mesh.primitive_plane_add(size=12, location=(0, 0, -.001)); fl = bpy.context.object; fl.is_shadow_catcher = True
# lights: big soft key, fill, rim
def area(loc, rot, energy, size):
    bpy.ops.object.light_add(type='AREA', location=loc, rotation=[math.radians(a) for a in rot]); l = bpy.context.object; l.data.energy = energy; l.data.size = size; return l
area((2.2, -2.6, 3.2), (50, 0, 40), 700, 3.5); area((-2.8, -1.8, 1.6), (70, 0, -55), 260, 3); area((-.8, 2.8, 2.8), (-55, 0, 165), 420, 2)
sc.world = bpy.data.worlds.new('w'); bg = sc.world.node_tree.nodes['Background']; bg.inputs[0].default_value = (.9, .91, .93, 1); bg.inputs[1].default_value = .9
# camera on an orbiting rig
bpy.ops.object.empty_add(location=(0, 0, H / 2)); rig = bpy.context.object
bpy.ops.object.camera_add(location=(0, -6.0, 1.45)); cam = bpy.context.object; cam.data.lens = 50; cam.parent = rig
cam.keyframe_insert('location', frame=1); cam.location = (0, -4.5, 1.30); cam.keyframe_insert('location', frame=END)   # push in as it assembles
tr = cam.constraints.new('TRACK_TO'); bpy.ops.object.empty_add(location=(0, 0, H / 2 - .02)); tgt = bpy.context.object; tr.target = tgt; tr.track_axis = 'TRACK_NEGATIVE_Z'; tr.up_axis = 'UP_Y'
sc.camera = cam
rig.rotation_euler = (0, 0, math.radians(-28)); rig.keyframe_insert('rotation_euler', frame=1)
rig.rotation_euler = (0, 0, math.radians(14)); rig.keyframe_insert('rotation_euler', frame=END)
# render settings
r = sc.render; r.engine = 'CYCLES'; sc.cycles.device = 'CPU'; sc.cycles.samples = SAMPLES; sc.cycles.use_denoising = True
sc.cycles.max_bounces = 8; sc.cycles.transmission_bounces = 8
r.film_transparent = True; r.resolution_x, r.resolution_y = RES, int(RES * 16 / 9); r.resolution_percentage = 100
r.image_settings.file_format = 'PNG'; r.image_settings.color_mode = 'RGBA'
os.makedirs(OUT, exist_ok=True)
if TEST:
    import time
    for f in (1, 70, 120):
        sc.frame_set(f); r.filepath = os.path.join(OUT, f'test_{f:03d}.png'); t = time.time(); bpy.ops.render.render(write_still=True); print('FRAME', f, round(time.time() - t, 1), 's')
else:
    r.filepath = os.path.join(OUT, 'f_'); bpy.ops.render.render(animation=True)
