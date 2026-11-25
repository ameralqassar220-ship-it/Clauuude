// Joinery workshop supply reel — voiceover: ../audio/workshop.mp3
window.REEL = {
  kicker: 'Razan UAE · Workshops', audio: 'workshop.mp3', offset: 0.3, duration: 23,
  spoken: { 'razanuae.com!': 17 },
  scenes: [
    { type: 'hook2', at: 0, imgs: ['razan-uae-team-warehouse.jpg', 'air-hinge-aluminium-profile-corner.jpg'] },
    { type: 'hero', at: 3.38, img: 'walk-in-closet-aluminium-glass-doors-uae.jpg', tag: 'Complete door kits', chips: ['Profiles', 'Glass', 'Hinges'] },
    { type: 'fan3', at: 5.63, imgs: ['air-hinge-aluminium-profile-corner.jpg', 'fluted-glass-panel-sample-uae.jpg', '175-degree-cabinet-hinge.jpg'], labels: ['Profiles', 'Glass', 'Hinges'], tag: 'Cut for all 4 sides' },
    { type: 'checks', at: 9.51, img: 'fluted-glass-wardrobe-doors-uae.jpg', checks: ['Labelled per door', 'Cut to size', 'Ready to assemble'] },
    { type: 'stats', at: 12.91, items: [{ n: 1, suffix: ' day', txt: 'Delivery by<br>our own fleet' }, { n: 7, suffix: '', txt: 'Emirates<br>covered' }, { n: 120, suffix: '+', txt: 'Workers behind<br>your orders' }] },
    { type: 'cta', at: 16.63, ship: 'Daily or weekly supply · RAK &amp; UAQ branches' },
  ],
  caps: [
    { hl: { 0: 'hs', 1: 'hs' }, segs: [[0.02, 1.12, 'Workshop owners!'], [1.35, 3.08, 'Tired of materials that don’t fit?']] },
    { hl: { 2: 'hl', 3: 'hl', 4: 'hl' }, segs: [[3.38, 5.35, 'Razan sends complete door kits!']] },
    { hl: { 4: 'hs', 5: 'hs', 6: 'hs' }, segs: [[5.63, 9.23, 'Profiles cut for all four sides, matching glass, and hinges.']] },
    { hl: { 2: 'hl', 3: 'hl', 4: 'hl', 6: 'hs', 7: 'hs' }, segs: [[9.51, 11.23, 'Every piece labelled per door.'], [11.50, 12.66, 'No measuring twice!']] },
    { hl: { 2: 'hl', 3: 'hl', 9: 'hs' }, segs: [[12.91, 16.36, 'Delivered next day by our own fleet, across all seven emirates!']] },
    { hl: { 3: 'hl', 4: 'hl', 6: 'hs' }, segs: [[16.63, 19.99, 'Set up your weekly supply at razanuae.com!']] },
  ],
};
