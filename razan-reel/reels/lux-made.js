// Dark luxury theme — "Glass, made for you". Deep narrator (ElevenLabs "Grant – The Premium Narrator").
// Voiceover: ../audio/lux-made.mp3 (one take, 19.9 s). Scene and caption times = its pauses.
window.REEL = {
  audio: 'lux-made.mp3', offset: 0.3, duration: 23.4,
  tagline: 'Glass, made for you.',
  scenes: [
    { at: 0, img: 'display-cabinet-curved-glass.jpg', zoom: [1.0, 1.12], head: 'Some spaces deserve more' },
    { at: 4.05, img: 'gold-mesh-fabric-glass-wardrobe-doors-dressing-room.jpg', pos: '30% center', zoom: [1.12, 1.0], head: 'Made to measure', sub: 'Every glass door' },
    { at: 7.79, img: 'fluted-glass-panel-sample-uae.jpg', zoom: [1.0, 1.08], head: 'Fluted' },
    { at: 8.66, img: 'woven-mesh-fabric-laminated-glass-wall-panel.jpg', zoom: [1.08, 1.0], head: 'Mesh' },
    { at: 9.49, img: 'fluted-brown.jpg', zoom: [1.0, 1.08], head: 'Tinted' },
    { at: 10.32, img: 'air-hinge-aluminium-profile-corner.jpg', zoom: [1.1, 1.0], head: 'Slim aluminium', sub: 'Precision frames' },
    { at: 12.50, img: 'staff-bronze-fluted-door.jpg', zoom: [1.0, 1.1], head: 'Our own factories', sub: 'Ras Al Khaimah · Umm Al Quwain' },
    { at: 17.13, end: true },
  ],
  caps: [
    { hl: { 5: 'hg' }, segs: [[0.17, 3.47, 'Some spaces deserve more than ordinary doors.']] },
    { hl: { 1: 'hg', 6: 'hg', 7: 'hg', 8: 'hg' }, segs: [[4.05, 4.78, 'At Razan,'], [5.09, 7.28, 'every glass door is made to measure.']] },
    { hl: { 0: 'hg', 1: 'hg', 2: 'hg', 5: 'hg', 6: 'hg' }, segs: [[7.79, 8.28, 'Fluted.'], [8.66, 9.12, 'Mesh.'], [9.49, 9.94, 'Tinted.'], [10.32, 12.00, 'Framed in slim aluminium.']] },
    { hl: { 3: 'hg', 4: 'hg' }, segs: [[12.50, 14.31, 'Crafted in our own factories,'], [14.51, 16.59, 'in Ras Al Khaimah and Umm Al Quwain.']] },
  ],
};
