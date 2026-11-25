// Assembles the cartoon reel: 5 AI clips (clips/c1.mp4 … c5.mp4) cut to the narration,
// a transparent HTML overlay (overlay.html) on top, and gen/narration.mp3 underneath.
// Usage: node build.js [out.mp4]          full render
//        node build.js --stills 2,12,20   preview stills of the overlay on a grey background
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const out = args[0] && !args[0].startsWith('--') ? args[0] : path.join(__dirname, 'razan-cartoon-reel.mp4');
const fps = 30;
const stills = opt('--stills', null);

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  await page.goto('file://' + path.join(__dirname, 'overlay.html') + (stills ? '?bg' : ''));
  await page.evaluate(() => document.fonts.ready);
  await page.waitForLoadState('networkidle');

  if (stills) {
    for (const s of stills.split(',').map(Number)) {
      await page.evaluate(t => window.render(t), s);
      await page.screenshot({ path: path.join(__dirname, `still_${s}.png`) });
    }
    return browser.close();
  }

  const { DURATION, CUTS, AUDIO_OFFSET } = await page.evaluate(() => ({ DURATION, CUTS, AUDIO_OFFSET }));
  const clips = [1, 2, 3, 4, 5].map(i => path.join(__dirname, 'clips', `c${i}.mp4`));
  clips.forEach(c => { if (!fs.existsSync(c)) throw new Error('missing ' + c); });

  // Each clip: fill 1080x1920, 30fps, trimmed to its slot; the last one holds its final frame if short.
  const parts = clips.map((_, i) => {
    const d = (CUTS[i + 1] - CUTS[i]).toFixed(3);
    return `[${i + 1}:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,fps=${fps},setsar=1,` +
      `tpad=stop_mode=clone:stop_duration=10,trim=duration=${d},setpts=PTS-STARTPTS[v${i}]`;
  });
  const filter = parts.join(';') + ';' + clips.map((_, i) => `[v${i}]`).join('') + `concat=n=${clips.length}:v=1:a=0[base];` +
    `[base][0:v]overlay=format=auto[vid];` +
    `[6:a]adelay=${Math.round(AUDIO_OFFSET * 1000)}:all=1,apad[aud]`;

  const ff = spawn('ffmpeg', ['-y', '-v', 'error',
    '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'png', '-i', '-',
    ...clips.flatMap(c => ['-i', c]),
    '-i', path.join(__dirname, 'gen', 'narration.mp3'),
    '-filter_complex', filter, '-map', '[vid]', '-map', '[aud]', '-t', String(DURATION),
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p',
    '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', out], { stdio: ['pipe', 'inherit', 'inherit'] });

  const total = Math.round(DURATION * fps);
  for (let i = 0; i < total; i++) {
    await page.evaluate(t => window.render(t), i / fps);
    const buf = await page.screenshot({ type: 'png', omitBackground: true });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    if (i % (fps * 5) === 0) console.log(`frame ${i}/${total}`);
  }
  ff.stdin.end();
  await new Promise(r => ff.on('close', r));
  await browser.close();
  console.log('wrote', out);
})();
