"""Builds a voiceover for the cinematic 'custom glass doors' reel from lines already recorded (same voice, James),
so no new ElevenLabs credits are needed. Each line is loudness-normalised and joined with a short breath.
Prints the start/end of every line in the new track (used for scene and caption timing in doors.js)."""
import subprocess, json, os
A = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'audio')
GAP = 0.28
LINES = [  # (file, start, end, caption)
  ('voiceover.mp3',     0.00,  2.64, 'Building a closet or a kitchen in the UAE?'),
  ('workshop.mp3',      3.30,  5.42, 'Razan sends complete door kits!'),
  ('workshop.mp3',      5.55,  9.30, 'Profiles cut for all four sides, matching glass, and hinges.'),
  ('compare-body.mp3',  9.80, 13.36, 'Our engineers check every size and every hole before production.'),
  ('workshop.mp3',     12.83, 16.45, 'Delivered next day by our own fleet, across all seven emirates!'),
  ('precision.mp3',    20.85, 24.80, 'Trusted by big developers in Dubai, with huge stock ready to go.'),
  ('compare-body.mp3', 13.52, 14.70, 'It fits the first time.'),
  ('compare-body.mp3', 14.81, 16.48, 'No waste. No stress.'),
  ('compare-body.mp3', 16.59, 20.05, 'Get it right the first time at razanuae.com!'),
]
parts, t, out = [], 0.0, []
for i, (f, s, e, cap) in enumerate(LINES):
    p = f'/tmp/cine_line_{i}.wav'
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', str(s), '-to', str(e), '-i', os.path.join(A, f),
                    '-af', 'loudnorm=I=-16:TP=-1.5:LRA=7,aresample=44100,afade=t=in:d=0.02,areverse,afade=t=in:d=0.04,areverse', '-ac', '1', p], check=True)
    d = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', p], capture_output=True, text=True).stdout)
    out.append(dict(start=round(t + .06, 2), end=round(t + d - .06, 2), text=cap)); parts.append(p); t += d + GAP
silence = '/tmp/cine_gap.wav'
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'lavfi', '-t', str(GAP), '-i', 'anullsrc=r=44100:cl=mono', silence], check=True)
seq = []
for p in parts: seq += [p, silence]
lst = '/tmp/cine_list.txt'; open(lst, 'w').write(''.join(f"file '{p}'\n" for p in seq[:-1]))
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', lst, '-c:a', 'libmp3lame', '-q:a', '2', os.path.join(A, 'cine-doors.mp3')], check=True)
json.dump(out, open(os.path.join(A, 'cine-doors.json'), 'w'), indent=1)
print(json.dumps(out, indent=1))
