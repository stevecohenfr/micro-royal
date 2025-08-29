# Micro Royale — Net Spec

## Modèle
- **Autorité “douce”** par owner de room (via BGEW): room.data = source légère (seed, map, phases zone, état de match).
- **Échanges WS** pour états joueurs et événements (spawn projectile, fin de partie).
- Fréquences: envoi input/état local **10–15 Hz**, tick draw local 60 FPS, interpolation pour les autres.

## Endpoints BGEW utilisés
- REST: `/api/room/list`, `/api/room/create`, `/api/room/join`, `/api/room/leave`, `/api/ping`, `setRoomData(partial, merge=true)`, `getRoomData()`.
- WS: `send({ code, data })`, `onMessage(cb)`.

## Messages (WS)
```ts
export type NetCode =
  | "player/join"        // { uid, name }
  | "player/leave"       // { uid }
  | "player/state"       // { uid, x, y, dir, hp, firing, t }
  | "projectile/spawn"   // { id, uid, x, y, dir, speed, dmg, t }
  | "zone/state"         // { phase, center:{x,y}, radius, tStart, tEnd }
  | "game/countdown"     // { tStart }
  | "game/end"           // { winnerUid, ranking: string[] };

Room Data (source légère)
interface RoomData {
  ownerUid: string;
  isStarted: boolean;
  seed: number;
  mapId: string;
  players: Array<{ uid: string; name: string; ready: boolean }>;
  zonePlan: Array<{ phase: number; radius: number; durationMs: number }>;
}

Flux

Lobby: list/create/join; chaque joueur met ready=true (room.data merge).

Countdown: owner envoie game/countdown {tStart}; clients démarrent localement à tStart.

Match: chaque client envoie player/state throttle 10–15 Hz; reçoit les autres; interpole.

Projectile: au tir local → envoyer projectile/spawn; tous créent le projectile (id déterministe).

Zone: owner publie zone/state à chaque step; clients appliquent l’état reçu.

Fin: owner détecte “dernier vivant” → game/end.

Tolérances

Perte messages tolérée: interpolation + réémissions périodiques d’état.

Latence affichée via /api/ping moyenne glissante.
