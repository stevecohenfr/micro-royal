# Micro Royale — Game Spec (GDD bref)

## Vision
Battle royale 2D top-down **ultra-rapide** (3–5 min), 4–8 joueurs, web. Lisible, fun, relançable.

## États & boucle
- **Lobby**: pseudo, liste de rooms, ready; lancement quand tous prêts ou timer.
- **Match**: spawn aléatoire dans une arène 2000×2000; tir, déplacements, power-ups; **zone** qui rétrécit par phases.
- **Fin**: dernier survivant vainqueur; écran de classement; “Rejouer”.

## Arène
- 2000×2000 px au départ; obstacles fixes (qq murs/caisses), certains destructibles (2 états).
- Style clair/minimal (lisibilité > effets).

## Contrôles
- Déplacement: ZQSD / flèches.
- Tir: clic/souris (ou espace). Option: maintenir pour tir auto (cadence limitée).
- Pause (local): ESC.

## Entités
- **Player**: pos, vel, dir, hp=100, pseudo; hitbox rect; barre de vie.
- **Projectile**: pos, vel, dmg=10 (par défaut), durée de vie courte; détruit à l’impact.
- **Zone**: cercle (ou carré) qui rétrécit par steps; dégâts “hors zone” périodiques (ex: 5 hp/s).
- **Power-ups**: Heal (+30 hp), Speed (+20% 10s), Shield (−30% dégâts 10s).
- **UI**: HUD hp/alias, timer shrink, joueurs restants, message fin.

## Règles clés
- Spawn joueurs: positions prédéfinies choisies par seed.
- Dégâts: projectiles, hors zone; pas de friendly fire pour MVP.
- Mort: contrôle désactivé; passage spectateur (caméra suit un vivant).
- Partie se termine dès qu’il reste 1 joueur vivant.
- Particules simples (impact, pickup) et feedback audio minimal.

## Perf & cible
- 60 FPS local, interpolation réseau côté client.
- 4–8 joueurs recommandés.

