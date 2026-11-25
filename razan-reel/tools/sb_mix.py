"""Builds a storyboard sound track: synthesised receipt ticks + soft whooshes at the page's SFX times, plus one voice line.
Usage: node tools/sb_audio.js sb-cutlist | python3 tools/sb_mix.py audio/douglas-endline.mp3 audio/sb-cutlist.mp3"""
import sys, json, subprocess, numpy as np
SR = 44100
data = json.load(sys.stdin); sfx, cfg = data['sfx'], data['cfg']
voice_in, out = sys.argv[1], sys.argv[2]
N = int(cfg['duration'] * SR); track = np.zeros(N)
rng = np.random.default_rng(7)
def tick():                      # thermal-printer tick: a tiny bright click + a soft body
    n = int(.018 * SR); t = np.arange(n) / SR
    click = rng.standard_normal(n) * np.exp(-t * 900); click = np.diff(click, prepend=0) * .9
    body = np.sin(2 * np.pi * 2300 * t) * np.exp(-t * 400) * .25
    return (click + body) * .55
def whoosh():                    # soft air whoosh: noise through a sweeping one-pole low-pass, rounded envelope
    n = int(.38 * SR); t = np.arange(n) / SR; x = rng.standard_normal(n); y = np.zeros(n); a = 0.0
    cut = 600 + 3800 * np.sin(np.pi * t / t[-1]) ** 2
    for i in range(n):
        k = 1 - np.exp(-2 * np.pi * cut[i] / SR); a += k * (x[i] - a); y[i] = a
    env = np.sin(np.pi * t / t[-1]) ** 1.5
    return y * env * .45
def ping():                      # incoming-message ping: two quick soft tones
    n = int(.16 * SR); t = np.arange(n) / SR
    a = np.sin(2 * np.pi * 1320 * t) * np.exp(-t * 38) * (t < .07); b = np.sin(2 * np.pi * 1760 * (t - .07)) * np.exp(-(t - .07) * 34) * (t >= .07)
    return (a + b) * .22
def pop():                       # sent / calm message: one low soft pop
    n = int(.12 * SR); t = np.arange(n) / SR
    return np.sin(2 * np.pi * (520 + 300 * np.exp(-t * 60)) * t) * np.exp(-t * 32) * .3
T, W, P, O = tick(), whoosh(), ping(), pop()
for e in sfx:
    s = int(e['t'] * SR); clip = {'tick': T, 'whoosh': W, 'ping': P, 'pop': O}[e['type']]
    e2 = min(N, s + len(clip)); track[s:e2] += clip[:e2 - s]
# voice
raw = b'' if voice_in == '-' else subprocess.run(['ffmpeg', '-v', 'error', '-i', voice_in, '-af', 'loudnorm=I=-16:TP=-1.5', '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True).stdout
v = np.frombuffer(raw, dtype=np.float32).astype(float); s = int((cfg.get('voiceAt') or 0) * SR); e2 = min(N, s + len(v)); track[s:e2] += v[:e2 - s]
track /= max(1.0, np.abs(track).max() / .95)
pcm = (track * 32767).astype('<i2').tobytes()
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 's16le', '-ar', str(SR), '-ac', '1', '-i', '-', '-c:a', 'libmp3lame', '-q:a', '2', out], input=pcm, check=True)
print('sfx events:', len(sfx), '· voice at', cfg['voiceAt'], 's · track', cfg['duration'], 's ->', out)
