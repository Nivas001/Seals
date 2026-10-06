"""Soundtrack for the explainer (v2): original music + sound design + narration, all synthesized here
(no third-party audio, so no licensing questions).
Music: 112 bpm, A minor (Am7–Fmaj7–C–G). Cinematic intro → tension (problem) → snare-roll build → drop at 18 s →
groove with a change on every scene cut → big hit and warm outro at 80 s.
Output: audio/mix.wav (48 kHz stereo, 90 s) plus stems. Event times match explainer.html."""
import json, pathlib
import numpy as np
import soundfile as sf
from scipy.signal import butter, sosfilt, resample_poly, fftconvolve
from scipy.ndimage import uniform_filter1d

HERE = pathlib.Path(__file__).parent
SR, DUR = 48000, 90.0
N = int(SR * DUR)
rng = np.random.default_rng(11)
BPM = 112
BEAT = 60 / BPM
BAR = 4 * BEAT
T0 = 18.0  # the drop lands on the first bar of the groove


def tt(sec):
    return np.arange(int(sec * SR)) / SR


def filt(x, kind, f, order=2):
    return sosfilt(butter(order, f, kind, fs=SR, output="sos"), x)


def note(m):
    return 440.0 * 2 ** ((m - 69) / 12)


def saw(f, x, bright=1.0):
    """Band-limited saw by additive synthesis."""
    out = np.zeros_like(x)
    for h in range(1, int(min(40, (SR / 2.2) / f)) + 1):
        out += np.sin(2 * np.pi * f * h * x) / h * (bright ** (h - 1))
    return out


def stereo():
    return np.zeros((N, 2))


def place(buf, sig, at, gain=1.0, pan=0.0):
    i = int(round(at * SR))
    if i >= N or gain == 0:
        return
    if i < 0:
        sig, i = sig[-i:], 0
    sig = sig[: N - i] * gain
    if sig.ndim == 1:
        l, r = np.cos((pan + 1) * np.pi / 4), np.sin((pan + 1) * np.pi / 4)
        buf[i : i + len(sig), 0] += sig * l
        buf[i : i + len(sig), 1] += sig * r
    else:
        buf[i : i + len(sig)] += sig


def reverb_ir(sec=1.8, decay=3.2):
    n = int(sec * SR)
    x = np.arange(n) / SR
    ir = rng.standard_normal((n, 2)) * np.exp(-x * decay)[:, None]
    for c in range(2):
        ir[:, c] = filt(ir[:, c], "low", 7000)
    return ir / np.sqrt((ir ** 2).sum(axis=0))


IR = reverb_ir()


def verb(buf, wet=0.3):
    out = np.zeros_like(buf)
    for c in range(2):
        out[:, c] = fftconvolve(buf[:, c], IR[:, c])[: len(buf)]
    return buf + out * wet


def env_adsr(n, a=0.005, d=0.1, s=0.6, r=0.2):
    x = np.arange(n) / SR
    hold = n / SR - r
    e = np.where(x < a, x / a, np.where(x < a + d, 1 - (1 - s) * (x - a) / d, s))
    return e * (1 - np.clip((x - hold) / r, 0, 1))


# ═══════════════════════════ MUSIC ═══════════════════════════
drums, bass, keys, pads, fx_music = stereo(), stereo(), stereo(), stereo(), stereo()


def kick():
    x = tt(0.45)
    body = np.sin(2 * np.pi * (44 + 110 * np.exp(-x * 28)) * x) * np.exp(-x * 7)
    click = filt(rng.standard_normal(len(x)), "high", 2000) * np.exp(-x * 120) * 0.25
    return np.tanh((body + click) * 1.6)


def clap():
    x = tt(0.35)
    n = filt(rng.standard_normal(len(x)), "band", [900, 3500])
    e = np.zeros_like(x)
    for off in (0, 0.011, 0.022):
        e += np.where(x >= off, np.exp(-(x - off) * (60 if off < 0.02 else 18)), 0)
    return n * e * 0.6


def hat(open_=False):
    x = tt(0.35 if open_ else 0.07)
    return filt(rng.standard_normal(len(x)), "high", 7500) * np.exp(-x * (9 if open_ else 70))


def crash():
    x = tt(2.6)
    return (filt(rng.standard_normal(len(x)), "high", 4000) * np.exp(-x * 1.6) + filt(rng.standard_normal(len(x)), "band", [2500, 6000]) * np.exp(-x * 4)) * 0.5


def snare():
    x = tt(0.25)
    return (filt(rng.standard_normal(len(x)), "band", [1500, 6000]) * np.exp(-x * 25) + np.sin(2 * np.pi * 190 * x) * np.exp(-x * 30) * 0.6) * 0.6


def tom(f):
    x = tt(0.4)
    return np.sin(2 * np.pi * (f + f * 0.6 * np.exp(-x * 20)) * x) * np.exp(-x * 8)


def pluck(m, sec=0.45, bright=0.75):
    x = tt(sec)
    f = note(m)
    out = np.zeros_like(x)
    for h in range(1, 12):
        out += np.sin(2 * np.pi * f * h * x) / h * np.exp(-x * (5 + h * 3.5)) * (bright ** (h - 1))
    return out * (1 - np.exp(-x * 600))


def stab(chord, sec):
    x = tt(sec)
    out = np.zeros_like(x)
    for m in chord:
        for det in (-0.12, 0, 0.12):
            out += saw(note(m + det), x + rng.random(), 0.82)
    return filt(out, "low", 2600) * env_adsr(len(x), 0.004, 0.18, 0.35, 0.08) / len(chord)


def pad_chord(chord, sec, cutoff=1600):
    x = tt(sec)
    l, r = np.zeros_like(x), np.zeros_like(x)
    for m in chord:
        for k, det in enumerate((-0.09, -0.03, 0.03, 0.09)):
            s = saw(note(m + det), x + k * 0.37, 0.7)
            if k % 2:
                l += s
            else:
                r += s
    e = env_adsr(len(x), 0.8, 0.5, 0.85, 1.0)
    return np.stack([filt(l, "low", cutoff), filt(r, "low", cutoff)], axis=1) * e[:, None] / len(chord) / 2


def bass_note(m, sec):
    x = tt(sec)
    s = saw(note(m), x, 0.85)
    w = np.exp(-x * 14)  # filter envelope: bright attack, warm body
    out = filt(s, "low", 220) * (1 - w) + filt(s, "low", 1100) * w + 0.6 * np.sin(2 * np.pi * note(m - 12) * x)
    return out * env_adsr(len(x), 0.003, 0.08, 0.7, 0.04)


PROG = [[57, 60, 64, 67], [53, 57, 60, 64], [48, 55, 60, 64], [55, 59, 62, 67]]  # Am7, Fmaj7, C, G
ROOTS = [45, 41, 48, 43]


def chord_at(t):
    return int((t - T0) // (2 * BAR)) % 4


# intro (0–7.75): drone, shimmering arp, reverse cymbal into the flash
x = tt(7.9)
place(pads, (np.sin(2 * np.pi * note(33) * x) + 0.5 * np.sin(2 * np.pi * note(45) * x)) * np.minimum(1, x / 1.5) * 0.35, 0.0)
place(pads, pad_chord([57, 64, 67, 71], 7.9, 1300), 0.0, 0.9)
for i, m in enumerate([69, 72, 76, 79, 81, 79, 76, 72] * 3):
    at = 0.9 + i * BEAT / 2
    if at < 7.5:
        place(keys, pluck(m + 12, 0.5, 0.6), at, 0.12 * min(1, at / 3), 0.4 if i % 2 else -0.4)
place(fx_music, crash()[::-1][-int(1.6 * SR):], 7.75 - 1.6, 0.6)

# tension (8–15.2): pulsing bass, clock ticks, heartbeat kick, uneasy pad
t = 8.0
while t < 15.2:
    place(bass, bass_note(33, BEAT / 2 * 0.9), t, 0.5)
    t += BEAT / 2
t = 8.0
while t < 17.5:
    place(drums, hat(), t, 0.10, 0.3)
    t += BEAT
for b in np.arange(8.0, 15.2, 2 * BEAT):
    place(drums, kick(), b, 0.55)
    place(drums, kick(), b + 0.75 * BEAT, 0.35)
place(pads, pad_chord([57, 58, 64], 7.4, 900), 8.0, 0.8)

# build (15.2–17.55): accelerating snare roll + riser
roll = 15.2
while roll < 17.5:
    place(drums, snare(), roll, 0.12 + 0.35 * (roll - 15.2) / 2.3)
    roll += BEAT / 2 if roll < 16.3 else (BEAT / 4 if roll < 17.0 else BEAT / 8)
x = tt(2.6)
place(fx_music, (filt(rng.standard_normal(len(x)), "band", [1500, 8000]) * (x / 2.6) ** 2 + np.sin(2 * np.pi * np.cumsum(200 * (8 ** (x / 2.6))) / SR) * 0.3 * (x / 2.6)) * 0.6, 15.2, 0.7)

# groove (18–79.3) with short drum drop-outs before the 30 s and 57 s cuts
breaks = [(29.2, 30.0), (56.3, 57.0)]
in_groove = lambda t: 18.0 <= t < 79.3
drums_on = lambda t: in_groove(t) and not any(a <= t < b for a, b in breaks)
nb = int((79.3 - T0) / BEAT) + 1
for i in range(nb):
    t = T0 + i * BEAT
    if not in_groove(t):
        continue
    if drums_on(t):
        place(drums, kick(), t, 0.95)
        if i % 4 in (1, 3):
            place(drums, clap(), t, 0.55, 0.05)
        place(drums, hat(True), t + BEAT / 2, 0.10, 0.2)
        for s16 in (0.25, 0.75):
            place(drums, hat(), t + s16 * BEAT, 0.06 + 0.02 * rng.random(), -0.25)
    c = chord_at(t)
    place(bass, bass_note(ROOTS[c], BEAT / 2 * 0.85), t + BEAT / 2, 0.5)
    if i % 4 in (1, 3):
        place(keys, stab(PROG[c], BEAT * 0.6), t + BEAT / 2, 0.22, -0.2 if i % 4 == 1 else 0.2)
t = T0
while t < 80.0:
    place(pads, pad_chord(PROG[chord_at(t)], 2 * BAR + 1.0), t, 0.55)
    t += 2 * BAR
pattern = [0, 2, 1, 3, 2, 1, 3, 2]
t, k = T0, 0
while t < 79.3:
    if (18.0 <= t < 29.2) or (45.0 <= t < 56.3) or (67.0 <= t < 79.3):
        place(keys, pluck(PROG[chord_at(t)][pattern[k % 8]] + 12, 0.4), t, 0.07 if t < 30 else 0.1, 0.35 if k % 2 else -0.35)
    k += 1
    t = T0 + k * BEAT / 2
for at in (18.0, 30.0, 45.0, 57.0, 67.0):
    place(drums, crash(), at, 0.35)
for j, (f, off) in enumerate([(160, 0), (130, 0.5), (110, 1.0), (90, 1.5)]):
    place(drums, tom(f), 66.2 + off * BEAT, 0.5, -0.4 + j * 0.25)
x = tt(1.8)
place(fx_music, filt(rng.standard_normal(len(x)), "band", [1000, 9000]) * (x / 1.8) ** 2.5 * 0.7, 78.0)

# outro (80–90): big hit, warm open chord, gentle arp, ring-out
place(drums, crash(), 80.0, 0.5)
place(drums, kick(), 80.0, 1.0)
x = tt(10)
place(drums, np.sin(2 * np.pi * (35 + 40 * np.exp(-x * 6)) * x) * np.exp(-x * 1.2), 80.0, 0.6)
place(pads, pad_chord([45, 57, 64, 67, 71, 76], 10.0, 2200), 80.0, 0.8)
for i, m in enumerate([69, 72, 76, 79, 76, 72, 74, 76, 79, 81, 79, 76, 72, 76]):
    place(keys, pluck(m + 12, 0.6, 0.65), 80.6 + i * BEAT / 2, 0.09 * max(0.2, 1 - i / 16), 0.35 if i % 2 else -0.35)

# sidechain pump from the kick on everything melodic
pump = np.ones(N)
for kt in (T0 + i * BEAT for i in range(nb) if drums_on(T0 + i * BEAT)):
    i = int(kt * SR)
    n = min(int(0.3 * SR), N - i)
    pump[i : i + n] = np.minimum(pump[i : i + n], 1 - 0.55 * np.exp(-np.arange(n) / SR / 0.09))
P = pump[:, None]
music = verb(drums, 0.12) + bass * P * 0.9 + verb(keys * P, 0.35) + verb(pads * P, 0.2) + verb(fx_music, 0.2)
music = filt(music.T, "high", 30).T

# ═══════════════════════════ SOUND EFFECTS ═══════════════════════════
sfx = stereo()
S = lambda sig, at, g=1.0, pan=0.0: place(sfx, sig, at, g, pan)


def whoosh(sec=0.8, lo=300, hi=6000, up=True):
    n = int(sec * SR)
    noise = rng.standard_normal(n)
    out = np.zeros(n)
    steps = 28
    for k in range(steps):
        a, b = k * n // steps, (k + 1) * n // steps
        fr = k / (steps - 1)
        f = lo * (hi / lo) ** (fr if up else 1 - fr)
        seg = filt(noise[max(0, a - 3000) : b], "band", [max(40, f * 0.55), min(SR / 2 - 200, f * 1.5)])
        out[a:b] = seg[-(b - a):]
    return out * np.sin(np.linspace(0, np.pi, n)) ** 1.5


def impact(sec=2.0, f0=40):
    x = tt(sec)
    boom = np.sin(2 * np.pi * (f0 + 90 * np.exp(-x * 16)) * x) * np.exp(-x * 2.6)
    crack = filt(rng.standard_normal(len(x)), "high", 1200) * np.exp(-x * 30) * 0.4
    return np.tanh((boom + crack) * 1.4)


def shimmer(sec=2.0, base=81):
    x = tt(sec)
    return sum(np.sin(2 * np.pi * note(base + iv) * x) * np.exp(-x * (2 + j * .6)) for j, iv in enumerate([0, 7, 12, 16, 19, 24])) / 5


def pop(f=900, sec=0.14):
    x = tt(sec)
    return np.sin(2 * np.pi * np.cumsum(f * (1 + 0.6 * np.exp(-x * 45))) / SR) * np.exp(-x * 32)


def click():
    x = tt(0.03)
    return filt(rng.standard_normal(len(x)), "band", [2000, 7000]) * np.exp(-x * 220)


def thud(f=70, sec=0.35):
    x = tt(sec)
    return np.sin(2 * np.pi * (f + 60 * np.exp(-x * 30)) * x) * np.exp(-x * 14) + filt(rng.standard_normal(len(x)), "low", 900) * np.exp(-x * 40) * 0.5


def chime(notes=(76, 83, 88), gap=0.07):
    out = np.zeros(int(1.6 * SR))
    for i, m in enumerate(notes):
        x = tt(1.6 - i * gap)
        out[int(i * gap * SR) :] += (np.sin(2 * np.pi * note(m) * x) + 0.3 * np.sin(2 * np.pi * note(m + 12) * x)) * np.exp(-x * 4)
    return out * 0.6


def bubble(up=True):
    x = tt(0.2)
    f = np.linspace(450, 1100, len(x)) if up else np.linspace(1050, 620, len(x))
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * x / x[-1]) ** 2


def shutter():
    a = filt(rng.standard_normal(int(0.05 * SR)), "band", [1500, 8000]) * np.exp(-np.arange(int(0.05 * SR)) / SR * 90)
    out = np.zeros(int(0.16 * SR))
    out[: len(a)] += a
    out[int(0.08 * SR) : int(0.08 * SR) + len(a)] += a * 0.8
    return out


def ring():
    x = tt(0.9)
    tone = (np.sin(2 * np.pi * 1300 * x) + np.sin(2 * np.pi * 1700 * x)) * (np.sin(2 * np.pi * 22 * x) > 0)
    gate = ((x < 0.35) | ((x > 0.5) & (x < 0.85))).astype(float)
    return filt(tone * gate, "low", 4000) * 0.25


def siren(sec):
    x = tt(sec)
    ph = 2 * np.pi * np.cumsum(620 + 260 * (0.5 - 0.5 * np.cos(2 * np.pi * x))) / SR
    return filt(np.sin(ph) + 0.3 * np.sin(2 * ph), "low", 2500) * np.minimum(1, x / 0.4) * np.minimum(1, (sec - x) / 0.6)


def glitch(sec=0.5):
    x = tt(sec)
    g = filt(rng.standard_normal(len(x)) * (np.sin(2 * np.pi * 37 * x) > 0.3), "band", [600, 5000]) * 0.5
    return g + np.sign(np.sin(2 * np.pi * 180 * x)) * (np.sin(2 * np.pi * 11 * x) > 0.6) * 0.15


def powerdown(sec=3.0):
    x = tt(sec)
    ph = 2 * np.pi * np.cumsum(220 * np.exp(-x * 1.1) + 30) / SR
    return (np.sin(ph) + 0.4 * np.sign(np.sin(ph))) * 0.3 * np.exp(-x * 0.5) * np.minimum(1, x / 0.1)


def sweep(sec=2.6):
    x = tt(sec)
    f = 400 * (6 ** np.sin(np.pi * x / sec))
    return (np.sin(2 * np.pi * np.cumsum(f) / SR) * 0.25 + filt(rng.standard_normal(len(x)), "band", [3000, 9000]) * 0.4) * np.sin(np.pi * x / sec) ** 2


def blip(f):
    x = tt(0.06)
    return np.sign(np.sin(2 * np.pi * f * x)) * np.exp(-x * 60) * 0.25


def kaching():
    out = chime((88, 93, 100), 0.05)
    x = tt(0.6)
    out[: len(x)] += filt(rng.standard_normal(len(x)), "band", [3000, 9000]) * np.exp(-x * 10) * (np.sin(2 * np.pi * 30 * x) > 0) * 0.5
    return out


def tape():
    x = tt(0.55)
    rip = filt(rng.standard_normal(len(x)), "band", [800, 6000]) * (0.6 + 0.4 * np.sign(np.sin(2 * np.pi * 70 * x)))
    return rip * np.sin(np.pi * x / x[-1]) ** 0.6 * 0.7


def cardboard():
    x = tt(0.25)
    return filt(rng.standard_normal(len(x)), "band", [200, 1800]) * np.exp(-x * 18) * 0.8 + thud(90, 0.25) * 0.4


def horn():
    x = tt(0.55)
    tone = sum(np.sign(np.sin(2 * np.pi * f * x)) for f in (330, 415))
    gate = ((x < 0.18) | (x > 0.26)).astype(float)
    return filt(tone * gate, "low", 1800) * 0.25 * np.minimum(1, (0.55 - x) / 0.05)


def engine(sec):
    x = tt(sec)
    e = filt(rng.standard_normal(len(x)), "low", 180) * (1 + 0.4 * np.sin(2 * np.pi * 11 * x)) * 3 + 0.3 * np.sin(2 * np.pi * 55 * x)
    return e * np.minimum(1, x / 0.6) * np.minimum(1, (sec - x) / 0.8)


def jet(sec):
    x = tt(sec)
    return filt(rng.standard_normal(len(x)), "band", [400, 5000]) * 1.2 * np.minimum(1, x / 1.2) * np.minimum(1, (sec - x) / 1.0)


def waves(sec):
    x = tt(sec)
    return filt(rng.standard_normal(len(x)), "low", 900) * (0.6 + 0.4 * np.sin(2 * np.pi * 0.35 * x)) * 1.6 * np.minimum(1, x / 1.0) * np.minimum(1, (sec - x) / 1.0)


def riser(sec, lo=1000, hi=9000, p=2.0):
    x = tt(sec)
    return filt(rng.standard_normal(len(x)), "band", [lo, hi]) * (x / sec) ** p


# intro
S(impact(2.4), 0.5, 0.8); S(shimmer(2.4), 0.9, 0.35); S(pop(700), 0.9, 0.25)
for i in range(8):
    S(click(), 1.5 + i * 0.06, 0.35, -0.5 + i / 7)
S(whoosh(1.4, 400, 5000, True), 2.2, 0.25)
S(whoosh(0.8, 800, 4000, True), 3.2, 0.2)
for i in range(3):
    S(pop(780 + i * 140), 4.5 + i * 0.05, 0.18, -0.4 + i * 0.4)
for i in range(14):  # photos flying past the camera
    S(whoosh(0.7, 500, 3500, False), i * 0.3 + 3.0, 0.07 + 0.04 * rng.random(), float(np.clip(np.cos(i / 14 * 2 * np.pi), -0.9, 0.9)))
S(whoosh(1.0, 200, 7000, True), 7.0, 0.35); S(impact(1.6, 50), 7.75, 0.7)
# problem
S(whoosh(0.9, 5000, 300, False), 8.0, 0.4)
S(thud(60), 8.9, 0.5); S(thud(55), 9.9, 0.5)
S(impact(1.4, 35), 11.1, 0.85); S(glitch(0.4), 11.2, 0.35)
S(siren(6.4), 11.4, 0.13, 0.5)
S(glitch(0.6), 12.2, 0.3, 0.4)
for s in range(6):
    S(blip(1400), 12.4 + s, 0.25, 0.4)
S(powerdown(3.4), 12.6, 0.35, 0.3)
S(whoosh(1.0, 300, 4000, True), 15.0, 0.25)
for i in range(10):  # blinds
    S(whoosh(0.35, 3000, 600, False), 17.55 + i * 0.035, 0.07, -0.9 + i * 0.2)
S(whoosh(0.5, 2500, 400, False), 18.05, 0.3)
# step 1: phone
S(whoosh(1.0, 300, 3000, True), 18.5, 0.25, 0.4)
for i in range(3):
    S(pop(700 + i * 150), 20.4 + i * 0.25, 0.25, -0.5)
S(shutter(), 21.2, 0.45, 0.4); S(bubble(True), 21.5, 0.45, 0.4)
S(ring(), 22.1, 0.5, -0.3)
S(chime((84, 88), 0.08), 22.8, 0.25, 0.6)
for i in range(11):
    S(click(), 23.0 + i * 0.11 + 0.03 * rng.random(), 0.18, 0.3)
S(bubble(False), 24.4, 0.45, 0.3)
S(whoosh(0.4, 800, 3000, True), 25.5, 0.2, 0.3); S(pop(1000), 25.65, 0.25, 0.3)
S(click(), 26.7, 0.4, 0.3); S(click(), 26.75, 0.3, 0.3)
S(thud(80), 27.45, 0.7); S(click(), 27.45, 0.4)
S(riser(0.9), 28.9, 0.35)
S(impact(1.6, 45), 29.75, 0.7)
# step 2: map
S(whoosh(3.4, 6000, 120, False), 30.2, 0.45); S(impact(2.5, 30), 30.2, 0.4)
for at, pan in ((34.0, -0.7), (34.6, -0.75), (35.2, 0.8)):
    S(chime((88,), 0), at, 0.25, pan)
for at, pan in ((36.4, -0.1), (36.7, 0.0), (37.0, 0.2), (37.3, -0.1)):
    S(pop(1300), at, 0.12, pan)
for i in range(5):
    S(whoosh(1.2, 900, 3000, True), 35.8 + i * 0.95, 0.07, -0.6 + i * 0.3)
S(sweep(2.6), 36.4, 0.3)
for i in range(18):
    S(blip(900 + rng.integers(0, 6) * 150), 36.6 + i * 0.15, 0.12, 0.6)
S(chime((76, 81, 85, 88), 0.06), 39.4, 0.45, 0.5)
for i in range(3):
    S(pop(900 + i * 120), 40 + i * 0.3, 0.18, 0.6)
S(whoosh(0.9, 400, 6000, True), 44.5, 0.45)
# step 3: price
for i in range(5):
    S(whoosh(0.3, 1500, 4000, True), 46.2 + i * 0.14, 0.12, 0.4)
    S(blip(700 + i * 120), 47.2 + i * 0.1, 0.15, 0.4)
    S(whoosh(0.35, 2500, 800, False), 49.4 + i * 0.05, 0.12, 0.3)
S(chime((79, 84), 0.06), 50.4, 0.35, 0.4); S(kaching(), 50.5, 0.55, 0.4)
S(thud(80), 50.95, 0.7, 0.6)
x = tt(1.6)
S(np.sin(2 * np.pi * np.cumsum(300 * (3 ** (x / 1.6))) / SR) * 0.3 * np.sin(np.pi * x / 1.6), 52.3, 0.35, 0.3)
S(whoosh(1.0, 300, 6000, True), 56.6, 0.4, 0.6)
# step 4: box
S(whoosh(0.8, 300, 2000, True), 57.5, 0.3, 0.5); S(thud(65, 0.5), 58.35, 0.7, 0.5)
for at in (59.05, 59.65, 60.25):
    S(whoosh(0.5, 2000, 500, False), at - 0.5, 0.15, 0.5); S(cardboard(), at, 0.7, 0.5)
for i, at in enumerate((58.8, 59.9, 61.4, 62.7)):
    S(chime((84 + i * 2,), 0), at, 0.25, -0.5)
for at in (60.5, 60.7, 61.1, 61.3):
    S(whoosh(0.35, 600, 2500, True), at, 0.25, 0.5); S(cardboard(), at + 0.35, 0.35, 0.5)
S(tape(), 61.9, 0.6, 0.5)
S(thud(90, 0.3), 62.8, 0.6, 0.5)
S(thud(70, 0.4), 63.6, 0.9, 0.5); S(click(), 63.6, 0.5, 0.5)
S(whoosh(0.9, 6000, 300, False), 66.5, 0.45)
# step 5: delivery
for i, at in enumerate((68.4, 68.8, 69.2)):
    S(whoosh(0.6, 3000, 400, False), at, 0.25, -0.6 + i * 0.6); S(thud(70, 0.3), at + 0.55, 0.5, -0.6 + i * 0.6)
S(engine(7.0), 69.0, 0.45, -0.6)
S(jet(7.0), 69.3, 0.22, 0.0)
S(waves(7.0), 69.6, 0.35, 0.6)
S(horn(), 72.0, 0.5, -0.6)
S(whoosh(0.8, 3000, 300, False), 75.8, 0.4)
S(chime((79, 86, 91), 0.08), 76.65, 0.55)
S(pop(800), 77.4, 0.35)
# outro
S(riser(1.2, 800, 8000), 78.6, 0.35)
S(impact(3.0, 32), 79.85, 0.95); S(shimmer(3.0, 76), 80.4, 0.4)
S(pop(700), 80.4, 0.3)
S(whoosh(0.9, 600, 4000, True), 81.1, 0.2)
S(pop(900), 83.0, 0.2); S(pop(1000), 84.2, 0.2); S(pop(1100), 84.4, 0.2)
S(chime((88, 95), 0.1), 85.0, 0.25)
S(whoosh(0.9, 500, 3000, True), 85.5, 0.15)
sfx = verb(sfx, 0.18)

# ═══════════════════════════ NARRATION ═══════════════════════════
voice = stereo()
for v in json.loads((HERE / "audio" / "voiceover.json").read_text()):
    data, sr = sf.read(HERE / "audio" / v["file"])
    if data.ndim > 1:
        data = data.mean(axis=1)
    data = filt(resample_poly(data, SR, sr), "high", 90)
    data = data + 0.35 * filt(data, "high", 3500)  # presence
    env = uniform_filter1d(np.abs(data), int(0.02 * SR)) + 1e-4
    data = data * np.minimum(1.0, (0.12 / env) ** 0.4)  # gentle compression
    place(voice, data / (np.max(np.abs(data)) + 1e-9) * 0.85, v["start"])
voice = verb(voice, 0.06)

# ═══════════════════════════ MIX ═══════════════════════════
venv = uniform_filter1d(uniform_filter1d(np.abs(voice).max(axis=1), int(0.2 * SR)), int(0.2 * SR))
duck = 1 - 0.5 * np.clip(venv / 0.06, 0, 1)
fade = np.clip((DUR - np.arange(N) / SR) / 3.0, 0, 1)
music /= np.max(np.abs(music)) + 1e-9
sfx /= np.max(np.abs(sfx)) + 1e-9
MUSIC_G, SFX_G = 0.30, 0.42
# music automation: quieter intro/tension, a build that swells, full level from the drop
tsec = np.arange(N) / SR
auto = np.interp(tsec, [0, 7.6, 8.0, 15.0, 15.2, 17.5, 17.95, 18.0, 90], [0.8, 0.8, 0.62, 0.62, 0.9, 2.4, 2.4, 1.15, 1.15])
mix = voice + music * MUSIC_G * (duck * fade * auto)[:, None] + sfx * SFX_G * (0.65 + 0.35 * duck)[:, None]
mix = np.tanh(mix * 1.4) / np.tanh(1.4)  # soft clip / glue
mix /= np.max(np.abs(mix)) / 0.9
sf.write(HERE / "audio" / "mix.wav", mix.astype(np.float32), SR, subtype="FLOAT")
for name, stem in (("music", music * MUSIC_G), ("sfx", sfx * SFX_G), ("voice", voice)):
    sf.write(HERE / "audio" / f"stem-{name}.wav", stem.astype(np.float32), SR, subtype="FLOAT")
print("mix.wav written, peak", float(np.max(np.abs(mix))))
