# Tech Decisions (ADR journal)

## 001 — Moteur & rendu
- **Décision**: utiliser BGEW (2D web) pour entités/collisions/audio/réseau.
- **Justif**: fit direct avec besoins; boucle update/draw + détect-collisions + howler + RxJS WS.
- **Alternatives**: Phaser; rejeté pour surpoids et recoding net.

## 002 — Modèle réseau
- **Décision**: "autorité douce" owner-room via BGEW; sync WS + room.data.
- **Avantages**: pas de serveur custom; complexité réduite; MVP rapide.
- **Risques**: triche théorique côté client; acceptable pour MVP.
- **Mitigation**: validations min côté client, limites de cadence, ID déterministes.

## 003 — Interpolation & cadence
- **Décision**: envoi 10–15 Hz; draw 60; lerp positions autres joueurs.
- **Justif**: latence réseau variable; fluidité perçue.

## 004 — Assets & UI
- **Décision**: placeholders minimalistes; lisibilité prioritaire; i18n FR/EN plus tard.

## 005 — Tests & CI
- **Décision**: tests unitaires (types/validators, reducers, interpolation); CI GitHub Actions.

(ajouter ici au fil des PRs)
\n+## 006 — Build & Dev Server
- **Décision**: Vite + TypeScript 5 (dev rapide, HMR, build prod simple).
- **Justif**: performances, config minimale, DX.

## 007 — Lint & Format
- **Décision**: ESLint 9 + @typescript-eslint + Prettier.
- **Justif**: qualité homogène; erreurs de lint bloquantes en CI (warnings rejetés).

## 008 — Tests unitaires
- **Décision**: Vitest (+ coverage v8), env Node pour logique pure.
- **Justif**: rapidité, API Jest-like, intégration TS simple.

## 009 — CI
- **Décision**: GitHub Actions (Node LTS): install, lint, build, test.
- **Justif**: feedback rapide; cache npm via setup-node.

## 010 — Imports & alias
- **Décision**: alias `@/*` vers `src/*` (tsconfig paths, vite/ vitest resolvers).
- **Justif**: imports stables, évite les `../../..` fragiles.

## 011 — Structure projet
- **Décision**: `src/`, `assets/`, `docs/` (source canonicale), `tests/` optionnel.
- **Justif**: séparation claire, extensible pour intégration BGEW (core/game/net).
