// Blueprint theme — "Drawn to the millimetre. Made to the millimetre!"
// Voiceover: ../audio/bp-drawn.mp3 = new hook + existing lines, built by ../tools/assemble_audio.py bp-drawn (times below = that track).
// Documents are Razan order S08044 with the client's name, signature and QR code hidden.
window.REEL = {
  audio: 'bp-drawn.mp3', offset: 0.3, duration: 27.8,
  spoken: { 'razanuae.com!': 17 },
  scenes: [
    { type: 'door', at: 0, kicker: 'DETAIL A · DESIGN', title: 'Drawn to the mm', kicker2: 'DETAIL A · BUILT', title2: 'Made to the mm', madeAt: 2.17, clip: 'doors-hinges', frames: 139 },
    { type: 'sheet', at: 4.02, img: 'doc-order-1.jpg', from: { fx: .5, fy: .5, z: .8 }, to: { fx: .5, fy: .34, z: 1.2 },
      highlights: [[.035, .268, .968, .413]], hiAt: .5, notes: [{ text: 'YOUR MEASUREMENTS', x: 120, y: 1345, at: .5, cy: true }] },
    { type: 'sheet', at: 6.25, img: 'doc-draw-1.jpg', rot: 1, from: { fx: .5, fy: .3, z: 1.2 }, to: { fx: .5, fy: .43, z: 1.0 },
      notes: [{ text: 'TECHNICAL DRAWING · EVERY DOOR', x: 120, y: 1345, at: .4 }] },
    { type: 'sheet', at: 8.59, img: 'doc-draw-1.jpg', from: { fx: .23, fy: .28, z: 1.3 }, to: { fx: .33, fy: .28, z: 2.3 },
      notes: [{ text: '209.5 × 47.2 cm', x: 560, y: 420, at: .08 }, { text: '4 HINGES · LEFT', x: 560, y: 520, at: .84 },
              { text: 'FULL HANDLE', x: 560, y: 620, at: 1.75 }, { text: 'BLACK PROFILE + GLASS', x: 470, y: 720, at: 2.4 }],
      stamps: [{ text: 'CHECKED ✓', small: 'BY OUR ENGINEER', ok: true, x: 470, y: 980, at: 3.65 }] },
    { type: 'sheet', at: 14.43, img: 'doc-order-2.jpg', from: { fx: .5, fy: .3, z: .9 }, to: { fx: .6, fy: .36, z: 1.5 },
      highlights: [[.51, .335, .985, .415]], hiAt: 1.0,
      stamps: [{ text: 'APPROVED', small: 'SIGNED ONLINE · REV 0', ok: true, x: 280, y: 1010, at: 1.0, r: -8 }],
      notes: [{ text: '→ PRODUCTION STARTS', x: 150, y: 1345, at: 2.6, cy: true }] },
    { type: 'reveal', at: 18.31, clip: 'showroom-door', frames: 91,
      notes: [{ text: 'FITS THE FIRST TIME', x: 180, y: 1180, at: .3, cy: true }, { text: 'NO WASTE', x: 180, y: 1270, at: 1.55 }, { text: 'NO STRESS', x: 450, y: 1270, at: 2.3 }] },
    { type: 'cta', at: 21.72, line: 'Custom glass doors' },
  ],
  caps: [
    { hl: { 3: 'hc' }, segs: [[0.11, 1.61, 'Drawn to the millimetre.']] },
    { hl: { 0: 'hs', 3: 'hs' }, segs: [[1.87, 3.38, 'Made to the millimetre!']] },
    { hl: { 4: 'hc', 9: 'hs', 10: 'hs' }, segs: [[4.04, 7.04, 'You send us your measurements, and we send back technical drawings']] },
    { hl: { 2: 'hc', 3: 'hc' }, segs: [[7.18, 8.23, 'for every single door.']] },
    { hl: { 1: 'hc', 2: 'hc' }, segs: [[8.67, 9.29, 'Sizes,'], [9.43, 10.21, 'hinge positions,'], [10.34, 10.84, 'handles,'], [10.99, 11.99, 'profile and glass,']] },
    { hl: { 4: 'hs', 5: 'hs' }, segs: [[12.24, 14.07, 'all checked by our trained engineers.']] },
    { hl: { 3: 'hc', 4: 'hc' }, segs: [[14.51, 17.88, 'You approve and sign online, and only then does production start.']] },
    { hl: { 3: 'hs', 4: 'hs' }, segs: [[18.31, 19.37, 'It fits the first time.']] },
    { hl: { 1: 'hc', 3: 'hc' }, segs: [[19.77, 21.32, 'No waste. No stress.']] },
    { hl: { 3: 'hc', 5: 'hs' }, segs: [[21.72, 24.83, 'Send us your measurements at razanuae.com!']] },
  ],
};
