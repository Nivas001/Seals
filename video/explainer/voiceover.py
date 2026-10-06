"""Generates the narration (one WAV per scene) with Kokoro TTS (Apache-2.0, runs offline).
Model files are read from ~/.cache/kokoro (kokoro-v1.0.onnx, voices-v1.0.bin from the kokoro-onnx GitHub releases).
"AARRKKAA" is written as "Arka" so the voice pronounces the brand correctly."""
import json, os, pathlib
import soundfile as sf
from kokoro_onnx import Kokoro

HERE = pathlib.Path(__file__).parent
CACHE = pathlib.Path.home() / ".cache" / "kokoro"
VOICE, SPEED = "af_heart", 1.06

# (start second, max seconds available, text) — timed to the scenes in explainer.html
LINES = [
    (1.3,  6.2, "Meet Arka International. Industrial trading, done right."),
    (8.9,  6.0, "One worn seal. One seized bearing. And the whole line stops."),
    (15.2, 2.6, "That's where we come in."),
    (18.9, 10.4, "Step one. Tell us what you need. Send a part number, a drawing, or just a photo on WhatsApp. You'll have a quote within one working day."),
    (30.9, 13.9, "Step two. We find the best source. Genuine parts from manufacturers and trusted sellers, in India and abroad. S K F from Sweden. F A G and I N A from Germany. N T N from Japan."),
    (45.6, 10.8, "Step three. Trading is what we do. We compare sellers, buy in volume, and pass the saving on to you. So you pay less than the market."),
    (57.7, 8.8, "Step four. Every part is matched to your spec, quality checked, and packed with care, right here in Hosur."),
    (67.7, 8.6, "Step five. It's on the move. By road across India, by air when it's urgent, and by sea for export."),
    (76.7, 2.8, "Delivered. On time."),
    (81.0, 8.4, "Arka International. Genuine parts, lower cost, on time. Send us your part, and we'll match it."),
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
