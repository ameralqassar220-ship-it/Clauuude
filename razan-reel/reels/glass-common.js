// Shared engine for the 5 "full glass sheets on sale" creatives aimed at glass factory owners / managers.
// Each page sb-glass<N>.html sets window.VARIANT = N and loads this file. ~10 s, text-led, SFX only, works muted;
// the last frame is a complete static ad. Brand rule: the Razan logo never rolls, spins, bounces or scales — fade only.
(() => {
const V = window.VARIANT;
const $ = id => document.getElementById(id);
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const lerp = (a, b, p) => a + (b - a) * p;
const easeOut = p => 1 - Math.pow(1 - p, 3);
const easeInOut = p => p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
const easeBack = p => { const c = 1.6; return 1 + (c + 1) * Math.pow(p - 1, 3) + c * Math.pow(p - 1, 2); };
const prog = (t, a, d) => clamp((t - a) / d);
const DUR = 10, SFX = [];
const stage = $('stage');
function el(html, parent = stage) { const d = document.createElement('div'); d.innerHTML = html.trim(); const n = d.firstChild; parent.appendChild(n); return n; }
function set(n, { x = 0, y = 0, s = 1, r = 0, o = 1, tx = '' } = {}) { n.style.opacity = o.toFixed(3); n.style.transform = `${tx} translate(${x.toFixed(1)}px,${y.toFixed(1)}px) rotate(${r.toFixed(2)}deg) scale(${s.toFixed(3)})`; n.style.visibility = o <= .001 ? 'hidden' : 'visible'; }
const rise = (t, a, d = .45, dy = 40) => ({ o: clamp(prog(t, a, d) * 1.6), y: lerp(dy, 0, easeOut(prog(t, a, d))) });

// glass looks (CSS) — the four named types + extras for "many more"
const GLASS = {
  black:   { name: 'Black Tinted',     css: 'linear-gradient(125deg,#2a2d31 0%,#0b0c0e 45%,#17191c 100%)' },
  brown:   { name: 'Brown Tinted',     css: 'linear-gradient(125deg,#8a6446 0%,#4a3222 50%,#6d4c34 100%)' },
  reflect: { name: 'Brown Reflective', css: 'linear-gradient(115deg,#5b3d27 0%,#c49a6c 28%,#6b4a30 46%,#e3c39a 62%,#5a3c26 100%)' },
  fluted:  { name: 'Fluted',           css: 'repeating-linear-gradient(90deg,#dfe6ea 0 10px,#b9c5cc 10px 14px,#f3f6f7 14px 22px),linear-gradient(#dfe6ea,#c8d2d8)' },
  grey:    { name: 'Grey Tinted',      css: 'linear-gradient(125deg,#7d858c 0%,#4a5157 55%,#646c72 100%)' },
  clear:   { name: 'Clear',            css: 'linear-gradient(125deg,#e8f3f6 0%,#cfe2e7 55%,#e2eef1 100%)' },
  mesh:    { name: 'Mesh',             css: 'repeating-linear-gradient(45deg,rgba(200,160,90,.55) 0 3px,transparent 3px 9px),repeating-linear-gradient(-45deg,rgba(200,160,90,.55) 0 3px,transparent 3px 9px),#e9dcc0' },
};
const FOUR = ['black', 'brown', 'reflect', 'fluted'];
const sheet = (k, w, h, extra = '') => `<div class="sheet" style="width:${w}px;height:${h}px;background:${GLASS[k].css};${extra}"><i></i></div>`;

// end card shared by all five (also the static frame)
function endCard(at, line1, line2) {
  const e = el(`<div class="end"><div class="logo"></div><div class="e1">${line1}</div><div class="e2">${line2}</div>
    <div class="types">${FOUR.map(k => `<span><b style="background:${GLASS[k].css}"></b>${GLASS[k].name}</span>`).join('')}<span><b style="background:${GLASS.grey.css}"></b>+ many more</span></div>
    <div class="btn">Ask for today's price</div><div class="url">WhatsApp +971 50 201 9281 · razanuae.com</div></div>`);
  SFX.push({ t: at, type: 'whoosh' }, { t: at + 1.0, type: 'ding' });
  return t => { const p = easeInOut(prog(t, at, .5)); e.style.opacity = p; e.style.visibility = p > 0 ? 'visible' : 'hidden';
    e.querySelector('.logo').style.opacity = easeOut(prog(t, at + .2, .5));                    // logo: fade only
    ['.e1', '.e2', '.types', '.btn', '.url'].forEach((c, i) => { const n = e.querySelector(c), r = rise(t, at + .35 + i * .18);
      n.style.opacity = r.o; n.style.transform = (c === '.btn' ? 'translateX(-50%) ' : '') + `translateY(${r.y}px)`; }); };
}
function hook(top, kicker, line, at = .15, light = false) {
  const h = el(`<div class="hook ${light ? 'light' : ''}" style="top:${top}px"><div class="k">${kicker}</div><div class="l">${line}</div></div>`);
  SFX.push({ t: at, type: 'pop' });
  return t => { const k = h.querySelector('.k'), l = h.querySelector('.l'), a = rise(t, at, .4), b = rise(t, at + .35, .45);
    set(k, { o: a.o, y: a.y, s: lerp(1.15, 1, easeOut(prog(t, at, .4))) }); set(l, b); };
}
const saleBadge = (x, y, at, size = 230) => { const b = el(`<div class="sale" style="left:${x}px;top:${y}px;width:${size}px;height:${size}px"><span>ON<br>SALE</span></div>`); SFX.push({ t: at, type: 'click' });
  return t => { const p = prog(t, at, .35); set(b, { o: clamp(p * 3), s: lerp(2, 1, easeOut(p)), r: lerp(-30, -12, easeOut(p)) }); }; };

const U = [];
/* ---------------- 1 · THE RACK: your photo, hook, glass types stack up as chips ---------------- */
if (V === 1) {
  const ph = el(`<div class="photo" style="background-image:url(../assets/glass-rack.jpg)"></div>`); el(`<div class="shade"></div>`);
  U.push(t => { ph.style.transform = `scale(${lerp(1.18, 1.02, easeInOut(prog(t, 0, 7.6)))})`; });
  U.push(hook(150, 'GLASS FACTORY OWNERS', 'Full glass sheets.<br><span>On sale now.</span>', .15, true));
  U.push(saleBadge(780, 470, 1.4));
  const chips = [...FOUR, 'more'].map((k, i) => el(`<div class="chip" style="top:${1010 + i * 118}px">${k === 'more' ? '<b style="background:' + GLASS.grey.css + '"></b>+ many more' : `<b style="background:${GLASS[k].css}"></b>${GLASS[k].name}`}</div>`));
  chips.forEach((c, i) => SFX.push({ t: 2.2 + i * .55, type: 'tick' }));
  U.push(t => chips.forEach((c, i) => { const p = prog(t, 2.2 + i * .55, .4); set(c, { o: clamp(p * 2) * (1 - prog(t, 7.3, .4)), x: lerp(-260, 0, easeOut(p)) }); }));
  U.push(endCard(7.6, 'Full sheets for glass factories.', 'On sale now — while stock lasts.'));
}
/* ---------------- 2 · SWATCH FAN: sheets fan out like a colour deck ---------------- */
if (V === 2) {
  stage.style.background = 'radial-gradient(ellipse at 50% 45%,#16324f 0%,#00203f 55%,#00142a 100%)';
  U.push(hook(170, 'GLASS FACTORY MANAGERS', 'Restock full sheets.<br><span>Sale prices this month.</span>', .15, true));
  const fan = FOUR.map((k, i) => el(`<div class="fan" style="left:340px;top:600px">${sheet(k, 400, 640)}</div>`));
  const names = el(`<div class="names">${FOUR.map(k => `<span><b style="background:${GLASS[k].css}"></b>${GLASS[k].name}</span>`).join('')}</div>`);
  U.push(t => set(names, rise(t, 3.3)));
  fan.forEach((f, i) => SFX.push({ t: 1.6 + i * .45, type: 'whoosh' }));
  U.push(t => fan.forEach((f, i) => { const p = easeBack(prog(t, 1.6 + i * .45, .6)), k = i - 1.5;
    set(f, { o: clamp(prog(t, 1.6 + i * .45, .2)), x: lerp(0, k * 190, p), y: lerp(500, Math.abs(k) * 40, p), r: lerp(0, k * 9, p) }); }));
  const more = el(`<div class="tag" style="left:50%;top:1590px">+ Grey · Clear · Mesh · and many more</div>`); SFX.push({ t: 3.7, type: 'pop' });
  U.push(t => set(more, { ...rise(t, 3.7), tx: 'translateX(-50%)' }));
  U.push(saleBadge(800, 470, 4.3, 210));
  U.push(endCard(7.4, 'Every tint. Full sheets.', 'Sale prices for glass factories.'));
}
/* ---------------- 3 · PRICE TAG: retail-sale energy over the rack photo ---------------- */
if (V === 3) {
  const ph = el(`<div class="photo" style="background-image:url(../assets/glass-rack.jpg);filter:saturate(.9)"></div>`); el(`<div class="shade strong"></div>`);
  U.push(t => { ph.style.transform = `scale(${lerp(1.05, 1.2, prog(t, 0, 8))}) translateY(${lerp(0, -30, prog(t, 0, 8))}px)`; });
  U.push(hook(150, 'ATTENTION, GLASS FACTORIES', 'The full-sheet <span>sale</span> is on.', .15, true));
  const tag = el(`<div class="ptag"><div class="hole"></div><div class="t1">SALE</div><div class="t2">FULL GLASS SHEETS</div><div class="t3">3.21 × 2.25 m · 3.66 × 2.14 m</div></div>`); SFX.push({ t: 1.4, type: 'click' });
  U.push(t => { const p = prog(t, 1.4, .6); set(tag, { o: clamp(p * 3) * (1 - prog(t, 7.2, .4)), y: lerp(-500, 0, easeBack(p)), r: lerp(-25, -6, easeOut(p)) + Math.sin(t * 2.2) * 1.5 * p }); });
  const rows = FOUR.map((k, i) => el(`<div class="line" style="top:${1150 + i * 92}px"><b style="background:${GLASS[k].css}"></b>${GLASS[k].name}<em>✓ IN STOCK</em></div>`));
  rows.forEach((r, i) => SFX.push({ t: 3.0 + i * .5, type: 'tick' }));
  U.push(t => rows.forEach((r, i) => set(r, { ...rise(t, 3.0 + i * .5, .35, 30), o: rise(t, 3.0 + i * .5, .35).o * (1 - prog(t, 7.2, .4)) })));
  U.push(endCard(7.5, 'Glass factories: stock up for less.', 'Full sheets on sale now.'));
}
/* ---------------- 4 · STOCK GAUGES: "running low?" → we're full ---------------- */
if (V === 4) {
  stage.style.background = 'linear-gradient(180deg,#f6f2ec 0%,#ece3d8 100%)';
  U.push(hook(170, 'RUNNING A GLASS FACTORY?', 'Low on sheets? <span>We\'re full.</span>'));
  const g = FOUR.map((k, i) => el(`<div class="gauge" style="top:${560 + i * 210}px"><div class="sw">${sheet(k, 130, 160)}</div><div class="gname">${GLASS[k].name}</div>
    <div class="track"><div class="fill"></div></div><div class="gl">LOW</div></div>`));
  g.forEach((n, i) => SFX.push({ t: 3.2 + i * .35, type: 'tick' }));
  SFX.push({ t: 5.0, type: 'ding' });
  U.push(t => g.forEach((n, i) => { set(n, { ...rise(t, .9 + i * .2), o: rise(t, .9 + i * .2).o * (1 - prog(t, 7.2, .4)) });
    const f = n.querySelector('.fill'), lbl = n.querySelector('.gl'), p = easeInOut(prog(t, 3.2 + i * .35, .8)), lvl = lerp(.14, 1, p);
    f.style.width = (lvl * 100) + '%'; f.style.background = p < .5 ? '#e03131' : '#1fae5b'; lbl.textContent = p < .5 ? 'YOURS: LOW' : 'RAZAN: IN STOCK'; lbl.style.color = p < .5 ? '#e03131' : '#1fae5b'; }));
  U.push(saleBadge(790, 1390, 5.4, 210));
  U.push(endCard(7.5, 'Keep your cutting line running.', 'Full sheets — on sale now.'));
}
/* ---------------- 5 · ONE SHEET, EVERY TINT: big sheet with dimensions, tint switches ---------------- */
if (V === 5) {
  stage.style.background = 'repeating-linear-gradient(0deg,rgba(255,255,255,.06) 0 1px,transparent 1px 40px),repeating-linear-gradient(90deg,rgba(255,255,255,.06) 0 1px,transparent 1px 40px),#0c3a66';
  U.push(hook(160, 'FOR GLASS FACTORIES & PROCESSORS', 'Full sheets, <span>every tint.</span>', .15, true));
  const big = el(`<div class="bigsheet"><div class="layer"></div><div class="layer"></div><i></i></div>`);
  const dimW = el(`<div class="dim w">3210 mm</div>`), dimH = el(`<div class="dim h">2250 mm</div>`);
  const nameEl = el(`<div class="tname"></div>`);
  const ORDER = ['black', 'brown', 'reflect', 'fluted', 'grey', 'mesh'], T0 = 1.6, STEP = .95;
  ORDER.forEach((k, i) => SFX.push({ t: T0 + i * STEP, type: i ? 'whoosh' : 'pop' }));
  const [la, lb] = big.querySelectorAll('.layer');
  U.push(t => { const p = easeOut(prog(t, .9, .6)); set(big, { o: clamp(p * 2) * (1 - prog(t, 7.4, .4)), s: lerp(.85, 1, p) });
    set(dimW, { o: prog(t, 1.2, .4) * (1 - prog(t, 7.4, .4)) }); set(dimH, { o: prog(t, 1.35, .4) * (1 - prog(t, 7.4, .4)) });
    const i = clamp(Math.floor((t - T0) / STEP), 0, ORDER.length - 1), f = prog(t, T0 + i * STEP, .35), k = ORDER[i], pk = ORDER[Math.max(0, i - 1)];
    la.style.background = GLASS[pk].css; lb.style.background = GLASS[k].css; lb.style.clipPath = `inset(0 ${(1 - easeInOut(f)) * 100}% 0 0)`;
    nameEl.textContent = i >= 4 ? GLASS[k].name + ' · and many more' : GLASS[k].name; set(nameEl, { o: prog(t, T0, .3) * (1 - prog(t, 7.4, .4)), y: lerp(16, 0, easeOut(f)) }); });
  U.push(saleBadge(770, 470, 6.8, 200));
  U.push(endCard(7.7, 'Full sheets. Every tint.', 'On sale now for glass factories.'));
}
// brand mark (top-left, fade only) on every creative
const mark = el(`<div class="mark ${V === 4 ? 'dark' : ''}"><i></i>RAZAN</div>`);
U.push(t => { mark.style.opacity = easeOut(prog(t, .2, .5)) * (1 - prog(t, 7.3, .3)); });

window.render = t => { U.forEach(u => u(t)); };
window.SFX = SFX.sort((a, b) => a.t - b.t); window.CFG = { duration: DUR, voiceAt: null };
window.DURATION = DUR; window.AUDIO_OFFSET = 0; window.AUDIO = `sb-glass${V}.mp3`;
const q = new URLSearchParams(location.search); window.render(q.has('t') ? +q.get('t') : 9.5); window.READY = true;
})();
