// Renders index.html to an MP4, frame by frame.
// Usage: node render.js [out.mp4] [--fps 30] [--stills 1,5,9]  (stills: write PNGs at those seconds and exit)
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const path = require('path');

const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const out = args[0] && !args[0].startsWith('--') ? args[0] : path.join(__dirname, 'razan-reel.mp4');
const fps = +opt('--fps', 30);
const stills = opt('--stills', null);

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  await page.goto('file://' + path.join(__dirname, 'index.html'));
  await page.evaluate(() => document.fonts.ready);
  await page.waitForLoadState('networkidle');

  if (stills) {
    for (const s of stills.split(',').map(Number)) {
      await page.evaluate(t => window.render(t), s);
      await page.screenshot({ path: path.join(path.dirname(out), `still_${s}.png`) });
    }
    await browser.close();
    return;
  }

  const duration = await page.evaluate(() => window.DURATION);
  const total = Math.round(duration * fps);
  // Voiceover: audio/voiceover.mp3, delayed by the page's AUDIO_OFFSET, padded to the video length.
  const voice = path.join(__dirname, 'audio', 'voiceover.mp3');
  const offsetMs = Math.round(1000 * (await page.evaluate(() => window.AUDIO_OFFSET || 0)));
  const audioArgs = require('fs').existsSync(voice)
    ? ['-i', voice, '-filter_complex', `[1:a]adelay=${offsetMs}:all=1,apad[a]`, '-map', '0:v', '-map', '[a]', '-c:a', 'aac', '-b:a', '192k', '-shortest']
    : [];
  const ff = spawn('ffmpeg', ['-y', '-v', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-', ...audioArgs,
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out], { stdio: ['pipe', 'inherit', 'inherit'] });

  for (let i = 0; i < total; i++) {
    await page.evaluate(t => window.render(t), i / fps);
    const buf = await page.screenshot({ type: 'jpeg', quality: 95 });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    if (i % (fps * 5) === 0) process.stdout.write(`frame ${i}/${total}\n`);
  }
  ff.stdin.end();
  await new Promise(r => ff.on('close', r));
  await browser.close();
  console.log('wrote', out);
})();
