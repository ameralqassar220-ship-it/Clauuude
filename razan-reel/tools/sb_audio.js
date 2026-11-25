// Dumps window.SFX / CFG from a storyboard page so tools/sb_mix.py can build its sound track.
const { chromium } = require('playwright'); const path = require('path');
(async () => { const id = process.argv[2]; const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('file://' + path.join(__dirname, '..', 'reels', id + '.html')); await p.waitForFunction(() => window.READY);
  console.log(JSON.stringify(await p.evaluate(() => ({ sfx: window.SFX, cfg: window.CFG })))); await b.close(); })();
