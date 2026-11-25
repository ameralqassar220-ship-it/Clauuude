// "Every door fits" reel — measurements -> technical drawings -> engineer check -> online sign-off.
// Documents are real Razan order S08044 with the client's name, signature and QR code hidden.
// Voiceover: ../audio/precision.mp3
window.REEL = {
  kicker: 'Razan UAE · Made to Measure', audio: 'precision.mp3', offset: 0.3, duration: 31,
  spoken: { 'razanuae.com!': 17, 'air-hinge,': 8 },
  scenes: [
    { type: 'hook2', at: 0, imgs: ['walk-in-closet-aluminium-glass-doors-uae.jpg', 'dark-walk-in-closet-glass-doors-lit-shelves.jpg'] },
    { type: 'doc', at: 3.48, img: 'doc-order-1.jpg', from: { fx: .5, fy: .5, z: .8 }, to: { fx: .5, fy: .34, z: 1.2 },
      highlights: [[.035, .268, .968, .413]], hiAt: .5,
      callouts: [{ text: 'Your measurements', x: 300, y: 1130, at: .4, sand: true }] },
    { type: 'doc', at: 4.95, img: 'doc-draw-1.jpg', from: { fx: .5, fy: .3, z: 1.25 }, to: { fx: .5, fy: .43, z: 1.0 },
      callouts: [{ text: 'Technical drawing for every door', x: 150, y: 1150, at: .6, sand: true }] },
    { type: 'doc', at: 7.92, img: 'doc-draw-1.jpg', from: { fx: .23, fy: .28, z: 1.3 }, to: { fx: .33, fy: .28, z: 2.3 },
      callouts: [
        { text: '209.5 × 47.2 cm', x: 560, y: 420, at: .1 },
        { text: '4 hinges · left', x: 560, y: 540, at: .8 },
        { text: 'Full handle', x: 560, y: 660, at: 1.65 },
        { text: 'Black profile + glass', x: 480, y: 780, at: 2.3 },
        { text: '✓ Engineer checked', x: 480, y: 940, at: 3.55, sand: true }] },
    { type: 'doc', at: 13.59, img: 'doc-order-2.jpg', from: { fx: .5, fy: .3, z: .9 }, to: { fx: .6, fy: .36, z: 1.5 },
      highlights: [[.51, .335, .985, .415]], hiAt: 1.2,
      callouts: [{ text: '✓ Signed online', x: 330, y: 1060, at: 1.0, sand: true }, { text: 'Then production starts', x: 250, y: 1170, at: 2.0 }] },
    { type: 'hero', at: 17.28, img: 'grey-fluted-glass-walk-in-closet-black-frame.jpg', tag: 'All kinds of solutions', chips: ['Hinged', 'Sliding', 'Air-Hinge'] },
    { type: 'hero', at: 20.93, img: 'razan-uae-team-warehouse.jpg', tag: 'Huge stock, ready to go', chips: ['Big developers', 'Dubai projects'] },
    { type: 'cta', at: 24.95, ship: 'Send your measurements on WhatsApp' },
  ],
  caps: [
    { hl: { 3: 'hs' }, segs: [[0.02, 1.50, 'Big project in Dubai?']] },
    { hl: { 4: 'hl' }, segs: [[1.77, 3.17, 'Every door has to fit!']] },
    { hl: { 4: 'hs', 9: 'hl', 10: 'hl' }, segs: [[3.48, 6.48, 'You send us your measurements, and we send back technical drawings']] },
    { hl: { 1: 'hs', 2: 'hs', 3: 'hs' }, segs: [[6.62, 7.67, 'for every single door.']] },
    { hl: { 1: 'hs', 2: 'hs' }, segs: [[7.92, 8.54, 'Sizes,'], [8.68, 9.46, 'hinge positions,'], [9.59, 10.09, 'handles,'], [10.24, 11.24, 'profile and glass,']] },
    { hl: { 4: 'hl', 5: 'hl' }, segs: [[11.49, 13.32, 'all checked by our trained engineers.']] },
    { hl: { 3: 'hs', 4: 'hs' }, segs: [[13.59, 16.96, 'You approve and sign online, and only then does production start.']] },
    { hl: { 0: 'hs', 1: 'hs', 2: 'hs' }, segs: [[17.28, 19.10, 'Hinged, sliding, air-hinge,'], [19.27, 20.65, 'whatever your project needs!']] },
    { hl: { 3: 'hl', 4: 'hl', 8: 'hs', 9: 'hs' }, segs: [[20.93, 24.66, 'Trusted by big developers in Dubai, with huge stock ready to go.']] },
    { hl: { 3: 'hs', 5: 'hl' }, segs: [[24.95, 27.98, 'Send us your measurements at razanuae.com!']] },
  ],
};
