import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { Presentation, PresentationFile } from "@oai/artifact-tool";

const workspaceDir = "D:/woshi/Documents/front-end-practice/ellen-portfolio";
const SKILL_DIR = "C:/Users/woshi/.codex/plugins/cache/openai-primary-runtime/presentations/26.905.11957/skills/presentations";
const TMP_DIR = path.join(workspaceDir, ".pptx-build");
const FINAL_PPTX = path.join(workspaceDir, "output", "pptx", "Ellen_Wang_Selected_Work_Samples_Editable.pptx");
const RUNTIME_PYTHON = "C:/Users/woshi/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe";

const { finalizePresentation } = await import(pathToFileURL(
  path.join(SKILL_DIR, "container_tools/artifact_tool_utils.mjs"),
).href);

const PW = 794;
const PH = 1123;
const C = {
  navy: "#082445", blue: "#1769E0", ink: "#172033", muted: "#5F6B7A",
  pale: "#EEF4FA", line: "#D8E1EA", white: "#FFFFFF", green: "#178A69",
  orange: "#D96D19", lightBlue: "#BCD3EA",
};
const FONT = "Arial";
const assets = path.join(workspaceDir, "tmp", "pdfs");

await fs.mkdir(TMP_DIR, { recursive: true });
await fs.mkdir(path.dirname(FINAL_PPTX), { recursive: true });

const imageBytes = {};
for (const file of ["colour.jpg", "type.jpg", "component.jpg", "boilerplates.jpg", "icons.jpg", "kanban.jpg", "blueprint_overview.jpg", "blueprint_detail.jpg"]) {
  imageBytes[file] = await fs.readFile(path.join(assets, file));
}

const presentation = Presentation.create({ slideSize: { width: PW, height: PH } });

function rect(slide, left, top, width, height, fill, radius = 0) {
  return slide.shapes.add({
    geometry: radius ? "roundRect" : "rect",
    position: { left, top, width, height },
    fill,
    line: { fill: "none", width: 0 },
    ...(radius ? { borderRadius: radius } : {}),
  });
}

function text(slide, value, left, top, width, height, options = {}) {
  const shape = slide.shapes.add({
    geometry: "textbox",
    position: { left, top, width, height },
    fill: "none",
    line: { fill: "none", width: 0 },
  });
  shape.text = value;
  shape.text.style = {
    typeface: FONT,
    fontSize: options.size ?? 17,
    bold: options.bold ?? false,
    color: options.color ?? C.ink,
    autoFit: "shrinkText",
    verticalAlignment: options.valign ?? "top",
    alignment: options.align ?? "left",
  };
  return shape;
}

function label(slide, value, left, top, width = 300, color = C.blue) {
  return text(slide, value.toUpperCase(), left, top, width, 24, { size: 11, bold: true, color });
}

function image(slide, file, left, top, width, height, fit = "contain", alt = "Work sample") {
  return slide.images.add({
    blob: imageBytes[file],
    contentType: "image/jpeg",
    alt,
    fit,
    position: { left, top, width, height },
    geometry: "roundRect",
    borderRadius: 10,
  });
}

function footer(slide, page) {
  rect(slide, 56, 1075, 682, 1, C.line);
  text(slide, "CONFIDENTIAL - Shared for recruitment review only. Please do not redistribute.", 56, 1083, 560, 19, { size: 8, color: C.muted });
  text(slide, `Ellen Wang  /  ${String(page).padStart(2, "0")}`, 646, 1083, 92, 19, { size: 8, color: C.muted, align: "right" });
}

function header(slide, section, titleValue, subtitle) {
  label(slide, section, 56, 48, 420);
  text(slide, titleValue, 56, 78, 682, 58, { size: 31, bold: true });
  text(slide, subtitle, 56, 140, 682, 54, { size: 14, color: C.muted });
}

function bullet(slide, value, left, top, width, height = 46, color = C.ink) {
  text(slide, "•", left, top - 1, 18, 24, { size: 18, bold: true, color: C.blue });
  text(slide, value, left + 22, top, width - 22, height, { size: 13, color });
}

function card(slide, left, top, width, height, titleValue, body, accent = C.blue) {
  rect(slide, left, top, width, height, C.pale, 10);
  rect(slide, left, top, 5, height, accent, 2);
  text(slide, titleValue, left + 18, top + 16, width - 34, 24, { size: 14, bold: true });
  text(slide, body, left + 18, top + 46, width - 34, height - 58, { size: 11, color: C.muted });
}

// 1 Cover
{
  const s = presentation.slides.add();
  s.background.fill = C.navy;
  rect(s, 590, -20, 240, 240, C.blue, 120);
  text(s, "Selected work\nsamples", 64, 215, 560, 130, { size: 44, bold: true, color: C.white });
  text(s, "Product design  /  Service design  /  Systems thinking", 66, 352, 620, 42, { size: 17, color: C.lightBlue });
  text(s, "A concise selection of internal work shared for recruitment review.", 66, 408, 470, 60, { size: 15, color: C.lightBlue });
  text(s, "Ellen Wang", 66, 975, 250, 28, { size: 18, bold: true, color: C.white });
  text(s, "Gold Coast, Australia\nellenwang918@gmail.com\nlinkedin.com/in/zi-wang-456923171", 66, 1010, 360, 78, { size: 11, color: C.lightBlue });
}

// 2 Overview
{
  const s = presentation.slides.add(); s.background.fill = C.white;
  header(s, "Portfolio overview", "How I work", "I make complex products easier to understand and deliver by connecting research, interface decisions and team practices.");
  card(s, 56, 235, 211, 135, "Design systems", "Audit inconsistency, document decisions and create reusable patterns that teams can apply with confidence.");
  card(s, 291, 235, 211, 135, "Product workflows", "Translate observed behaviour into feasible interaction patterns, then validate them with users.", C.green);
  card(s, 526, 235, 212, 135, "Service design", "Map people, processes and systems so teams can reason about a shared service.", C.orange);
  text(s, "Selected evidence", 56, 425, 300, 30, { size: 20, bold: true });
  const rows = [
    ["01", "PALMS design system", "Governance, reusable templates and documented foundations."],
    ["02", "Kaizen action workflow", "A status-based board derived from user behaviour and tested with four participants."],
    ["03", "PLM service blueprint", "Research synthesis across 16 interviews and eight business groups."],
  ];
  let y = 480;
  for (const [num, titleValue, body] of rows) {
    rect(s, 56, y, 46, 46, C.pale, 23);
    text(s, num, 56, y + 11, 46, 20, { size: 11, bold: true, color: C.blue, align: "center" });
    text(s, titleValue, 130, y, 360, 25, { size: 15, bold: true });
    text(s, body, 130, y + 27, 540, 42, { size: 12, color: C.muted });
    y += 100;
  }
  card(s, 56, 825, 682, 135, "Scope note", "These images are selected excerpts from internal work. Names, detailed research notes, internal links and operational data have been omitted. Outcomes distinguish my contribution from wider project results.");
  footer(s, 2);
}

// 3 Foundations
{
  const s = presentation.slides.add(); s.background.fill = C.white;
  header(s, "01 / PALMS design system", "Shared design foundations", "I helped turn scattered product decisions into a usable system for designers, analysts, engineers and testers.");
  rect(s, 56, 220, 319, 385, C.pale, 10); image(s, "colour.jpg", 66, 230, 299, 365, "contain", "PALMS colour token documentation");
  rect(s, 419, 220, 319, 385, C.pale, 10); image(s, "type.jpg", 429, 230, 299, 365, "contain", "PALMS typography documentation");
  label(s, "My contribution", 56, 646, 260);
  bullet(s, "Audited the live product, existing library and working files to identify component and implementation mismatches.", 56, 680, 682, 48);
  bullet(s, "Structured colour, typography, icon and component guidance around usage, behaviour, accessibility and responsive application.", 56, 744, 682, 58);
  bullet(s, "Established contribution rules and added formal design review to the front-end delivery process.", 56, 818, 682, 46);
  card(s, 56, 918, 682, 105, "Outcome", "The updated component library reached 100% adoption within the design team. The observed delivery period had no further reported design-to-build misalignment after formal review began.", C.green);
  footer(s, 3);
}

// 4 Guidance
{
  const s = presentation.slides.add(); s.background.fill = C.white;
  header(s, "01 / PALMS design system", "Guidance for product delivery", "The system paired reusable page patterns with practical instructions for choosing, applying and reviewing components.");
  rect(s, 56, 220, 319, 460, C.pale, 10); image(s, "component.jpg", 66, 230, 299, 440, "contain", "Checklist component documentation");
  rect(s, 419, 220, 319, 280, C.pale, 10); image(s, "boilerplates.jpg", 429, 230, 299, 260, "contain", "Reusable PALMS page templates");
  rect(s, 419, 525, 319, 155, C.pale, 10); image(s, "icons.jpg", 429, 535, 299, 135, "contain", "PALMS icon guidance");
  text(s, "What this evidence shows", 56, 720, 400, 32, { size: 20, bold: true });
  bullet(s, "Component guidance covers usage, states, anatomy, formatting and accessibility.", 56, 765, 682, 42);
  bullet(s, "Boilerplate pages give teams approved starting points for common product structures.", 56, 817, 682, 42);
  bullet(s, "The icon guidance standardises library use without claiming authorship of the MUI icon set.", 56, 869, 682, 42);
  card(s, 56, 950, 682, 73, "Design principle", "A design system works when teams can find its decisions and review the built experience against them.");
  footer(s, 4);
}

// 5 Kaizen
{
  const s = presentation.slides.add(); s.background.fill = C.white;
  header(s, "02 / Kaizen action workflow", "A feasible Kanban MVP", "Users already arranged spreadsheet columns like a Kanban board when presenting and tracking actions.");
  rect(s, 56, 220, 682, 405, C.pale, 10); image(s, "kanban.jpg", 66, 230, 662, 385, "contain", "Kaizen action tracking board");
  card(s, 56, 664, 211, 142, "Evidence", "Interview observation revealed an existing status-based mental model.");
  card(s, 291, 664, 211, 142, "Decision", "Organise actions by status and due date. Defer drag and drop to control delivery effort.");
  card(s, 526, 664, 212, 142, "Validation", "Four usability sessions. Every participant understood the board without prompting.", C.green);
  text(s, "My role", 56, 850, 180, 28, { size: 18, bold: true });
  text(s, "I contributed to research planning and synthesis, identified the recurring behaviour, checked technical feasibility with engineering leads and proposed the board direction. The team released the approved pattern without drag and drop in its initial version.", 56, 885, 682, 100, { size: 13, color: C.muted });
  footer(s, 5);
}

// 6 PLM overview
{
  const s = presentation.slides.add(); s.background.fill = C.white;
  header(s, "03 / PLM service design", "A fragmented service made visible", "Checklist work crossed paper forms, digital PDFs, field activity and enterprise systems. The team needed a shared view before prioritising a direction.");
  rect(s, 56, 230, 682, 365, C.pale, 10); image(s, "blueprint_overview.jpg", 66, 240, 662, 345, "contain", "PLM service blueprint overview");
  text(s, "Research and synthesis", 56, 635, 360, 30, { size: 20, bold: true });
  bullet(s, "16 interviews across eight business groups covered shared needs and specialised workflows.", 56, 678, 682, 42);
  bullet(s, "The blueprint connected the generic process, customer journeys, roles, product touchpoints, supporting systems and handoffs.", 56, 730, 682, 54);
  bullet(s, "Pain points sat at the process stage where they occurred, linking user problems to operational or technical causes.", 56, 796, 682, 54);
  card(s, 56, 906, 682, 117, "My contribution", "I participated in planning and every interview, organised the findings, independently created the service blueprint and validated system relationships with the Solution Architect.", C.orange);
  footer(s, 6);
}

// 7 PLM detail
{
  const s = presentation.slides.add(); s.background.fill = C.white;
  header(s, "03 / PLM service design", "People, product and systems in one model", "The blueprint preserved differences between customer groups while making shared stages and dependencies easy to compare.");
  rect(s, 56, 220, 682, 520, C.pale, 10); image(s, "blueprint_detail.jpg", 66, 230, 662, 500, "contain", "Detailed PLM service blueprint lanes");
  card(s, 56, 780, 327, 132, "Why this structure", "Separate journey maps preserve detail but make comparison difficult. One generic process would erase role-specific requirements.");
  card(s, 411, 780, 327, 132, "How it helped", "Design, business and technology could identify shared and specialised needs, trace dependencies and agree on an initial direction.", C.orange);
  text(s, "Responsible outcome statement", 56, 945, 360, 28, { size: 18, bold: true });
  text(s, "The work later progressed into design and development. I did not participate in the later stakeholder review, so I describe that progression as a project outcome rather than a result directly delivered by me.", 56, 980, 682, 64, { size: 12, color: C.muted });
  footer(s, 7);
}

// 8 Closing
{
  const s = presentation.slides.add(); s.background.fill = C.navy;
  label(s, "Closing note", 64, 72, 250, "#6BA7FF");
  text(s, "Thank you for reviewing", 64, 115, 650, 62, { size: 35, bold: true, color: C.white });
  text(s, "I would be happy to talk through the decisions, constraints and collaboration behind these examples in an interview.", 64, 190, 620, 70, { size: 16, color: C.lightBlue });
  rect(s, 64, 420, 666, 265, "#12375F", 12);
  label(s, "What I bring", 88, 455, 220, "#6BA7FF");
  bullet(s, "Structured thinking across products, services and delivery systems", 88, 505, 570, 38, C.white);
  bullet(s, "Clear documentation that helps cross-functional teams act", 88, 557, 570, 38, C.white);
  bullet(s, "Evidence-led decisions balanced with engineering feasibility", 88, 609, 570, 38, C.white);
  bullet(s, "Honest ownership of contribution, outcomes and limitations", 88, 661, 570, 38, C.white);
  text(s, "Ellen Wang", 64, 970, 250, 28, { size: 18, bold: true, color: C.white });
  text(s, "ellenwang918@gmail.com\nlinkedin.com/in/zi-wang-456923171\nGold Coast, Australia", 64, 1005, 360, 78, { size: 11, color: C.lightBlue });
}

for (const [index, slide] of presentation.slides.items.entries()) {
  slide.speakerNotes.textFrame.setText(`Slide ${index + 1}. Internal work sample prepared for recruitment review. Source images supplied by Ellen Wang.`);
}

const stagingDir = path.join(workspaceDir, ".codex-finalizer");
await fs.mkdir(stagingDir, { recursive: true });
const candidatePath = path.join(stagingDir, "editable-work-samples-candidate.pptx");
await (await PresentationFile.exportPptx(presentation)).save(candidatePath);

const result = await finalizePresentation({
  workspaceDir,
  candidatePath,
  finalPath: FINAL_PPTX,
  pythonExecutable: RUNTIME_PYTHON,
  integrityValidatorPath: path.join(SKILL_DIR, "container_tools/inspect_presentation_package_integrity.py"),
  layoutValidatorPath: path.join(SKILL_DIR, "container_tools/inspect_presentation_layout_geometry.py"),
  layoutArgs: ["--expected-slide-size-emu", "7562850,10696575", "--validate-heading-fit"],
  requiredNativeTableOwnerSlides: [],
  explicitTotalSlideCount: 8,
  fontPolicy: { basis: "design", families: [FONT] },
  verifyArtifactToolImport: true,
  receiptPath: path.join(stagingDir, "Ellen_Wang_Selected_Work_Samples_Editable.validation.json"),
});

console.log(JSON.stringify({ final: FINAL_PPTX, result }, null, 2));
