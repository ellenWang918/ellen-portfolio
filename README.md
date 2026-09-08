# Ellen's portfolio

Minimal Next.js portfolio using the App Router, TypeScript, Tailwind CSS, and a local Alata font.

## Local development

```sh
npm ci
npm run dev
```

Open http://localhost:3000. On Windows PowerShell, use `npm.cmd` if script execution is restricted.

Use Node 24.14.1 (pinned in `.nvmrc`); the deployment runtime should use Node 24.x.

## Checks

```sh
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

Install the test browser once with `npx playwright install chromium`. Tests start
the production server on port 3100, so build before running them. `npm run check`
runs all four checks. The browser tests cover desktop and mobile dialog focus,
dismissal, scroll restoration, project switching, and About navigation.

The GitHub Actions `Quality checks` job runs these checks on pushes and pull
requests. Configure that job as a required status check in the repository's branch
protection settings to prevent merging failures; the workflow alone does not
enable branch protection.

The homepage component architecture is documented in [docs/homepage-architecture.md](docs/homepage-architecture.md).

Project content lives in `src/content/projects.ts`. Add one entry there to create
both its homepage folder and sidebar entry; array order controls both. Use a
unique, stable `id`, a full `title`, and optional `shortTitle` for the folder label.
Every project requires a `story` object (`header`, `content`) and a `metadata`
array (`label`, `value`). Components consume these content types directly.

Motion tokens and future usage are documented in [docs/motion-design-system.md](docs/motion-design-system.md). Components remain static.
