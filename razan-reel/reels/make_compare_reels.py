"""'Without Razan vs With Razan' series — 5 audience versions for Meta ads.

Each = the audience hook (audio/hook-<id>.mp3, shared with the made-to-measure series) + the shared comparison
narration (audio/compare-body.mp3). Writes audio/cmp-<id>.mp3 and reels/cmp-<id>.js; render: node render.js cmp-<id>
No competitor is named or shown: the comparison is the feeling without Razan vs with Razan.
"""
import json, subprocess, os
HERE = os.path.dirname(os.path.abspath(__file__)); AUD = os.path.join(HERE, '..', 'audio')
GAP = 0.35
hooks = json.load(open(os.path.join(AUD, 'hooks.json'))); hooks['designers']['split'] = 1.62

A = {
  'designers':    dict(kicker='For Interior Designers', tag='For interior designers', a='If you’re an interior designer,', b='your client expects every door to fit perfectly!', ahl={3: 'hl', 4: 'hl'}, bhl={6: 'hs', 7: 'hs'},
                       imgs=['display-cabinet-curved-glass.jpg', 'gold-mesh-fabric-glass-wardrobe-doors-dressing-room.jpg']),
  'joinery':      dict(kicker='For Joinery Workshops', tag='For joinery workshop owners', a='If you own a joinery workshop,', b='you can’t afford doors that don’t fit!', ahl={4: 'hl', 5: 'hl'}, bhl={5: 'hs', 6: 'hs'},
                       imgs=['staff-bronze-fluted-door.jpg', 'air-hinge-aluminium-profile-corner.jpg']),
  'architects':   dict(kicker='For Architects', tag='For architects', a='If you’re an architect,', b='your design deserves doors that fit exactly as drawn!', ahl={3: 'hl'}, bhl={6: 'hs', 7: 'hs', 8: 'hs'},
                       imgs=['display-cabinet-curved-glass.jpg', 'doc-draw-1.jpg']),
  'developers':   dict(kicker='For Real Estate Developers', tag='For real estate developers', a='If you’re a real estate developer,', b='every unit needs doors that fit, on time!', ahl={3: 'hl', 4: 'hl', 5: 'hl'}, bhl={1: 'hs', 6: 'hs', 7: 'hs'},
                       imgs=['walk-in-closet-aluminium-glass-doors-uae.jpg', 'display-cabinet-curved-glass.jpg']),
  'construction': dict(kicker='For Construction Companies', tag='For construction companies', a='If you run a construction company,', b='every site needs doors that fit the first time!', ahl={4: 'hl', 5: 'hl'}, bhl={1: 'hs', 6: 'hs', 7: 'hs', 8: 'hs'},
                       imgs=['staff-bronze-fluted-door.jpg', 'razan-uae-team-warehouse.jpg']),
}

def body(s):  # scenes + captions in compare-body.mp3 time, shifted by s
    T = lambda x: round(x + s, 2)
    scenes = [
      dict(type='title', at=T(0), mood='bad', text='Without Razan', sub='Every mistake costs you'),
      dict(type='mistake', at=T(1.59), img='door-hinges-still.jpg', marks=[[.9, .34]], markAt=.6, stamp=dict(text='SCRAP', at=2.0),
           tags=[dict(text='✗ Hinge hole drilled wrong', at=.3, y=1060), dict(text='Profile = scrap', at=2.1, y=1160)]),
      dict(type='mistake', at=T(4.50), img='fluted-plant-still.jpg', marks=[[.5, .14]], markAt=.5, stamp=dict(text='RE-ORDER', at=1.1),
           tags=[dict(text='✗ Glass cut to the wrong size', at=.2, y=960), dict(text='+1 week waiting', at=1.4, y=1060), dict(text='You pay twice', at=2.9, y=1160)]),
      dict(type='title', at=T(8.80), mood='good', text='With Razan', sub='Right the first time'),
      dict(type='clip', at=T(9.88), clip='doors-hinges', frames=139, checks=[dict(text='Every size checked', at=.4, y=1060), dict(text='Every hole checked', at=2.0, y=1160, sand=True)]),
      dict(type='clip', at=T(13.60), clip='showroom-door', frames=91, tag='Fits the first time'),
      dict(type='hook2', at=T(14.89), imgs=['display-cabinet-curved-glass.jpg', 'staff-bronze-fluted-door.jpg'], tag='No waste', tagAt=.05, tag2='No stress', tag2At=.8),
      dict(type='cta', at=T(16.67), ship='Get it right the first time'),
    ]
    caps = [
      dict(hl={1: 'hr'}, segs=[[T(0.02), T(1.24), 'Without Razan?']]),
      dict(hl={1: 'hr', 2: 'hr', 3: 'hr', 7: 'hr'}, segs=[[T(1.59), T(4.17), 'One wrong hinge hole, and the profile is scrap.']]),
      dict(hl={1: 'hr', 7: 'hr', 8: 'hr'}, segs=[[T(4.50), T(5.67), 'One wrong glass size,'], [T(5.82), T(7.03), 'and you wait another week…']]),
      dict(hl={2: 'hr'}, segs=[[T(7.38), T(8.39), 'and pay twice.']]),
      dict(hl={1: 'hl'}, segs=[[T(8.80), T(9.57), 'With Razan?']]),
      dict(hl={1: 'hs', 3: 'hl', 4: 'hl', 6: 'hl', 7: 'hl'}, segs=[[T(9.88), T(11.74), 'Our engineers check every size'], [T(11.87), T(13.28), 'and every hole before production.']]),
      dict(hl={3: 'hs', 4: 'hs'}, segs=[[T(13.60), T(14.62), 'It fits the first time.']]),
      dict(hl={1: 'hl', 3: 'hs'}, segs=[[T(14.89), T(15.50), 'No waste.'], [T(15.65), T(16.39), 'No stress.']]),
      dict(hl={2: 'hs', 7: 'hl'}, segs=[[T(16.67), T(17.89), 'Get it right the first time'], [T(18.04), T(19.93), 'at razanuae.com!']]),
    ]
    return scenes, caps, [[T(0), T(8.72)]]

for k, o in A.items():
    h = hooks[k]; hook_len = h['dur'] + 0.11; shift = hook_len + GAP
    out_mp3 = os.path.join(AUD, f'cmp-{k}.mp3')
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', os.path.join(AUD, f'hook-{k}.mp3'), '-f', 'lavfi', '-t', str(GAP), '-i', 'anullsrc=r=44100:cl=mono',
                    '-i', os.path.join(AUD, 'compare-body.mp3'),
                    '-filter_complex', '[0:a]aresample=44100,aformat=channel_layouts=mono[h];[2:a]aresample=44100,aformat=channel_layouts=mono[b];[h][1:a][b]concat=n=3:v=0:a=1',
                    '-c:a', 'libmp3lame', '-q:a', '2', out_mp3], check=True)
    dur = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', out_mp3], capture_output=True, text=True).stdout)
    scenes, caps, moods = body(shift)
    sp = h['split']
    reel = dict(kicker=o['kicker'], audio=f'cmp-{k}.mp3', offset=0.3, duration=round(dur + 2.6, 1),
                spoken={'razanuae.com!': 17, 'week…': 6},
                moods=moods,
                scenes=[dict(type='hook2', at=0, imgs=o['imgs'], tag=o['tag'])] + scenes,
                caps=[dict(hl=o['ahl'], segs=[[0.03, round(sp - .06, 2), o['a']]]), dict(hl=o['bhl'], segs=[[round(sp + .02, 2), h['dur'], o['b']]])] + caps)
    open(os.path.join(HERE, f'cmp-{k}.js'), 'w').write(
        f"// AUTO-GENERATED by make_compare_reels.py — audience: {k}. Edit the generator, not this file.\nwindow.REEL = "
        + json.dumps(reel, ensure_ascii=False, indent=1) + ";\n")
    print(k, f'shift {shift:.2f}s, audio {dur:.2f}s')
