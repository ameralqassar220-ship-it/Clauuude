// Fluted glass reel — voiceover: ../audio/fluted.mp3 (scene `at` and caption times are voiceover seconds)
window.REEL = {
  kicker: 'Razan UAE · Fluted Glass', audio: 'fluted.mp3', offset: 0.3, duration: 22.5,
  spoken: { 'razanuae.com!': 17, 'UAE!': 6 },
  scenes: [
    { type: 'hook2', at: 0, imgs: ['grey-fluted-glass-walk-in-closet-black-frame.jpg', 'fluted-glass-wardrobe-doors-uae.jpg'] },
    { type: 'hero', at: 2.76, img: 'fluted-glass-panel-sample-uae.jpg', tag: '6mm & 8mm fluted glass', chips: ['Privacy', 'Daylight', 'Texture'] },
    { type: 'fan3', at: 7.19, imgs: ['fluted-glass-wardrobe-doors-uae.jpg', 'grey-fluted-glass-walk-in-closet-black-frame.jpg', 'dark-walk-in-closet-glass-doors-lit-shelves.jpg'], labels: ['Wardrobes', 'Closets', 'Cabinets'], tag: 'Soft, private, bright' },
    { type: 'checks', at: 10.81, img: 'fluted-glass-panel-sample-uae.jpg', checks: ['Clear', 'Grey', 'Brown tinted'],
      swaps: [{ img: 'fluted-grey.jpg', at: .58 }, { img: 'fluted-brown.jpg', at: 1.23 }], checkAt: [0, .58, 1.23] },
    { type: 'stats', at: 12.80, items: [{ n: 6, suffix: 'mm', txt: 'Closets &amp;<br>kitchens' }, { n: 8, suffix: 'mm', txt: 'Glass showers<br>&amp; partitions' }, { n: 1, suffix: ' day', txt: 'Delivery<br>across the UAE' }] },
    { type: 'cta', at: 16.25 },
  ],
  caps: [
    { hl: { 1: 'hs', 4: 'hs' }, segs: [[0.02, 2.52, 'Want privacy… without losing the light?']] },
    { hl: { 1: 'hl', 2: 'hl' }, segs: [[2.76, 4.14, 'Meet fluted glass!']] },
    { hl: { 2: 'hs' }, segs: [[4.39, 6.93, 'Soft vertical ribs that blur what’s behind.']] },
    { hl: { 2: 'hl', 3: 'hl', 4: 'hl' }, segs: [[7.19, 10.58, 'Perfect for wardrobes, walk-in closets and kitchen cabinets.']] },
    { hl: { 0: 'hs', 1: 'hs', 3: 'hs' }, segs: [[10.81, 12.37, 'Clear, grey or brown.']] },
    { hl: { 6: 'hl', 7: 'hl' }, segs: [[12.80, 15.98, 'Cut to your size, and delivered next day across the UAE!']] },
    { hl: { 5: 'hs' }, segs: [[16.25, 19.42, 'Order your fluted glass at razanuae.com!']] },
  ],
};
