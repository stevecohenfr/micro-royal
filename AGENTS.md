# Repository Guidelines

## Project Structure & Modules
- Root docs: `docs/` (ROADMAP, GAME/NET specs, TECH_DECISIONS).
- Source (planned per roadmap): `src/` for game code, `assets/` for sprites/audio, `tests/` for unit tests.
- Keep modules small and focused: `src/core/*` (engine integration), `src/game/*` (states/entities), `src/net/*` (network wrapper).

## Build, Test, and Development
- Install: `npm ci` — install exact dependencies.
- Dev server: `npm run dev` — start local hot-reload (Vite/Parcel).
- Build: `npm run build` — production build of the client.
- Lint/Format: `npm run lint` / `npm run format` — static checks and formatting.
- Tests: `npm test` — run unit tests (Vitest/Jest). `npm run test:watch` for TDD.
Notes: scripts land in PR-01..PR-05; use the names above when adding them.

## Coding Style & Naming
- Language: TypeScript. Indent 2 spaces; prefer const; no unused vars.
- Naming: camelCase (vars/functions), PascalCase (types/classes), kebab-case (filenames), SCREAMING_SNAKE_CASE (env).
- Imports: absolute from `src/` when configured; otherwise relative kept shallow.
- Tools: ESLint + Prettier (configure in PR-02). Run before committing.

## Testing Guidelines
- Framework: Vitest (preferred) or Jest (PR-03).
- Location: `tests/**/*` or colocated `*.test.ts` near source.
- Conventions: name tests after behavior, e.g. `player.move.test.ts`.
- Expectations: cover pure logic (validators, reducers, math, interpolation). Add at least one trivial test per PR touching logic.

## Commit & Pull Requests
- Branches: `feature/pr-XX-*` matching the item in `docs/ROADMAP.md`.
- Commits: concise imperative subject. Prefer Conventional Commits, e.g. `feat(core): init game loop (PR-10)`.
- PRs into `main`: include summary, scope, risks, testing notes, and screenshots/GIFs for UI.
- Keep PRs < ~15 minutes of work; split into `PR-XXa`, `PR-XXb` if larger. Update ROADMAP when you split.
- Remote: ensure `origin` points to GitHub (e.g., `git@github.com:stevecohenfr/micro-royal.git`).

## Security & Configuration
- Never commit secrets. Use `.env.local` (gitignored). Document required env in README.
- Keep third‑party assets licensed and credited (see future `ASSET_CHECKLIST.md`).

## Agent-Specific Notes
- Work only in this repo (do not modify BGEW). One task = one PR with a real diff and green CI. Update `README.md`/`ROADMAP.md`/`TECH_DECISIONS.md` when relevant.
