"""Generates the narration (one WAV per scene) with Kokoro TTS (Apache-2.0, runs offline).
Model files are read from ~/.cache/kokoro (kokoro-v1.0.onnx, voices-v1.0.bin from the kokoro-onnx GitHub releases).
"AARRKKAA" is written as "Arka" so the voice pronounces the brand correctly."""
import json, os, pathlib
import soundfile as sf
from kokoro_onnx import Kokoro

HERE = pathlib.Path(__file__).parent
CACHE = pathlib.Path.home() / ".cache" / "kokoro"
VOICE, SPEED = "af_heart", 1.0

# (start second, max seconds available, text) — classic version timings
LINES = [
    (0.9,  7.6, "This is Arka International. Industrial trading, done right."),
    (9.9,  8.6, "When one part fails, the whole line stops. And every hour of downtime costs money. That's where we come in."),
    (19.8, 10.9, "Step one. Tell us what you need. Send a part number, a drawing, or just a photo, on WhatsApp, phone or email. You'll get a quote within one working day."),
    (31.9, 14.6, "Step two. We find the best source. We buy genuine parts from manufacturers and trusted sellers, in India and abroad. Like S K F from Sweden, F A G and I N A from Germany, and N T N from Japan."),
    (47.8, 10.8, "Step three. Trading is what we do. We compare sellers and buy in volume, so you pay less than the market price."),
    (59.9, 8.8, "Step four. Every part is matched to your spec, checked for quality, and packed safely at our Hosur office."),
    (69.8, 10.8, "Step five. We deliver by road across India, by air for urgent orders, and by sea for exports. Right to your plant, on time."),
    (81.9, 7.6, "Genuine parts. Lower cost. Delivered on time. Arka International. Send us your part, and we'll match it."),
]

k = Kokoro(str(CACHE / "kokoro-v1.0.onnx"), str(CACHE / "voices-v1.0.bin"))
out = []
for i, (start, room, text) in enumerate(LINES):
    speed = SPEED
    while True:
        samples, sr = k.create(text, voice=VOICE, speed=speed, lang="en-us")
        dur = len(samples) / sr
        if dur <= room or speed >= 1.25:
            break
        speed = round(speed + 0.04, 2)  # speak a little faster rather than overrun the scene
    path = HERE / "audio" / f"vo{i}.wav"
    sf.write(path, samples, sr)
    out.append({"file": path.name, "start": start, "dur": round(dur, 2), "room": room, "speed": speed})
    print(f"vo{i}: {dur:5.2f}s / {room}s  speed {speed}")
(HERE / "audio" / "voiceover.json").write_text(json.dumps(out, indent=1))
