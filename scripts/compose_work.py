"""Usage: python3 scripts/compose_work.py <folder of screenshots> public/images/work
Screenshots expected: jeju-{index,about-jeju,things-to-do,ollie-trail,gallery,m-index,m-ollie}.png (1440x900 / 390x844 @2x)
and app-{home,tl,fund,my}.png (390x844 @2x) of github.com/theblueyoung/usyd_jeju and 24dday-purple.
"""
"""Compose project screenshots onto the portfolio's dark lavender backdrop."""
import sys
from PIL import Image, ImageDraw, ImageFilter

SRC, OUT = sys.argv[1], sys.argv[2]

def backdrop(w, h):
    bg = Image.new("RGB", (w, h), (12, 10, 42))
    glow = Image.new("RGB", (w, h), (0, 0, 0))
    d = ImageDraw.Draw(glow)
    d.ellipse((-w * 0.2, -h * 0.3, w * 0.7, h * 0.7), fill=(80, 60, 170))
    d.ellipse((w * 0.5, h * 0.4, w * 1.3, h * 1.3), fill=(120, 60, 130))
    glow = glow.filter(ImageFilter.GaussianBlur(min(w, h) * 0.18))
    return Image.blend(bg, glow, 0.55)

def rounded(img, r):
    m = Image.new("L", img.size, 0)
    ImageDraw.Draw(m).rounded_rectangle((0, 0, img.width - 1, img.height - 1), r, fill=255)
    out = img.convert("RGBA"); out.putalpha(m)
    return out

def place(canvas, path, x, y, w=None, h=None, r=24, border=True):
    im = Image.open(path).convert("RGB")
    if w and not h: h = round(im.height * w / im.width)
    if h and not w: w = round(im.width * h / im.height)
    im = rounded(im.resize((w, h), Image.LANCZOS), r)
    sh = Image.new("RGBA", (w + 160, h + 160), (0, 0, 0, 0))
    ImageDraw.Draw(sh).rounded_rectangle((80, 100, 80 + w, 100 + h), r, fill=(0, 0, 0, 150))
    sh = sh.filter(ImageFilter.GaussianBlur(36))
    canvas.alpha_composite(sh, (x - 80, y - 80))
    canvas.alpha_composite(im, (x, y))
    if border:
        ImageDraw.Draw(canvas).rounded_rectangle((x, y, x + w - 1, y + h - 1), r, outline=(200, 182, 255, 70), width=2)

def save(canvas, name):
    canvas.convert("RGB").save(f"{OUT}/{name}", "WEBP", quality=86, method=6)

S = SRC
# Jeju — card (4:3) and cover (16:9): desktop page with a phone in front
c = backdrop(2000, 1500).convert("RGBA")
place(c, f"{S}/jeju-index.png", 130, 230, w=1480, r=22)
place(c, f"{S}/jeju-m-ollie.png", 1420, 420, h=980, r=44)
save(c, "jeju-card.webp")
c = backdrop(2400, 1350).convert("RGBA")
place(c, f"{S}/jeju-index.png", 200, 150, w=1640, r=22)
place(c, f"{S}/jeju-m-index.png", 1720, 260, h=1000, r=44)
save(c, "jeju-cover.webp")

# 24dday — card (4:5): three phones; cover (16:9): four phones in a row
c = backdrop(1600, 2000).convert("RGBA")
place(c, f"{S}/app-tl.png", 90, 560, h=1180, r=52)
place(c, f"{S}/app-fund.png", 960, 560, h=1180, r=52)
place(c, f"{S}/app-home.png", 470, 300, h=1400, r=60)
save(c, "24dday-card.webp")
c = backdrop(2400, 1350).convert("RGBA")
for i, (n, y) in enumerate([("home", 110), ("tl", 190), ("fund", 110), ("my", 190)]):
    place(c, f"{S}/app-{n}.png", 120 + i * 560, y, h=1060, r=50)
save(c, "24dday-cover.webp")

# Gallery shots for the detail pages
for n in ["index", "about-jeju", "things-to-do", "ollie-trail", "gallery"]:
    Image.open(f"{S}/jeju-{n}.png").convert("RGB").resize((1600, 1000), Image.LANCZOS).save(f"{OUT}/jeju-{n}.webp", "WEBP", quality=84, method=6)
for n in ["home", "tl", "fund", "my"]:
    Image.open(f"{S}/app-{n}.png").convert("RGB").save(f"{OUT}/24dday-{n}.webp", "WEBP", quality=86, method=6)
print("done")
