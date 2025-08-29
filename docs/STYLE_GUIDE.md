# Style Guide

Ce guide harmonise le code du client Micro Royal. Il complète AGENTS.md et docs/TECH_DECISIONS.md.

## Langage & Formatage
- TypeScript strict (tsconfig strict=true).
- Indentation 2 espaces; largeur 100 colonnes (Prettier).
- Commandes: `npm run lint`, `npm run lint:fix`, `npm run format`.
- Préférer `const`; éviter `any`; types précis et `readonly` quand utile.

## Nommage
- Variables/fonctions: camelCase (`movePlayer`).
- Types/classes/interfaces: PascalCase (`PlayerState`).
- Fichiers: kebab-case (`player-controller.ts`).
- Constantes: SCREAMING_SNAKE_CASE (`TICK_RATE_HZ`).
- Tests: `*.test.ts` (ex: `player.move.test.ts`).

## Imports
- Alias: `@/*` pointe vers `src/*` (voir `tsconfig.json`).
- Préférer les exports nommés; éviter les exports par défaut.
- Garder les imports peu profonds; regrouper par lib/std → internes.

## Organisation du code
- Entrée: `src/main.ts`.
- Modules (cibles roadmap):
  - `src/core/*` (intégration BGEW, boucle, helpers canvas).
  - `src/game/*` (états, entités, systèmes).
  - `src/net/*` (wrapper réseau BGEW, messages, validations).
  - `src/utils/*` (purs helpers, sans effets de bord).
- Assets: `assets/` (placeholders, crédits à documenter).

## Tests
- Framework: Vitest. Couverture via `npm run coverage`.
- Emphase: logique pure (validators, reducers, maths, interpolation).
- Colocation autorisée pour petits modules, sinon `tests/`.

## Règles ESLint (extraits)
- `@typescript-eslint/no-unused-vars`: warn (args préfixés `_` autorisés).
- `no-console`: warn (autoriser `warn`/`error`).
- Interdire effets globaux; fonctions petites et déterministes quand possible.

## Git & Messages
- Conventionnel conseillé: `feat(core): init game loop (PR-10)`.
- Commits petits et atomiques; lier l’item roadmap (PR-XX) dans le message.

