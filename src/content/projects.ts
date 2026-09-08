export type ProjectMetadata = { label: string; value: string };

export type Project = {
  id: string;
  title: string;
  shortTitle?: string;
  summary: string;
  story: { header: string; content: string };
  metadata: readonly ProjectMetadata[];
  images: readonly string[];
  hero?: { src: string; alt: string };
  tags?: readonly string[];
  confidential?: boolean;
};

// Array order controls both homepage folders and the project sidebar.
export const projects: readonly Project[] = [
  { id: "design-system", title: "Design System & Governance", shortTitle: "Design System", summary: "A shared visual language for teams building with confidence.", hero: { src: "/projects/design-system-hero.svg", alt: "Design System project hero" }, tags: ["Design System", "Design Governance"], metadata: [{ label: "Company", value: "Rio Tinto" }, { label: "Timeline", value: "Sep 2025 - Apr 2026" }, { label: "Title", value: "Senior Analyst Product Designer" }], story: { header: "Long story short", content: "The internal enterprise travel platform had accumulated inconsistent UI patterns, fragmented design files and recurring gaps between design and implementation.\n\nI audited the product ecosystem, rebuilt 25+ reusable components and introduced shared documentation and design-review governance. The updated system achieved full adoption within the design team, with no further implementation misalignment observed after the review process was introduced." }, images: [], confidential: true },
  { id: "feature-improvement", title: "Feature Improvement", metadata: [{ label: "Role", value: "Product design" }, { label: "Year", value: "2024" }], summary: "Small changes that made a complex workflow feel clear.", story: { header: "About the project", content: "Through research and iteration, I simplified the moments that created friction and made the core task easier to complete." }, images: ["/folderCard-simple.svg"] },
  { id: "business-process-improvement", title: "Business Process Improvement", metadata: [{ label: "Role", value: "Service design" }, { label: "Year", value: "2023" }], summary: "Turning scattered steps into a calmer process.", story: { header: "About the project", content: "I mapped the current journey, found the gaps, and shaped a more reliable path for people and the teams supporting them." }, images: ["/folderCard-simple.svg"], confidential: true },
  { id: "rapid-discovery", title: "Rapid discovery", metadata: [{ label: "Role", value: "Research" }, { label: "Year", value: "2023" }], summary: "Making space for useful answers early.", story: { header: "About the project", content: "A focused discovery sprint helped the team align on the real problem before committing to a solution." }, images: ["/folderCard-simple.svg"] },
  { id: "customer-data-analysis", title: "Customer data analysis", metadata: [{ label: "Role", value: "Research" }, { label: "Year", value: "2022" }], summary: "Finding a human story in the numbers.", story: { header: "About the project", content: "I combined qualitative signals with behavioral data to reveal opportunities for a more thoughtful customer experience." }, images: ["/folderCard-simple.svg"] },
];
