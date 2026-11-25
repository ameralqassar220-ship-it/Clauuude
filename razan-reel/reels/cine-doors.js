// Cinematic theme — "Custom glass doors for closets & kitchens: who we are, our team, how we help".
// Voiceover: ../audio/cine-doors.mp3, assembled from existing recordings by ../tools/assemble_audio.py cine-doors (times below = that track).
window.REEL = {
  audio: 'cine-doors.mp3', offset: 0.3, duration: 31,
  spoken: { 'razanuae.com!': 17, 'UAE?': 6 },
  ship: 'Custom glass doors · Closets &amp; kitchens',
  scenes: [
    { at: 0, img: 'display-cabinet-curved-glass.jpg', zoom: [1.18, 1.04], title: 'Custom glass doors', sub: 'Made to measure for closets &amp; kitchens' },
    { at: 2.98, clip: 'storefront-night', frames: 221, from: 1.0, zoom: [1.1, 1.0], title: 'We are Razan', sub: 'Glass &amp; aluminium · Ras Al Khaimah · Umm Al Quwain' },
    { at: 5.38, clip: 'doors-gold-black', frames: 183, zoom: [1.06, 1.0], title: 'Complete door kits',
      chips: [{ text: 'Profiles', x: 64, y: 960 }, { text: 'Glass', x: 330, y: 960, at: .7 }, { text: 'Hinges', x: 540, y: 960, at: 1.0 }] },
    { at: 9.41, img: 'razan-uae-team-warehouse.jpg', zoom: [1.15, 1.02], title: 'Our team',
      stats: [{ n: 120, suffix: '+', label: 'Workers', y: 560 }, { n: 20, suffix: '+', label: 'Engineers, architects<br>&amp; specialists', y: 820, at: .7 }] },
    { at: 13.25, clip: 'doors-showroom', frames: 153, zoom: [1.08, 1.0], title: 'Our own fleet',
      chips: [{ text: 'Next-day delivery', x: 64, y: 960, sand: true }, { text: 'All 7 emirates', x: 520, y: 960, at: .8 }] },
    { at: 17.15, img: 'staff-bronze-fluted-door.jpg', zoom: [1.14, 1.0], title: 'Huge stock', sub: 'Trusted by big developers in Dubai' },
    { at: 21.38, clip: 'showroom-door', frames: 91, zoom: [1.05, 1.0], title: 'Fits the first time',
      chips: [{ text: 'No waste', x: 64, y: 960, at: 1.5 }, { text: 'No stress', x: 330, y: 960, at: 2.0, sand: true }] },
    { at: 24.79, clip: 'doors-hinges', frames: 139, zoom: [1.1, 1.0] },
  ],
  caps: [
    { hl: { 2: 'hs', 5: 'hs' }, segs: [[0.06, 2.58, 'Building a closet or a kitchen in the UAE?']] },
    { hl: { 0: 'hw', 2: 'hs', 3: 'hs', 4: 'hs' }, segs: [[2.98, 4.98, 'Razan sends complete door kits!']] },
    { hl: { 3: 'hs', 4: 'hs', 5: 'hs' }, segs: [[5.38, 9.01, 'Profiles cut for all four sides, matching glass, and hinges.']] },
    { hl: { 1: 'hs' }, segs: [[9.41, 12.85, 'Our engineers check every size and every hole before production.']] },
    { hl: { 1: 'hs', 2: 'hs', 6: 'hs' }, segs: [[13.25, 16.75, 'Delivered next day by our own fleet, across all seven emirates!']] },
    { hl: { 2: 'hs', 3: 'hs', 7: 'hw', 8: 'hw' }, segs: [[17.15, 20.98, 'Trusted by big developers in Dubai, with huge stock ready to go.']] },
    { hl: { 3: 'hs', 4: 'hs' }, segs: [[21.38, 22.44, 'It fits the first time.']] },
    { hl: { 1: 'hs', 3: 'hs' }, segs: [[22.84, 24.39, 'No waste. No stress.']] },
    { hl: { 2: 'hs', 7: 'hw' }, segs: [[24.79, 28.13, 'Get it right the first time at razanuae.com!']] },
  ],
};
