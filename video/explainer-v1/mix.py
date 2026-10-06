"""Soundtrack for the classic explainer: soft synthesized music bed (C–Am–F–G, 100 bpm) + sound effects + narration.
Everything is generated here (no third-party audio). Output: audio/mix.wav (48 kHz stereo, 90 s)."""
import json, pathlib
import numpy as np
import soundfile as sf
from scipy.signal import butter, sosfilt, resample_poly, fftconvolve
from scipy.ndimage import uniform_filter1d

HERE = pathlib.Path(__file__).parent
SR, DUR = 48000, 90.0
N = int(SR * DUR)
rng = np.random.default_rng(7)


def tt(sec):
    return np.arange(int(sec * SR)) / SR


def filt(x, kind, f, order=2):
    return sosfilt(butter(order, f, kind, fs=SR, output="sos"), x)


def note(m):
    return 440.0 * 2 ** ((m - 69) / 12)


def place(buf, sig, at, gain=1.0, pan=0.0):
    i = int(at * SR)
    if i >= N:
        return
    sig = sig[: N - i] * gain
    l, r = np.cos((pan + 1) * np.pi / 4), np.sin((pan + 1) * np.pi / 4)
    buf[i : i + len(sig), 0] += sig * l
    buf[i : i + len(sig), 1] += sig * r


def whoosh(sec=0.9, lo=300, hi=5000, rise=True):
    n = int(sec * SR)
    noise = rng.standard_normal(n)
    out = np.zeros(n)
    for k in range(24):
        a, b = k * n // 24, (k + 1) * n // 24
        f = lo * (hi / lo) ** ((k / 23) if rise else 1 - k / 23)
        seg = filt(noise[max(0, a - 2000) : b], "band", [max(40, f * 0.6), min(SR / 2 - 100, f * 1.4)])
        out[a:b] = seg[-(b - a):]
    return out * np.sin(np.linspace(0, np.pi, n)) ** 1.6 * 0.9


def impact(sec=1.6):
    x = tt(sec)
    return np.sin(2 * np.pi * (48 + 60 * np.exp(-x * 18)) * x) * np.exp(-x * 3.2) + filt(rng.standard_normal(len(x)), "high", 1500) * np.exp(-x * 60) * 0.35


def shimmer(sec=1.8, base=72):
    x = tt(sec)
    return sum(np.sin(2 * np.pi * note(base + iv) * x) * np.exp(-x * (2.2 + j)) for j, iv in enumerate([0, 7, 12, 16, 19, 24])) / 4


def pop(f=880, sec=0.16):
    x = tt(sec)
    return np.sin(2 * np.pi * f * (1 + 0.5 * np.exp(-x * 40)) * x) * np.exp(-x * 30)


def ding(m=84, sec=1.2):
    x = tt(sec)
    f = note(m)
    return (np.sin(2 * np.pi * f * x) + 0.4 * np.sin(2 * np.pi * 2.76 * f * x) * np.exp(-x * 6)) * np.exp(-x * 4.5) * 0.7


def bubble(up=True):
    x = tt(0.22)
    f0, f1 = (500, 1100) if up else (1000, 650)
    return np.sin(2 * np.pi * np.cumsum(f0 + (f1 - f0) * (x / x[-1])) / SR) * np.sin(np.pi * x / x[-1]) ** 2


def beep():
    x = tt(0.42)
    return filt(np.sin(2 * np.pi * 880 * x) * (x < 0.18) + np.sin(2 * np.pi * 660 * x) * (x >= 0.22), "low", 3000) * 0.5


def sonar():
    x = tt(1.6)
    return np.sin(2 * np.pi * 1320 * x) * np.exp(-x * 3) * (1 - np.exp(-x * 200)) * 0.6


def riser(sec=1.6, f0=200, f1=1600):
    x = tt(sec)
    tone = np.sin(2 * np.pi * np.cumsum(f0 * (f1 / f0) ** (x / sec)) / SR) * 0.25
    return (tone + filt(rng.standard_normal(len(x)), "band", [2000, 9000]) * 0.5) * (x / sec) ** 2


def rumble(sec=5.0):
    x = tt(sec)
    engine = filt(rng.standard_normal(len(x)), "low", 160) * (1 + 0.35 * np.sin(2 * np.pi * 9 * x))
    return (engine * 3 + 0.25 * np.sin(2 * np.pi * 62 * x)) * np.minimum(1, x / 0.8) * np.minimum(1, (sec - x) / 1.0)


def jet(sec=3.8):
    x = tt(sec)
    return filt(rng.standard_normal(len(x)), "band", [300, 4000]) * np.sin(np.pi * x / sec) ** 2 * 1.4


def tick(m):
    x = tt(0.35)
    return (np.sin(2 * np.pi * note(m) * x) + 0.3 * np.sin(2 * np.pi * note(m + 12) * x)) * np.exp(-x * 14) * 0.8


sfx = np.zeros((N, 2))
S = lambda sig, at, g=1.0, pan=0.0: place(sfx, sig, at, g, pan)
S(impact(), 0.35, 0.9); S(shimmer(), 0.4, 0.35); S(pop(1200), 2.3, 0.18); S(pop(740), 4.6, 0.2, -0.3); S(pop(990), 4.75, 0.2, 0.3)
for b in (9, 31, 59, 81):
    S(whoosh(1.1, 200, 6000, True), b - 0.35, 0.45)
for b in (19, 47, 69):
    S(whoosh(0.85, 4500, 300, False), b - 0.5, 0.55, 0.2)
for k in range(3):
    S(beep(), 11.0 + k, 0.22, 0.4)
S(pop(660), 13.4, 0.18); S(pop(880), 13.6, 0.18)
for k, at in enumerate((22.2, 22.5, 22.8)):
    S(pop(780 + k * 120), at, 0.2, -0.4)
S(bubble(True), 23.4, 0.35, 0.3); S(bubble(False), 25.6, 0.32, 0.3); S(ding(84), 27.4, 0.4)
for at in (34.5, 35.1, 35.7):
    S(riser(1.4, 300, 1200), at, 0.12)
for k, at in enumerate((35.0, 35.6, 36.2)):
    S(pop(900 + k * 90), at, 0.2, -0.5 + k * 0.5)
S(sonar(), 39.4, 0.35)
for k, at in enumerate((41.0, 41.6, 42.2)):
    S(pop(820 + k * 100), at, 0.18, 0.5)
for k, at in enumerate((50.4, 50.9, 51.4)):
    S(pop(760 + k * 110), at, 0.2, -0.4)
S(riser(1.2, 180, 700), 51.0, 0.18); S(riser(1.2, 180, 520), 52.4, 0.18); S(ding(88), 54.2, 0.42); S(ding(95), 54.32, 0.22)
for k, at in enumerate((61.2, 62.1, 63.0, 63.9)):
    S(tick(79 + k * 2), at, 0.35, -0.3)
S(whoosh(1.4, 600, 3000, True), 71.0, 0.2, -0.5)
S(rumble(5.2), 72.0, 0.5, -0.2)
S(jet(3.8), 75.5, 0.35, 0.3)
S(pop(980), 77.4, 0.2, 0.6)
for k, at in enumerate((72.6, 75.6, 76.6)):
    S(pop(800 + k * 100), at, 0.16)
S(riser(1.8, 150, 2400), 79.3, 0.22)
S(impact(2.0), 81.0, 0.55); S(pop(820), 83.2, 0.2); S(shimmer(2.4, 76), 84.6, 0.4); S(pop(900), 85.6, 0.18)

# music bed
BEAT = 0.6
CHORD_LEN = 8 * BEAT
CHORDS = [[48, 55, 60, 64, 67], [45, 52, 57, 60, 64], [41, 48, 53, 57, 60], [43, 50, 55, 59, 62]]
music = np.zeros((N, 2))
pad = np.zeros(N)
for c in range(int(np.ceil(DUR / CHORD_LEN)) + 1):
    sec = CHORD_LEN + 1.2
    x = tt(sec)
    tone = np.zeros(len(x))
    for m in CHORDS[c % 4][1:]:
        for det in (-0.06, 0.06):
            for h in range(1, 9):
                tone += np.sin(2 * np.pi * note(m + det) * h * x + h) / h * (0.8 ** h)
    env = np.minimum(1, x / 0.9) * np.minimum(1, np.maximum(0, (sec - x) / 1.2))
    i = int(c * CHORD_LEN * SR)
    seg = (tone * env)[: max(0, N - i)]
    pad[i : i + len(seg)] += seg
pad = filt(pad, "low", 1400) * 0.035
music[:, 0] += pad
music[:, 1] += pad


def pluck(m, sec=0.55):
    x = tt(sec)
    f = note(m)
    return (np.sin(2 * np.pi * f * x) + 0.35 * np.sin(4 * np.pi * f * x)) * np.exp(-x * 7) * (1 - np.exp(-x * 400))


pattern = [0, 2, 1, 3, 2, 4, 3, 2]
k = 0
s = 0.0
while s < DUR:
    if s < 8.6 or 19.0 <= s < 88.5:
        chord = CHORDS[int(s // CHORD_LEN) % 4]
        place(music, pluck(chord[1 + pattern[k % 8] % 4] + 12), s, 0.05, 0.35 if k % 2 else -0.35)
    k += 1
    s = k * BEAT / 2


def kick():
    x = tt(0.35)
    return np.sin(2 * np.pi * (45 + 90 * np.exp(-x * 30)) * x) * np.exp(-x * 9)


def hat():
    x = tt(0.06)
    return filt(rng.standard_normal(len(x)), "high", 7000) * np.exp(-x * 80)


b = 0
while b * BEAT < DUR:
    at = b * BEAT
    if 19.0 <= at < 80.6:
        if b % 2 == 0:
            place(music, kick(), at, 0.16)
        place(music, hat(), at + BEAT / 2, 0.035, 0.25)
    b += 1
x = tt(6)
place(music, filt(sum(np.sin(2 * np.pi * note(m) * x) for m in (48, 55, 60, 64, 67, 72)) * np.exp(-x * 0.6) * np.minimum(1, x / 0.05), "low", 2500), 84.6, 0.03)
music *= np.clip((DUR - np.arange(N) / SR) / 2.5, 0, 1)[:, None]

# narration
voice = np.zeros((N, 2))
for v in json.loads((HERE / "audio" / "voiceover.json").read_text()):
    data, sr = sf.read(HERE / "audio" / v["file"])
    if data.ndim > 1:
        data = data.mean(axis=1)
    data = filt(resample_poly(data, SR, sr), "high", 80)
    data = data / (np.max(np.abs(data)) + 1e-9) * 0.8
    ir = rng.standard_normal(int(0.35 * SR)) * np.exp(-np.arange(int(0.35 * SR)) / SR * 14) * 0.02
    place(voice, data + fftconvolve(data, ir)[: len(data)], v["start"])

env = uniform_filter1d(uniform_filter1d(np.abs(voice).max(axis=1), int(0.25 * SR)), int(0.25 * SR))
duck = 1 - 0.55 * np.clip(env / 0.08, 0, 1)
mix = voice + 0.8 * music * duck[:, None] + sfx * (0.6 + 0.4 * duck)[:, None]
mix /= np.max(np.abs(mix)) / 0.89
sf.write(HERE / "audio" / "mix.wav", mix.astype(np.float32), SR, subtype="FLOAT")
print("mix.wav", mix.shape)
