from pathlib import Path
from PIL import Image, ImageFilter, ImageDraw
import pypdfium2 as pdfium
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor
from pypdf import PdfReader

ROOT = Path(r"D:/woshi/Documents/front-end-practice/ellen-portfolio")
SRC = Path(r"D:/woshi/Documents/job hunting/portfolio/image")
TMP = ROOT / "tmp" / "pdfs"
OUT = ROOT / "output" / "pdf" / "Ellen_Wang_Selected_Work_Samples.pdf"
TMP.mkdir(parents=True, exist_ok=True)
OUT.parent.mkdir(parents=True, exist_ok=True)

W, H = A4
NAVY = HexColor("#082445")
BLUE = HexColor("#1769E0")
INK = HexColor("#172033")
MUTED = HexColor("#5F6B7A")
PALE = HexColor("#EEF4FA")
LINE = HexColor("#D8E1EA")
WHITE = HexColor("#FFFFFF")
GREEN = HexColor("#178A69")
ORANGE = HexColor("#D96D19")

pdfmetrics.registerFont(TTFont("Arial", r"C:/Windows/Fonts/arial.ttf"))
pdfmetrics.registerFont(TTFont("Arial-Bold", r"C:/Windows/Fonts/arialbd.ttf"))


def load(name):
    return Image.open(SRC / name).convert("RGB")


def save_crop(name, box, output, max_width=1800):
    im = load(name).crop(box)
    if im.width > max_width:
        scale = max_width / im.width
        im = im.resize((max_width, round(im.height * scale)), Image.Resampling.LANCZOS)
    path = TMP / output
    im.save(path, quality=90, optimize=True)
    return path


def save_fit(name, output, max_width=1800):
    im = load(name)
    if im.width > max_width:
        scale = max_width / im.width
        im = im.resize((max_width, round(im.height * scale)), Image.Resampling.LANCZOS)
    path = TMP / output
    im.save(path, quality=90, optimize=True)
    return path


def render_blueprint():
    doc = pdfium.PdfDocument(str(SRC / "PLM service blueprint_compressed.pdf"))
    page = doc[0]
    im = page.render(scale=2200 / page.get_width()).to_pil().convert("RGB")
    overview = TMP / "blueprint_overview.jpg"
    im.save(overview, quality=86, optimize=True)
    # Central service lanes only; excludes the dense research appendix and participant notes.
    detail = im.crop((410, 150, 2040, 1250))
    detail_path = TMP / "blueprint_detail.jpg"
    detail.save(detail_path, quality=88, optimize=True)
    return overview, detail_path


def fit_image(c, path, x, y, w, h, pad=0, bg=WHITE):
    c.setFillColor(bg)
    c.roundRect(x, y, w, h, 7, fill=1, stroke=0)
    with Image.open(path) as im:
        iw, ih = im.size
    scale = min((w - 2 * pad) / iw, (h - 2 * pad) / ih)
    dw, dh = iw * scale, ih * scale
    c.drawImage(ImageReader(str(path)), x + (w - dw) / 2, y + (h - dh) / 2, dw, dh, preserveAspectRatio=True, mask="auto")


def crop_fill(c, path, x, y, w, h):
    with Image.open(path) as im:
        iw, ih = im.size
    scale = max(w / iw, h / ih)
    dw, dh = iw * scale, ih * scale
    c.saveState()
    clip = c.beginPath(); clip.roundRect(x, y, w, h, 7)
    c.clipPath(clip, stroke=0, fill=0)
    c.drawImage(ImageReader(str(path)), x + (w - dw) / 2, y + (h - dh) / 2, dw, dh, preserveAspectRatio=True, mask="auto")
    c.restoreState()


def wrap(c, text, x, y, width, size=9.5, leading=13, font="Arial", color=INK, max_lines=None):
    c.setFont(font, size); c.setFillColor(color)
    words = text.split(); lines = []; current = ""
    for word in words:
        trial = (current + " " + word).strip()
        if c.stringWidth(trial, font, size) <= width:
            current = trial
        else:
            if current: lines.append(current)
            current = word
    if current: lines.append(current)
    if max_lines: lines = lines[:max_lines]
    for line in lines:
        c.drawString(x, y, line); y -= leading
    return y


def bullet(c, text, x, y, width, color=INK):
    c.setFillColor(BLUE); c.circle(x + 3, y + 3, 2.2, fill=1, stroke=0)
    return wrap(c, text, x + 13, y + 7, width - 13, 9.1, 12.3, color=color) - 5


def label(c, text, x, y, color=BLUE):
    c.setFillColor(color); c.setFont("Arial-Bold", 7.5); c.drawString(x, y, text.upper())


def header(c, section, title, subtitle=None):
    label(c, section, 42, H - 45)
    c.setFillColor(INK); c.setFont("Arial-Bold", 23); c.drawString(42, H - 77, title)
    if subtitle:
        wrap(c, subtitle, 42, H - 98, W - 84, 9.5, 13, color=MUTED)


def footer(c, page):
    c.setStrokeColor(LINE); c.line(42, 29, W - 42, 29)
    c.setFillColor(MUTED); c.setFont("Arial", 6.7)
    c.drawString(42, 18, "CONFIDENTIAL - Shared for recruitment review only. Please do not redistribute.")
    c.drawRightString(W - 42, 18, f"Ellen Wang  /  {page:02d}")


def card(c, x, y, w, h, title, body, accent=BLUE):
    c.setFillColor(PALE); c.roundRect(x, y, w, h, 8, fill=1, stroke=0)
    c.setFillColor(accent); c.roundRect(x, y, 5, h, 3, fill=1, stroke=0)
    c.setFillColor(INK); c.setFont("Arial-Bold", 10); c.drawString(x + 16, y + h - 22, title)
    wrap(c, body, x + 16, y + h - 39, w - 30, 8.3, 11.4, color=MUTED)


boiler = save_crop("Boilderplates.png", (100, 1350, 10200, 4300), "boilerplates.jpg")
colour = save_crop("Colour.png", (80, 0, 1840, 1920), "colour.jpg")
type_img = save_crop("Typography.png", (80, 0, 1840, 3300), "type.jpg")
component = save_crop("palms.png", (160, 0, 1270, 2690), "component.jpg")
icons = save_crop("palms-Icons.png", (100, 0, 1810, 1750), "icons.jpg")
base = save_crop("Base layout.png", (80, 0, 5750, 1650), "base.jpg")
kanban = save_fit("kaizen-kanban.png", "kanban.jpg")
blueprint_overview, blueprint_detail = render_blueprint()

c = canvas.Canvas(str(OUT), pagesize=A4, pageCompression=1)
c.setTitle("Ellen Wang - Selected Work Samples")
c.setAuthor("Ellen Wang")

# 1 Cover
c.setFillColor(NAVY); c.rect(0, 0, W, H, fill=1, stroke=0)
c.setFillColor(BLUE); c.circle(W - 75, H - 80, 105, fill=1, stroke=0)
c.setFillColor(WHITE); c.setFont("Arial-Bold", 36); c.drawString(48, H - 190, "Selected work")
c.drawString(48, H - 232, "samples")
c.setFont("Arial", 15); c.drawString(50, H - 274, "Product design  /  Service design  /  Systems thinking")
c.setFillColor(HexColor("#BCD3EA")); c.setFont("Arial", 11)
wrap(c, "A concise selection of internal work shared for recruitment review.", 50, H - 315, 360, 11, 16, color=HexColor("#BCD3EA"))
c.setFillColor(WHITE); c.setFont("Arial-Bold", 14); c.drawString(50, 86, "Ellen Wang")
c.setFont("Arial", 9); c.setFillColor(HexColor("#BCD3EA")); c.drawString(50, 69, "Gold Coast, Australia  |  ellenwang918@gmail.com")
c.drawString(50, 54, "linkedin.com/in/zi-wang-456923171")
c.showPage()

# 2 Overview
header(c, "Portfolio overview", "How I work", "I make complex products easier to understand, use and deliver by connecting research, interface decisions and team practices.")
card(c, 42, 560, 157, 104, "Design systems", "Audit inconsistency, document decisions and create reusable patterns that teams can apply with confidence.")
card(c, 219, 560, 157, 104, "Product workflows", "Translate observed behaviour into feasible interaction patterns, then validate them with users.", GREEN)
card(c, 396, 560, 157, 104, "Service design", "Map people, processes and systems so teams can reason about a shared end-to-end service.", ORANGE)
c.setFillColor(INK); c.setFont("Arial-Bold", 15); c.drawString(42, 510, "Selected evidence")
items = [
    ("01", "PALMS design system", "Governance, reusable templates and documented foundations."),
    ("02", "Kaizen action workflow", "A status-based board derived from user behaviour and tested with four participants."),
    ("03", "PLM service blueprint", "Research synthesis across 16 interviews and eight business groups."),
]
y = 462
for num, title, body in items:
    c.setFillColor(PALE); c.circle(63, y + 4, 21, fill=1, stroke=0)
    c.setFillColor(BLUE); c.setFont("Arial-Bold", 9); c.drawCentredString(63, y + 1, num)
    c.setFillColor(INK); c.setFont("Arial-Bold", 11); c.drawString(98, y + 12, title)
    wrap(c, body, 98, y - 4, 390, 8.8, 12, color=MUTED)
    y -= 83
c.setFillColor(PALE); c.roundRect(42, 93, W - 84, 105, 9, fill=1, stroke=0)
label(c, "Scope note", 58, 176)
wrap(c, "The following images are selected excerpts from internal work. Names, detailed research notes, internal links and operational data have been omitted. Outcomes distinguish my contribution from wider project results.", 58, 156, W - 116, 9.2, 13, color=INK)
footer(c, 2); c.showPage()

# 3 system foundations
header(c, "01 / PALMS design system", "From inconsistency to shared foundations", "I helped turn scattered product decisions into a usable system for designers, analysts, engineers and testers.")
fit_image(c, colour, 42, 382, 245, 302, 8, PALE)
fit_image(c, type_img, 307, 382, 246, 302, 8, PALE)
label(c, "My contribution", 42, 348)
y = bullet(c, "Audited the live product, existing library and working files to identify component and implementation mismatches.", 42, 324, 505)
y = bullet(c, "Structured colour, typography, icon and component guidance around usage, behaviour, accessibility and responsive application.", 42, y - 5, 505)
y = bullet(c, "Established contribution rules and added formal design review to the front-end delivery process.", 42, y - 5, 505)
card(c, 42, 78, 511, 79, "Outcome", "The updated component library reached 100% adoption within the design team. No further design-to-build misalignment was reported during the observed period after formal design review was introduced.", GREEN)
footer(c, 3); c.showPage()

# 4 documented component + templates
header(c, "01 / PALMS design system", "Guidance that supports real delivery", "The system paired reusable page patterns with practical instructions for choosing, applying and reviewing components.")
fit_image(c, component, 42, 348, 243, 352, 5, PALE)
fit_image(c, boiler, 305, 450, 248, 250, 5, PALE)
fit_image(c, icons, 305, 348, 248, 87, 4, PALE)
c.setFillColor(INK); c.setFont("Arial-Bold", 12); c.drawString(42, 310, "What this evidence shows")
y = bullet(c, "Component documentation covers when to use the pattern, states, anatomy, formatting and accessibility.", 42, 286, 510)
y = bullet(c, "Boilerplate pages give teams approved starting points for common product structures.", 42, y - 4, 510)
y = bullet(c, "The icon guidance standardises library use; it does not claim authorship of the underlying MUI icon set.", 42, y - 4, 510)
card(c, 42, 76, 511, 78, "Design principle", "A design system becomes valuable when decisions are discoverable and the delivery process checks that the built experience still reflects them.")
footer(c, 4); c.showPage()

# 5 Kanban
header(c, "02 / Kaizen action workflow", "Turning an observed behaviour into a feasible MVP", "Users were already arranging spreadsheet columns like a Kanban board when presenting and tracking actions.")
fit_image(c, kanban, 42, 350, 511, 326, 5, PALE)
cards = [
    (42, "Evidence", "Interview observation revealed an existing status-based mental model."),
    (215, "Decision", "Organise actions by status and due date; defer drag and drop to control delivery effort."),
    (388, "Validation", "Four usability sessions; all participants understood the board without prompting."),
]
for x, t, b in cards: card(c, x, 192, 165, 118, t, b, GREEN if t == "Validation" else BLUE)
c.setFillColor(INK); c.setFont("Arial-Bold", 11); c.drawString(42, 158, "My role")
wrap(c, "I contributed to research planning and synthesis, identified the recurring behaviour, checked technical feasibility with engineering leads and proposed the board direction. The approved pattern was released without drag and drop in its initial version.", 42, 140, 511, 8.9, 12.5, color=MUTED)
footer(c, 5); c.showPage()

# 6 service overview
header(c, "03 / PLM service design", "Making a fragmented service visible", "Checklist work crossed paper forms, digital PDFs, field activity and enterprise systems. A shared view was needed before the team could prioritise a direction.")
fit_image(c, blueprint_overview, 42, 372, 511, 296, 5, PALE)
c.setFillColor(INK); c.setFont("Arial-Bold", 12); c.drawString(42, 334, "Research and synthesis")
y = bullet(c, "16 interviews across eight business groups, covering common needs and specialised workflows.", 42, 310, 510)
y = bullet(c, "A layered blueprint linked the generic process, customer journeys, roles, product touchpoints, supporting systems and handoffs.", 42, y - 4, 510)
y = bullet(c, "Pain points were placed at the exact stage where they occurred so visible user problems could be connected to operational or technical causes.", 42, y - 4, 510)
card(c, 42, 76, 511, 83, "My contribution", "I participated in planning and every interview, organised the findings, independently created the service blueprint and validated system relationships with the Solution Architect.", ORANGE)
footer(c, 6); c.showPage()

# 7 blueprint detail
header(c, "03 / PLM service design", "One model for people, product and systems", "The blueprint preserved differences between customer groups while making shared stages and dependencies easy to compare.")
fit_image(c, blueprint_detail, 42, 317, 511, 371, 5, PALE)
card(c, 42, 183, 245, 94, "Why this structure", "Separate journey maps would preserve detail but make comparison difficult. A single generic process would erase role-specific requirements.")
card(c, 308, 183, 245, 94, "How it helped", "Design, business and technology could identify common and specialised needs, trace dependencies and agree on an initial direction.", ORANGE)
c.setFillColor(INK); c.setFont("Arial-Bold", 11); c.drawString(42, 145, "Responsible outcome statement")
wrap(c, "The work later progressed into design and development. I did not participate in the later stakeholder review, so I describe that progression as a project outcome rather than a result directly delivered by me.", 42, 127, 511, 8.7, 12.2, color=MUTED)
footer(c, 7); c.showPage()

# 8 closing
c.setFillColor(NAVY); c.rect(0, 0, W, H, fill=1, stroke=0)
label(c, "Closing note", 50, H - 62, HexColor("#6BA7FF"))
c.setFillColor(WHITE); c.setFont("Arial-Bold", 30); c.drawString(50, H - 105, "Thank you for reviewing")
wrap(c, "I would be happy to talk through the decisions, constraints and collaboration behind these examples in an interview.", 50, H - 140, 450, 12, 18, color=HexColor("#D8E6F5"))
c.setFillColor(HexColor("#12375F")); c.roundRect(50, 365, W - 100, 190, 12, fill=1, stroke=0)
label(c, "What I bring", 72, 520, HexColor("#6BA7FF"))
closing = [
    "Structured thinking across products, services and delivery systems",
    "Clear documentation that helps cross-functional teams act",
    "Evidence-led decisions balanced with engineering feasibility",
    "Honest ownership of contribution, outcomes and limitations",
]
y = 482
for item in closing:
    c.setFillColor(HexColor("#6BA7FF")); c.circle(76, y + 3, 2.5, fill=1, stroke=0)
    wrap(c, item, 90, y + 7, 410, 10.2, 14, color=WHITE)
    y -= 35
c.setFillColor(WHITE); c.setFont("Arial-Bold", 13); c.drawString(50, 98, "Ellen Wang")
c.setFillColor(HexColor("#BCD3EA")); c.setFont("Arial", 9)
c.drawString(50, 80, "ellenwang918@gmail.com")
c.drawString(50, 64, "linkedin.com/in/zi-wang-456923171")
c.drawString(50, 48, "Gold Coast, Australia")
c.showPage(); c.save()

reader = PdfReader(str(OUT))
assert len(reader.pages) == 8, len(reader.pages)
print(f"CREATED {OUT}")
print(f"PAGES {len(reader.pages)}")
print(f"SIZE_MB {OUT.stat().st_size / 1048576:.2f}")
