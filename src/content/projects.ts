export type ProjectMetadata = {
  label: string;
  value: string;
};

export type Project = {
  id: string;
  title: string;
  folderTitle: string;
  summary: string;
  story: readonly {
    header: string;
    content: string;
  }[];
  metadata: readonly ProjectMetadata[];
  folderArtwork?: {
    src: string;
    alt: string;
  };
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
    folderArtwork: { src: "/projects/design-system-drawing.svg", alt: "Design System drawing" },
    summary: "An enterprise travel platform serving more than 6,000 monthly active users.",
    hero: {
      src: "/projects/design-system-editorial.svg",
      alt: "Design System project hero",
    },
    tags: ["Design System", "Governance", "Design Review"],
    metadata: [
      { label: "Company", value: "Rio Tinto" },
      { label: "Role", value: "Senior Analyst Product Designer" },
      { label: "Year", value: "Sep 2025 - Apr 2026" },
    ],
    story: [
      {
        "header": "Overview",
        "content": "The platform had been in development for two years and served more than 6,000 monthly active users. Its first interface prioritised speed to market, a later redesign introduced a more considered brand-aligned visual and interaction language.\n\nBoth generations remained live across different pages. Three designers were contributing without a single source of truth, while completed front-end work could reach stakeholders without formal design review."
      },
      {
        "header": "The challenge",
        "content": "The problem extended beyond visual inconsistency:\n\n- Different pages used conflicting interaction patterns.\n- The live product, design system and working files did not always match.\n- Designers sometimes created local components without checking the shared library.\n- Page designs were distributed across files and difficult to locate.\n- Business analysts, engineers and testers needed an always available reference when a designer could not be reached.\n- No formal design checkpoint prevented design-to-build differences from reaching stakeholders.\n\nA product wide audit found more than 25 components, with approximately seven requiring correction or restructuring. Search was a representative example: four different patterns existed across the product, with inconsistent icons and helper text behaviour."
      },
      {
        "header": "My approach",
        "content": "I treated the issue as a connected system of components, people and delivery practices.\n\n1. **Audit the ecosystem** - Compared the live product, existing design system and designers' working files to identify component, typography, interaction and implementation mismatches.\n2. **Create one shared structure** - Defined the design-system architecture and rules for contribution, including checking the library before creating a component and communicating every shared update.\n3. **Rebuild for reuse** - Applied atomic-design principles to restructure components and replace duplicated variants with manageable properties.\n4. **Document decisions** - Created practical guidance informed by mature public design systems, including behaviour, content and accessibility.\n5. **Improve findability** - Built a guided page library containing the current approved designs.\n6. **Close the delivery loop** - Worked with the scrum master to add design review to every front-end user story. Any user faced screen could not be completed until the designer had reviewed and approved it."
      },
      {
        "header": "Outcome",
        "content": "- The updated component library reached 100% adoption within the design team.\n- After formal design review was introduced, no further design-to-build misalignment was reported during the observed delivery period.\n- The shared system and page library gave designers, analysts, engineers and testers a faster route to current guidance.\n- Reusable component properties noticeably improved design efficiency, although formal time-on-task data was not collected.\n- Components and designs were reviewed for accessibility and responsive behaviour."
      },
      {
        "header": "Reflection",
        "content": "The work established a governance model around the design system, connecting reusable components and discoverable guidance to a required design review. This made consistency part of the delivery process instead of relying on individual designers to catch discrepancies."
      },
    ],
    confidential: true,
  },
  {
    id: "feature-improvement-sps",
    title: "Feature Improvement & MVP Validation",
    folderTitle: "Feature Improvement",
    folderArtwork: { src: "/projects/feature-improvement-drawing.svg", alt: "Feature Improvement drawing" },
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
    story: [
      {
        "header": "Overview",
        "content": "The platform supported structured problem solving and continuous improvement events across industrial sites. The existing process generated valuable knowledge, but past work was difficult to retrieve, action ownership weakened after events and governance varied between teams.\n\nI collaborated with a senior designer on the primary improvement workflow and independently owned a secondary print/export initiative."
      },
      {
        "header": "My contribution to the action workflow",
        "content": "I helped prepare the interview plan, contributed follow up questions, acted as note taker and synthesised the findings with the senior designer.\n\nDuring interviews, I noticed participants using spreadsheet columns as an informal Kanban board when presenting and tracking action items. This suggested that status based columns were already part of their mental model.\n\nBefore proposing a new product pattern, I checked feasibility with engineering leads. They confirmed that a Kanban style MVP would not add substantial effort if drag and drop interaction was deferred.\n\nI used this evidence to propose a board organised by action status and due date. The design made ownership and progress visible while keeping the first release technically achievable."
      },
      {
        "header": "Validation and outcome",
        "content": "- Stakeholders responded positively after the rationale and development trade off were explained.\n- Four usability sessions were completed.\n- All participants understood the board without prompting.\n- The pattern received approval and was released without drag and drop in the initial version.\n- Users expressed satisfaction with the status based structure during testing."
      },
      {
        "header": "Secondary initiative - Print and export",
        "content": "I independently completed the end to end research and design for print/export.\n\nThe existing vertical PDF layout omitted images, displayed incomplete content and created poor information hierarchy. I recruited ten potential participants, but only three responded, which highlighted the importance of recruitment framing and subject line clarity.\n\nBased on the research, I:\n\n- Changed the export from portrait to landscape.\n- Reorganised the information hierarchy for print use.\n- Restored missing images and incomplete content.\n- Designed and validated the complete output independently.\n\nThe solution was released. Later qualitative feedback indicated that the previous formatting problems were no longer being reported, although I had moved to another project before the follow-up study."
      },
      {
        "header": "Reflection",
        "content": "My strongest contribution was noticing a repeated user behaviour and translating it into a feasible product direction. In future, I would formally compare the proposed pattern with the existing approach before presenting it, so the decision is supported by both observation and explicit comparative evidence."
      }
    ],
    confidential: true,
  },
  {
    id: "business-process-improvement-plm",
    title: "Service Design & Workflow Mapping",
    folderTitle: "Service Design",
    folderArtwork: { src: "/projects/service-design-drawing.svg", alt: "Service Design drawing" },
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
    story: [
      {
        "header": "Overview",
        "content": "The existing product was an Android mobile based digitalised maintenance paperword application. It allowed field personnel to view digital work orders and attachments and record maintenance information that would traditionally be pure paper based and handled through a central enterprise asset management system. \n\nAlthough core maintenance activities had already been digitised, checklist related workflows remained fragmented across paper forms, digital PDF editor and specialised systems."
      },
      {
        "header": "Research",
        "content": "We conducted 16 interviews across eight business groups. I participated in research planning, contributed to the moderation guide, attended every interview, supported parts of the facilitation, acted as note taker and organised the findings.\n\nThe study first explored a broad range of roles, processes and tools, then converged to identify:\n\n- Common pain points across groups\n- Requirements specific to specialised workflows\n- The strongest customer group for an initial solution\n- The business and technical information required before prototyping"
      },
      {
        "header": "My reasoning",
        "content": "Separate journey maps would preserve detail but make comparison difficult. One generic process would be easier to understand but would erase role specific requirements.\n\nI therefore independently created a layered service blueprint combining:\n\n1. A generic end-to-end customer process\n2. A customer journey for each business group\n3. User roles, goals and behaviours\n4. Front-end product interactions\n5. Back-end software and system dependencies\n6. Handoffs between teams and systems\n7. Pain points positioned at the exact process stage where they occurred\n\nPlacing pain points inside the process made it possible to connect a visible user problem with its operational or technical cause. Additionally, I validated the system relationships with the Solution Architect to make sure the blueprint aligned with the overall technical architecture."
      },
      {
        "header": "Outcome",
        "content": "The blueprint gave design, business and technology a shared view of the Digital Checklist ecosystem. It helped the team compare customer groups, distinguish common and specialised requirements, identify system dependencies and prioritise an initial direction.\n\nThe project subsequently progressed into design and development. A later stakeholder review grouped feedback into themes, prioritised issues and translated them into recommendations. I did not participate in that later phase, so it is presented as a project outcome rather than a result directly delivered by me."
      },
      {
        "header": "Additional contribution - Design system documentation",
        "content": "I also established the product's design system documentation format and independently authored the available component guidance, covering usage, hierarchy, variants, states, anatomy, dimensions, alignment, content, icons, accessibility, exceptions and product examples."
      },
      {
        "header": "Reflection",
        "content": "The blueprint was valuable because it did more than summarise interviews. It organised evidence so that different disciplines could reason about the same service. If I continued into implementation, I would link each prioritised pain point to a product requirement and define success measures before handover."
      }
    ],
    confidential: true,
  },
  {
    id: "rapid-discovery-ism",
    title: "Rapid Discovery & Prototyping",
    folderTitle: "Rapid Discovery",
    folderArtwork: { src: "/projects/rapid-discovery-drawing.svg", alt: "Rapid Discovery drawing" },
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
    story: [
      {
        "header": "Overview",
        "content": "The planning team relied on spreadsheets, macros and separate scheduling files to manage interconnected long-term and operational plans. Frequent priority changes required manual rescheduling, while data moved through several systems before reaching the reports used by the wider business.\n\nThe domain was unfamiliar and technically complex. Before moving into interface design, the design team needed a reliable way to capture terminology, assumptions, users, workflows and decisions."
      },
      {
        "header": "My approach",
        "content": "I proposed a collaborative Product Alignment Canvas as the project's shared source of truth. It remained in use throughout the engagement and helped users, stakeholders and the design team build a common understanding of the problem.\n\nTogether with the senior designer, I:\n\n- Joined user and stakeholder meetings and interviews.\n- Mapped the daily workflow and the end-to-end user flow.\n- Recorded assumptions, terminology, roles and product decisions in the alignment canvas.\n- Designed a usability testing approach and incorporated feedback into later iterations.\n\nThe senior designer primarily focused on the long-term planning experience. I focused on the short-term workflow: how users would interact with near term schedules, understand generated plans and complete operational tasks."
      },
      {
        "header": "Prototype delivery",
        "content": "Using the senior designer's draft flow as the foundation, I applied my Figma expertise to create the interactive draft prototype for 12 user stories.\n\nThe prototype helped the team move from abstract requirements to a shared experience that users and stakeholders could evaluate. Three usability sessions were completed with users, and the final design was prepared for engineering handover."
      },
      {
        "header": "Outcome",
        "content": "- The Product Alignment Canvas became a persistent source of truth throughout the project.\n- Twelve user stories were translated into an integrated interactive experience.\n- Three usability sessions with four users informed refinement of the workflow.\n- The team completed a clear design handover for implementation."
      },
      {
        "header": "Reflection",
        "content": "Working with a senior designer did not mean duplicating the same responsibilities. My contribution was strongest where rapid structuring and execution were needed: proposing the alignment method, owning the short-term experience and turning a draft flow into a coherent prototype that could be tested and handed over."
      }
    ],
    confidential: true,
  },
  {
    id: "customer-data-analysis-commercial",
    title: "Customer Data Analysis & Feasibility",
    folderTitle: "Customer Analysis",
    folderArtwork: { src: "/projects/customer-data-analysis-drawing.svg", alt: "Customer Analysis drawing" },
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
    story: [
      {
        "header": "Overview",
        "content": "The commercial team wanted to determine whether customers needed a central platform for relationship management and self service. The proposed capability would allow customers to view current product prices, track shipments and access invoices.\n\nUseful customer and segmentation data already existed, but it was spread across source files and could not be compared or queried consistently."
      },
      {
        "header": "My approach",
        "content": "I worked with the product manager and lead designer to define the decision the feasibility study needed to support. I used AI to help draft the data analysis plan, then reviewed, cleaned and structured the supplied data into a reusable customer matrix.\n\nThe analysis covered 131 customer records and used:\n\n- Data cleaning and field normalisation\n- Descriptive statistics\n- Frequency and distribution analysis\n- Group-level averages\n- Segment comparison across volume, product mix, margin and relationship indicators\n- Missing-data and evidence-gap analysis\n- Anomaly review before interpretation\n\nI separated the outputs into three layers: what the data showed, what could reasonably be inferred, and what still required further evidence."
      },
      {
        "header": "Findings and outcome",
        "content": "The analysis exposed meaningful differences between customer segments while also showing that behavioural, demographic and engagement information was insufficient for a complete segmentation.\n\nThe business received:\n\n- A structured view of 131 customers\n- A repeatable customer comparison matrix\n- An evidence based playback of the major patterns\n- A prioritised list of missing information\n- Recommendations for segment specific engagement and future research\n\nThe work supported the feasibility discussion and clarified where deeper customer research should focus. No revenue or post launch impact is claimed because the study was decision support, not product delivery."
      },
      {
        "header": "Reflection",
        "content": "The value of quantitative analysis comes from making its limitations visible. Missing values and inconsistent definitions were not problems to hide, they were findings that directly affected confidence in the business decision."
      }
    ],
    confidential: true,
  },
];
