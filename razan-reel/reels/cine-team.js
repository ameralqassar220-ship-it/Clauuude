// Cinematic theme — "Who's behind your doors": 100+ workers, 20 employees, factories in RAK & UAQ, own fleet.
// Voiceover: ../audio/cine-team.mp3, built from existing recordings by ../tools/assemble_audio.py cine-team (times = that track).
window.REEL = {
  audio: 'cine-team.mp3', offset: 0.3, duration: 24.2,
  spoken: { 'razanuae.com!': 17 },
  ship: 'Factories in Ras Al Khaimah &amp; Umm Al Quwain',
  scenes: [
    { at: 0, clip: 'storefront-night', frames: 221, from: .5, zoom: [1.12, 1.0], title: 'Big project?', sub: 'Meet the team behind your doors' },
    { at: 3.59, clip: 'doors-gold-black', frames: 183, zoom: [1.06, 1.0], title: 'Our own factories',
      chips: [{ text: 'Ras Al Khaimah', x: 64, y: 960, sand: true }, { text: 'Umm Al Quwain', x: 470, y: 960, at: .7, sand: true }] },
    { at: 5.99, img: 'razan-uae-team-warehouse.jpg', zoom: [1.15, 1.02], title: 'Our team',
      stats: [{ n: 100, suffix: '+', label: 'Workers', y: 560 }, { n: 20, suffix: '', label: 'Employees', y: 820, at: .8 }] },
    { at: 9.83, map: true, zoom: [1.0, 1.0], title: 'From our factories', sub: 'Next-day delivery · all 7 emirates' },
    { at: 13.73, img: 'staff-bronze-fluted-door.jpg', zoom: [1.14, 1.0], title: 'Huge stock', sub: 'Trusted by big developers in Dubai' },
    { at: 17.96, clip: 'doors-hinges', frames: 139, zoom: [1.1, 1.0] },
  ],
  caps: [
    { hl: { 3: 'hs', 8: 'hs' }, segs: [[0.06, 1.50, 'Big project in Dubai?'], [1.77, 3.19, 'Every door has to fit!']] },
    { hl: { 0: 'hw', 2: 'hs', 3: 'hs', 4: 'hs' }, segs: [[3.59, 5.59, 'Razan sends complete door kits!']] },
    { hl: { 1: 'hs' }, segs: [[5.99, 9.43, 'Our engineers check every size and every hole before production.']] },
    { hl: { 1: 'hs', 2: 'hs', 6: 'hs', 9: 'hw', 10: 'hw' }, segs: [[9.83, 13.33, 'Delivered next day by our own fleet, across all seven emirates!']] },
    { hl: { 2: 'hs', 3: 'hs', 7: 'hw', 8: 'hw' }, segs: [[13.73, 17.56, 'Trusted by big developers in Dubai, with huge stock ready to go.']] },
    { hl: { 2: 'hs', 7: 'hw' }, segs: [[17.96, 21.30, 'Get it right the first time at razanuae.com!']] },
  ],
};
