# Homepage architecture

Reference: [Desktop - 1, frame 307:576](https://www.figma.com/design/OQ6xCKMzTzbOkUQ1NR0dJK/Resume-Portfolio?node-id=307-576).

## Observed structure

The 1440 × 1024 desktop frame contains a dotted background and a narrow central
content column. The logo sits above the intro. The intro contains a greeting,
biography, and location. Experience follows with five identical folder illustrations
and distinct labels, arranged as three items then two. The hanging lamp sits above
and to the right of the column. LinkedIn, GitHub, and email icons sit below it.

## Component tree

- RootLayout
  - SiteHeader → Logo
  - Home (page.tsx)
    - HangingLamp
    - IntroSection
    - ExperienceSection → FolderCard × 5
  - SiteFooter → SocialLinks

## Responsibilities

| Component | Responsibility |
| --- | --- |
| Logo | Accessible home link; exact mark deferred |
| IntroSection | Heading, biography, and location props |
| ExperienceSection | Section heading and semantic list of experience items |
| FolderCard | Repeated item label and optional destination |
| HangingLamp | Noninteractive decorative mounting point |
| SocialLinks | Named navigation with configurable labels and destinations |

Portfolio copy and project records are centralized in `src/content/home.ts` and
`src/content/projects.ts`. Project records drive both homepage folders and the
project sidebar. The homepage experience section is the client boundary because
it owns URL-backed modal state; the surrounding route and content components stay
server-rendered. Each project also has a canonical `/experience/[id]` page for
sharing, refreshes, and search indexing.

## Deferred visual work

This is a structural scaffold, not a visual reproduction. Figma artwork (logo,
folder, lamp, location and social icons), dotted background, grid, spacing,
typography, colors, and motion remain deferred. Export and use the original Figma
assets during that pass rather than recreating the artwork.

The page uses natural document flow with responsive layouts. Keep the semantic
reading order and ensure the decorative lamp never obscures content. Animation
requires static-layout approval.
