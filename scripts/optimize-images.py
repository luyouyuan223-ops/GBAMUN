"""Regenerate checked-in WebP variants with Python 3 and Pillow (pip install Pillow)."""
from pathlib import Path
from PIL import Image, ImageOps
import hashlib, json
root = Path(__file__).resolve().parent.parent
media = root / 'public' / 'media'
output = media / 'optimized'
output.mkdir(exist_ok=True)
manifest = {}
before = after = 0
for source in sorted(media.iterdir()):
    if source.suffix.lower() not in ('.jpg', '.jpeg', '.png'):
        continue
    with Image.open(source) as original:
        image = ImageOps.exif_transpose(original).convert('RGB')
        width, height = image.size
        limit = 1800 if source.name == 'hero.jpg' else 1440
        widths = sorted(set(min(width, n) for n in (480, 960, limit)))
        variants = []
        for target in widths:
            resized = image.resize((target, round(height * target / width)), Image.Resampling.LANCZOS) if target != width else image
            import io
            buffer = io.BytesIO()
            resized.save(buffer, 'WEBP', quality=84, method=6)
            content = buffer.getvalue()
            digest = hashlib.sha256(content).hexdigest()[:10]
            filename = f'{source.stem}-{target}.{digest}.webp'
            (output / filename).write_bytes(content)
            variants.append({'src': '/media/optimized/' + filename, 'width': target})
        manifest[source.name] = {'width': width, 'height': height, 'variants': variants}
        before += source.stat().st_size
        after += len(content)
(root / 'src' / 'media' / 'images.json').write_text(json.dumps(manifest, indent=2) + '\n')
print(f'Full-size image variants: {before:,} -> {after:,} bytes ({(1-after/before)*100:.1f}% smaller)')
