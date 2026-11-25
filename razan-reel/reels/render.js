// Renders a reel from engine.html + <id>.js to ../out/razan-<id>.mp4 with its voiceover.
// Usage: node render.js <id> [--stills 2,6,10]   (stills: PNG previews in ../out, no video)
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const [id, ...rest] = process.argv.slice(2);
if (!id) { console.error('usage: node render.js <id> [--stills 1,2,3]'); process.exit(1); }
const si = rest.indexOf('--stills'), stills = si >= 0 ? rest[si + 1] : null;
const outDir = path.join(__dirname, '..', 'out'); fs.mkdirSync(outDir, { recursive: true });
const fps = 30;

// Extract video clip frames once into ../.cache/clips/<name>/ (kept out of git).
const vidDir = path.join(__dirname, '..', 'assets', 'video'), cache = path.join(__dirname, '..', '.cache', 'clips');
if (fs.existsSync(vidDir)) for (const f of fs.readdirSync(vidDir).filter(f => f.endsWith('.mp4'))) {
  const d = path.join(cache, f.replace(/\.mp4$/, ''));
  if (!fs.existsSync(d)) { fs.mkdirSync(d, { recursive: true });
    require('child_process').execFileSync('ffmpeg', ['-v', 'error', '-i', path.join(vidDir, f), '-vf', 'fps=30', '-q:v', '3', path.join(d, 'f_%04d.jpg')]); }
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  await page.goto('file://' + path.join(__dirname, id.startsWith('cine-') ? 'engine-cine.html' : id.startsWith('bp-') ? 'engine-bp.html' : 'engine.html') + '?reel=' + id);
  await page.waitForFunction(() => window.READY === true);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForLoadState('networkidle');

  if (stills) {
    for (const s of stills.split(',').map(Number)) {
      await page.evaluate(t => window.render(t), s);
      await page.screenshot({ path: path.join(outDir, `${id}_${s}.png`) });
    }
    return browser.close();
  }

  const { DURATION, AUDIO_OFFSET, AUDIO } = await page.evaluate(() => ({ DURATION, AUDIO_OFFSET, AUDIO }));
  const voice = path.join(__dirname, '..', 'audio', AUDIO);
  const out = path.join(outDir, `razan-${id}.mp4`);
  const audioArgs = fs.existsSync(voice)
    ? ['-i', voice, '-filter_complex', `[1:a]adelay=${Math.round(AUDIO_OFFSET * 1000)}:all=1,apad[a]`, '-map', '0:v', '-map', '[a]', '-c:a', 'aac', '-b:a', '192k', '-shortest']
    : [];
  const ff = spawn('ffmpeg', ['-y', '-v', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-', ...audioArgs,
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out], { stdio: ['pipe', 'inherit', 'inherit'] });
  const total = Math.round(DURATION * fps);
  for (let i = 0; i < total; i++) {
    await page.evaluate(t => window.render(t), i / fps);
    const buf = await page.screenshot({ type: 'jpeg', quality: 95 });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
  }
  ff.stdin.end();
  await new Promise(r => ff.on('close', r));
  await browser.close();
  console.log('wrote', out);
})();
