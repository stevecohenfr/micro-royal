# Micro Royal

Jeu 2D web “battle royale” rapide (MVP). Moteur: BGEW (read‑only). Ce dépôt contient le client de jeu.

## Démarrage rapide
- Installation: `npm ci`
- Dev (hot reload): `npm run dev` → http://localhost:5173
- Build prod: `npm run build`
- Aperçu build: `npm run preview`
- Lint: `npm run lint` | Format: `npm run format`
- Tests: `npm test` | Watch: `npm run test:watch` | Couverture: `npm run coverage`

## Structure
```
micro-royal/
├─ src/                # Code du jeu (TS)
│  ├─ utils/           # Helpers (ex: math)
│  └─ main.ts          # Entrée app (canvas, bootstrap)
├─ assets/             # Sprites/audio (placeholders, .gitkeep)
├─ docs/               # ROADMAP, GAME/NET specs, TECH_DECISIONS (source)
├─ index.html          # Page hôte
├─ package.json        # Scripts (dev/build/lint/test)
├─ tsconfig.json       # Config TypeScript stricte
├─ vite.config.ts      # Config Vite
└─ vitest.config.ts    # Config tests
```

Note: le `ROADMAP.md` racine est un pointeur vers `docs/ROADMAP.md`.

## Liens utiles
- Règles de contribution: `AGENTS.md`
- Roadmap détaillée: `docs/ROADMAP.md` (PR-xx)
- Spécifications: `docs/GAME_SPEC.md`, `docs/NET_SPEC.md`
- Décisions tech: `docs/TECH_DECISIONS.md`

## Moteur (référence seulement)
- BGEW: https://github.com/fuwu-yuan/bgew — ne pas modifier depuis ce repo.
