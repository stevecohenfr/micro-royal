# 🗺️ Roadmap détaillée (PRs atomiques)

##  Phase 0 — Bootstrap & Outillage

PR-01: Initialiser repo jeu (TypeScript, Vite/Parcel, config tsconfig, scripts npm).

PR-02: Linter & Formatter (ESLint, Prettier, config + script lint/format).

PR-03: Tests unitaires min (Vitest/Jest), exemple de test trivial + script test.

PR-04: CI GitHub Actions (install, build, lint, test en Node LTS).

PR-05: Structure /src, /assets, /docs + README (run/dev/build).

PR-06: TECH_DECISIONS.md (journal décisions), STYLE_GUIDE.md (naming, imports).

PR-07: Page d’accueil minimal (canvas + “Start”), favicon, titre.

PR-08: ENV & config (ex: src/config.ts + valeurs par défaut).

## Phase 1 — Intégration BGEW minimale

PR-09: Import BGEW (dep ou submodule) + Board initialisé (canvas, boucle).

PR-10: GameStep squelette (hooks update/draw/timers branchés).

PR-11: Système de collisions on/off depuis config (démo simple).

PR-12: Gestion entrée clavier/souris (bindings centralisés).

PR-13: Caméra basique (suivre un point d’intérêt).

PR-14: Chargement assets placeholders (sprites rectangles/simples).

PR-15: Son via Howler (BGEW) — un SFX et un BGM (volume global).

## Phase 2 — États de jeu & Scène solo

PR-16: FSM Game States (Lobby/Match/End) + router interne simple.

PR-17: Écran Lobby (input pseudo, bouton “Prêt” → passe à Match en local).

PR-18: Arène statique 2000×2000 + quelques obstacles (entités).

PR-19: Entité Joueur (pos, vitesse, sprite, barre de vie) + contrôles.

PR-20: Projectiles (création, vitesse, durée de vie, collision).

PR-21: Dégâts/HP, mort joueur (disable input, message “K.O.”).

PR-22: HUD minimal (HP, munition fictive, pseudo local).

PR-23: Balance basique (dégâts, cadence tir) via config.ts.

PR-24: Audio feedback (tir, hit, mort) — 3 sons placeholders.

## Phase 3 — Shrinking Zone (solo)

PR-25: Entité Zone rétrécissante (cercle/carré) affichée.

PR-26: Timer shrink (étapes régulières, easing linéaire).

PR-27: Dégâts hors zone (tick damage, HUD alerte).

PR-28: Countdown avant shrink + message UI.

## Phase 4 — Réseau (BGEW intégré)

PR-29: Service réseau isolé (wrapper NetworkManager BGEW : src/net/net.ts).

PR-30: Schéma messages TypeScript (src/net/messages.ts) + validation (zod).

PR-31: Lobby réseau BGEW : liste/creation/join/leave rooms + pseudo/ready (UI simple).

PR-32: Heartbeat & latence via /api/ping BGEW + petit widget d’affichage.

PR-33: Choix modèle réseau → autorité “douce” côté room owner (documenter dans TECH_DECISIONS.md).

PR-34: Sérialisation player/state (pos/dir/hp/firing), throttle 10–15 Hz.

PR-35: Réception états des autres joueurs + interpolation simple (lissage).

PR-36: Spawns synchronisés via room.data (seed, mapId, positions).

PR-37: projectile/spawn synchro client-side (ID déterministe) + réplication.

PR-38: Zone shrink sync : plan dans room.data, messages zone/state par l’owner.

PR-39: Fin de partie réseau (dernier vivant) → game/end + passage auto en spectateur.

💡 Si tu n’as pas encore de serveur, on continue Phase 5 pour le relay WS.

## Phase 5 — Réseau (robustesse & UX BGEW)

PR-40: Reconnexion : rejoin room si possible ; si isStarted, bascule spectateur.

PR-41: Gestion onConnectionClosed : retour Lobby + toast/dialog explicatif.

PR-42: Room-data helpers (get/set/merge typés) + garde-fous (taille/shape).

PR-43: Countdown partagé : owner émet game/countdown { tStart }, synchro démarrage.

PR-44: Anti-spam client (rate limit envoi, coalescing messages redondants).

PR-45: Logs réseau & overlay debug (RTT moyen, msgs/s, pertes estimées).

PR-46: Scripts dev multi-onglets (npm run dev:multi) + doc README “tests à 2–4 joueurs”.

PR-47: QA réseau : TESTPLAN.md (2/4/8 joueurs simulés) + bots headless simples.

PR-48: Tests unitaires net (validators zod, handlers, reducers d’état, interpolation).

## Phase 6 — UX réseau

PR-49: Écran Lobby connecté (liste joueurs, ready check).

PR-50: Compte à rebours partagé (3..2..1..Go) depuis serveur.

PR-51: Spectateur: si mort → caméra suit random joueur vivant.

PR-52: Reconnexion simple (rejoin room, mode spectateur si match en cours).

PR-53: Écran fin de partie réseau (classement, bouton Rejouer).

## Phase 7 — Power-Ups & objets

PR-54: Système spawn d’objets (seed serveur, positions).

PR-55: Power-up Soin (+30 pv) — durée instantanée.

PR-56: Power-up Vitesse (buff 10 s) — icône HUD.

PR-57: Power-up Bouclier (réduit dégâts 30% | 10 s).

PR-58: Sync serveur des pickups (réservation + disparition).

PR-59: Pare-balles simples (obstacles destructibles: 2 états).

## Phase 8 — Polish gameplay

PR-60: Caméra smooth (lerp), écran shake sur hit.

PR-61: Particules simples (impact balle, pickup).

PR-62: HUD propre (liste joueurs restants, mini-radar zone).

PR-63: Paramétrage fin (vitesse joueurs, dégâts, cadence).

PR-64: Profiling léger (stats frame, entités, net).

PR-65: Nettoyage logs, erreurs user-friendly.

## Phase 9 — UI & Accessibilité

PR-66: Menus (Accueil, Lobby, Options, Crédits).

PR-67: Options: volume, sensibilité, touches (rebind local).

PR-68: A11y basique: contraste, police lisible, feedback audio/visuel.

PR-69: Localisation FR/EN (fichier i18n & pipe simple).

## Phase 10 — QA, stabilité, packaging

PR-70: TESTPLAN.md (scénarios manuels: 2, 4, 8 joueurs simulés).

PR-71: Tests d’intégration light client (ex: logique FSM).

PR-72: Tests d’intégration serveur (room, fin match, pickups).

PR-73: Script “bot” headless (clients factices position/inputs) pour charges légères.

PR-74: Build prod + bundle analyzers (taille, tree-shaking).

PR-75: Docker (client static + serveur ws), compose dev/prod.

PR-76: Déploiement simple (guide: VPS/Render/Fly.io, variables).

PR-77: QA_CHECKLIST.md (perf min 60 FPS local, lag toléré, reconnection OK).

PR-78: ASSET_CHECKLIST.md + crédits (sons/images libres).

PR-79: SECURITY_NOTES.md (limites, abus possibles, next steps).

## Phase 11 — Bonus

PR-80: Mode équipes (2v2/4v4) — tag team & couleur.

PR-81: Map variants (layouts prédéfinis).

PR-82: Cosmetic skins (palette swap sprites).

PR-83: Classement “session” (best of 5).

PR-84: Page “How to Play” illustrée.
