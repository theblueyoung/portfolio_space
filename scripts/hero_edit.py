"""Usage: python3 scripts/hero_edit.py assets/hero-source/night-original.jpg assets/hero-source/day-original.jpg public/images/hero-base.jpg public/images/hero-reveal-day.jpg /tmp/preview.png
Needs: pip install opencv-python-headless numpy
"""
"""Edit hero images: remove moon (both), remove bubbles + darken base except flower glow, crop so astronaut is centred."""
import sys, cv2, numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

SRC_NIGHT, SRC_DAY, OUT_BASE, OUT_REVEAL, PREVIEW = sys.argv[1:6]
DIM = 0.20          # how much of the base image remains outside the glow
CROP_W = 1740       # astronaut ≈ x 870 → centred after cropping to 0..1740

def remove_moon(img):
    h, w = img.shape[:2]
    x0, y0, x1, y1 = 690, 45, 815, 170
    region = img[y0:y1, x0:x1].astype(np.float32)
    lum = region.mean(axis=2)
    m = (lum > np.percentile(lum, 70)).astype(np.uint8) * 255
    # keep only the large connected blob (the moon), not stars
    n, lab, stats, _ = cv2.connectedComponentsWithStats(m)
    big = np.argmax(stats[1:, cv2.CC_STAT_AREA]) + 1
    m = (lab == big).astype(np.uint8) * 255
    m = cv2.dilate(m, np.ones((15, 15), np.uint8))
    mask = np.zeros((h, w), np.float32)
    mask[y0:y1, x0:x1] = m / 255.0
    mask = cv2.GaussianBlur(mask, (0, 0), 6)
    mask = np.clip(mask * 1.6, 0, 1)[..., None]
    # fill with real sky texture from just right of the moon
    dx = 150
    donor = np.roll(img, -dx, axis=1).astype(np.float32)
    out = img.astype(np.float32) * (1 - mask) + donor * mask
    return out.astype(np.uint8)

VISOR_FONT = "/usr/share/fonts/truetype/freefont/FreeSansBold.ttf"

def replace_visor_text(img, text="ALIVE"):
    """Erase the yellow 'LIVE' on the day helmet visor and paint `text` in the same glowing yellow."""
    x0, y0, x1, y1 = 860, 440, 950, 490
    roi = img[y0:y1, x0:x1]
    hsv = cv2.cvtColor(roi, cv2.COLOR_BGR2HSV)
    yellow = cv2.inRange(hsv, (18, 90, 140), (40, 255, 255))
    yellow = cv2.dilate(yellow, np.ones((5, 5), np.uint8), iterations=2)
    mask = np.zeros(img.shape[:2], np.uint8)
    mask[y0:y1, x0:x1] = yellow
    img = cv2.inpaint(img, mask, 7, cv2.INPAINT_TELEA)

    # Draw large, then shrink, so the letters are as soft as the rest of the photo.
    k = 6
    cx, cy, cap_h = 897, 465, 19
    font = ImageFont.truetype(VISOR_FONT, int(cap_h * k * 1.38))
    l, t, r, b = font.getbbox(text)
    tw, th = r - l, b - t
    layer = Image.new("L", (tw + 40 * k, th + 40 * k), 0)
    ImageDraw.Draw(layer).text((20 * k - l, 20 * k - t), text, font=font, fill=255)
    small = layer.resize((layer.width // k, layer.height // k), Image.LANCZOS)
    glyph = np.asarray(small.filter(ImageFilter.GaussianBlur(0.5)), np.float32) / 255
    glow = np.asarray(small.filter(ImageFilter.GaussianBlur(4)), np.float32) / 255

    gh, gw = glyph.shape
    px, py = cx - gw // 2, cy - gh // 2
    patch = img[py:py + gh, px:px + gw].astype(np.float32)
    yellow_bgr = np.array([30, 225, 245], np.float32)
    patch = patch + (glow[..., None] * 0.45) * (yellow_bgr - patch) * 0.6
    patch = patch * (1 - glyph[..., None]) + yellow_bgr * glyph[..., None]
    img[py:py + gh, px:px + gw] = patch.clip(0, 255).astype(np.uint8)
    return img

def remove_bubbles(img):
    mask = np.zeros(img.shape[:2], np.uint8)
    for (x, y, r) in [(222, 440, 34), (1817, 365, 38), (1618, 636, 30)]:
        cv2.circle(mask, (x, y), r, 255, -1)
    return cv2.inpaint(img, mask, 9, cv2.INPAINT_TELEA)

def darken_except_glow(img):
    h, w = img.shape[:2]
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV).astype(np.float32) / 255.0
    s, v = hsv[..., 1], hsv[..., 2]
    glow = np.clip((v - 0.5) / 0.3, 0, 1) * np.clip((s - 0.2) / 0.3, 0, 1)
    # White petals are bright but unsaturated: keep them too, except on the astronaut and the watering can.
    white = np.clip((v - 0.68) / 0.2, 0, 1)
    suit = np.zeros((h, w), np.float32)
    cv2.rectangle(suit, (712, 380), (1085, 935), 1.0, -1)
    suit = cv2.GaussianBlur(suit, (0, 0), 18)
    glow = np.maximum(glow, white * (1 - suit))
    ys = np.arange(h, dtype=np.float32)[:, None]
    glow *= np.clip((ys - 600) / 90, 0, 1)            # only the flower field, not the clouds
    glow = cv2.dilate(glow, np.ones((5, 5), np.uint8))
    glow = cv2.GaussianBlur(glow, (0, 0), 6)
    glow = np.clip(glow * 1.5, 0, 1) * 0.78
    keep = DIM + (1 - DIM) * glow
    return (img.astype(np.float32) * keep[..., None]).clip(0, 255).astype(np.uint8), glow

night = cv2.imread(SRC_NIGHT); day = cv2.imread(SRC_DAY)
assert night.shape == day.shape
night = remove_moon(night); day = replace_visor_text(remove_moon(day))
base, glow = darken_except_glow(remove_bubbles(night))
base, day = base[:, :CROP_W], day[:, :CROP_W]
cv2.imwrite(OUT_BASE, base, [cv2.IMWRITE_JPEG_QUALITY, 90])
cv2.imwrite(OUT_REVEAL, day, [cv2.IMWRITE_JPEG_QUALITY, 90])
cv2.imwrite(PREVIEW, np.vstack([cv2.resize(base, (870, 562)), cv2.resize(day, (870, 562))]))
print(base.shape, day.shape)
