// Mesh glass reel — voiceover: ../audio/mesh.mp3
window.REEL = {
  kicker: 'Razan UAE · Mesh Glass', audio: 'mesh.mp3', offset: 0.3, duration: 22,
  spoken: { 'razanuae.com!': 17, 'UAE!': 6 },
  scenes: [
    { type: 'hook2', at: 0, imgs: ['gold-mesh-fabric-glass-wardrobe-doors-dressing-room.jpg', 'woven-mesh-fabric-laminated-glass-wall-panel.jpg'] },
    { type: 'hero', at: 3.02, img: 'woven-mesh-fabric-laminated-glass-wall-panel.jpg', tag: 'Laminated safety glass', chips: ['Glass', '+ Fabric', '+ Glass'] },
    { type: 'fan3', at: 7.62, imgs: ['fabric-mesh-glass-panel-uae.jpg', 'mesh-fabric-laminated-glass-samples-uae.jpg', 'gold-mesh-fabric-glass-samples.jpg'], labels: ['Woven', 'Textured', 'Gold'], tag: 'New designs every week' },
    { type: 'checks', at: 9.95, img: 'gold-mesh-fabric-glass-wardrobe-doors-dressing-room.jpg', checks: ['Wipe-clean', 'Never fades', '6mm for slim frames'] },
    { type: 'stats', at: 13.12, items: [{ n: 6, suffix: 'mm', txt: 'For slim<br>profile doors' }, { n: 1, suffix: ' day', txt: 'Delivery<br>across the UAE' }, { n: 12, suffix: ' days', txt: 'Delivery<br>to the GCC' }] },
    { type: 'cta', at: 16.27 },
  ],
  caps: [
    { hl: { 6: 'hs', 7: 'hs' }, segs: [[0.02, 2.82, 'Want wardrobe doors that look like luxury fabric?']] },
    { hl: { 2: 'hl', 3: 'hl' }, segs: [[3.02, 4.53, 'This is mesh glass!']] },
    { hl: { 0: 'hs', 1: 'hs' }, segs: [[4.72, 7.46, 'Real fabric, sealed between two sheets of glass.']] },
    { hl: { 3: 'hs' }, segs: [[7.62, 9.76, 'Woven, textured, even gold!']] },
    { hl: { 1: 'hl', 5: 'hl', 6: 'hl' }, segs: [[9.95, 12.93, 'Smooth, wipe-clean, and the mesh never fades.']] },
    { hl: { 5: 'hs', 6: 'hs' }, segs: [[13.12, 16.04, 'Cut to size, and delivered next day across the UAE!']] },
    { hl: { 4: 'hl' }, segs: [[16.27, 19.15, 'See today’s designs at razanuae.com!']] },
  ],
};
