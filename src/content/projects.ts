export type ProjectMetadata = {
  label: string;
  value: string;
};

export type Project = {
  id: string;
  title: string;
  folderTitle: string;
  summary: string;
  story: {
    header: string;
    content: string;
  };
  metadata: readonly ProjectMetadata[];
  images?: readonly string[];
  hero?: {
    src: string;
    alt: string;
  };
  tags: readonly string[];
  confidential: boolean;
};

// Array order controls both homepage folders and the project sidebar.
export const projects: readonly Project[] = [
  {
    id: "design-system-palms",
    title: "Design System & Governance",
    folderTitle: "Design System",
    summary: "An enterprise travel platform serving more than 6,000 monthly active users.",
    hero: {
      src: "/projects/design-system-editorial.svg",
      alt: "Design System project hero",
    },
    tags: ["Design System", "Governance", "Design Review"],
    metadata: [
      { label: "Company", value: "Rio Tinto" },
      { label: "Timeline", value: "Sep 2025 - Apr 2026" },
      { label: "Title", value: "Senior Analyst Product Designer" },
    ],
    story: {
      header: "Long story short",
      content:
        "The internal enterprise travel platform had accumulated inconsistent UI patterns, fragmented design files and recurring gaps between design and implementation.\n\nI audited the product ecosystem, rebuilt 25+ reusable components and introduced shared documentation and design-review governance. The updated system achieved full adoption within the design team, with no further implementation misalignment observed after the review process was introduced.",
    },
    confidential: true,
  },
  {
    id: "feature-improvement-sps",
    title: "Feature Improvement & MVP Validation",
    folderTitle: "Feature Improvement",
    summary: "An enterprise continuous-improvement platform used by operational teams across multiple sites.",
    hero: {
      src: "/projects/feature-improvement-editorial.svg",
      alt: "Feature Improvement project hero",
    },
    tags: ["User Research", "MVP Scoping", "Usability Testing"],
    metadata: [
      { label: "Company", value: "Rio Tinto" },
      { label: "Role", value: "Digital graduate product designer" },
      { label: "Year", value: "Feb 2025 - Sep 2026" },
    ],
    story: {
      header: "Long story short",
      content:
        "Users needed a clearer way to understand the status and deadlines of their action items. After observing that they already used Kanban-style spreadsheets, I translated this familiar behaviour into a feasible product concept and validated the scope with engineering. All participants understood the new experience without prompting during four usability sessions, and the feature was approved and released.",
    },
    confidential: true,
  },
  {
    id: "business-process-improvement-plm",
    title: "Service Design & Workflow Mapping",
    folderTitle: "Service Design",
    summary: "A mobile maintenance product that digitises field workflows and connects with enterprise systems.",
    hero: {
      src: "/projects/service-design-editorial.svg",
      alt: "Service Design project hero",
    },
    tags: ["Service Design", "Workflow Mapping", "Research Synthesis"],
    metadata: [
      { label: "Company", value: "Rio Tinto" },
      { label: "Role", value: "Digital graduate product designer" },
      { label: "Year", value: "Feb 2024 - Oct 2024" },
    ],
    story: {
      header: "Long story short",
      content:
        "Maintenance checklist workflows varied significantly across user groups, operational processes and connected systems. I synthesised findings from 16 interviews across eight business groups into a layered service blueprint linking user journeys, system interactions, handoffs and pain points. The blueprint created a shared view of the service and supported customer prioritisation and the transition into requirements and product design.",
    },
    confidential: true,
  },
  {
    id: "rapid-discovery-ism",
    title: "Rapid Discovery & Prototyping",
    folderTitle: "Rapid Discovery",
    summary: "A rapid discovery engagement focused on a complex operational scheduling experience.",
    hero: {
      src: "/projects/rapid-design-editorial.svg",
      alt: "Rapid Discovery project hero",
    },
    tags: ["Rapid Discovery", "Prototyping", "Product Alignment"],
    metadata: [
      { label: "Company", value: "Rio Tinto" },
      { label: "Role", value: "Digital graduate product designer" },
      { label: "Year", value: "Mar 2025 - May 2025" },
    ],
    story: {
      header: "Long story short",
      content:
        "The initiative lacked a shared understanding of its terminology, workflows and system dependencies. I introduced a collaborative alignment canvas, owned the short-term workflow and translated 12 user stories into an interactive prototype. The concept was evaluated through three usability sessions and refined for engineering handover within a ten-week engagement.",
    },
    confidential: true,
  },
  {
    id: "customer-data-analysis-commercial",
    title: "Customer Data Analysis & Feasibility",
    folderTitle: "Customer Analysis",
    summary: "A six-week feasibility study exploring a customer management and self-service portal.",
    hero: {
      src: "/projects/customer-data-analysis-editorial.svg",
      alt: "Customer Data Analysis project hero",
    },
    tags: ["Customer Analysis", "Data Analysis", "Customer Segmentation"],
    metadata: [
      { label: "Company", value: "Rio Tinto" },
      { label: "Role", value: "Digital graduate product designer" },
      { label: "Year", value: "Oct 2024 - Feb 2025" },
    ],
    story: {
      header: "Long story short",
      content:
        "The proposed portal needed stronger evidence before the business could commit to a product direction. I cleaned and normalised 131 customer records, using descriptive statistics, segment comparisons and missing-data analysis to identify patterns and evidence gaps. The study gave stakeholders a clearer basis for feasibility discussions and defined the additional research needed for a confident decision.",
    },
    confidential: true,
  },
];
