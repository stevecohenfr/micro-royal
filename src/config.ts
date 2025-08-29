export type AppConfig = {
  title: string;
  version: string;
  canvas: {
    width: number;
    height: number;
    background: string;
  };
  net: {
    apiBase?: string;
  };
  physics: {
    collisions: boolean;
  };
  balance: {
    playerMaxHp: number;
    playerSpeed: number; // px/s
    projectileSpeed: number; // px/s
    fireCooldownMs: number;
    projectileDamage: number;
  };
  zone: {
    center: { x: number; y: number };
    initialRadius: number;
    tickDamage: number; // hp per tick outside
    tickMs: number; // damage interval
    plan: Array<{ phase: number; radius: number; durationMs: number }>;
  };
};

const parseNumber = (v: string | undefined, fallback: number) => {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? n : fallback;
};

export const config: AppConfig = {
  title: import.meta.env.VITE_TITLE || 'Micro Royal',
  version: import.meta.env.VITE_VERSION || '0.0.1',
  canvas: {
    width: parseNumber(import.meta.env.VITE_CANVAS_WIDTH, 960),
    height: parseNumber(import.meta.env.VITE_CANVAS_HEIGHT, 540),
    background: import.meta.env.VITE_CANVAS_BG || '#181824',
  },
  net: {
    apiBase: import.meta.env.VITE_API_BASE,
  },
  physics: {
    collisions: (import.meta.env.VITE_ENABLE_COLLISIONS || 'true') !== 'false',
  },
  balance: {
    playerMaxHp: parseNumber(import.meta.env.VITE_PLAYER_MAX_HP, 100),
    playerSpeed: parseNumber(import.meta.env.VITE_PLAYER_SPEED, 200),
    projectileSpeed: parseNumber(import.meta.env.VITE_PROJECTILE_SPEED, 600),
    fireCooldownMs: parseNumber(import.meta.env.VITE_FIRE_COOLDOWN_MS, 250),
    projectileDamage: parseNumber(import.meta.env.VITE_PROJECTILE_DAMAGE, 10),
  },
  zone: {
    center: { x: parseNumber(import.meta.env.VITE_ZONE_CX, 1000), y: parseNumber(import.meta.env.VITE_ZONE_CY, 1000) },
    initialRadius: parseNumber(import.meta.env.VITE_ZONE_R0, 900),
    tickDamage: parseNumber(import.meta.env.VITE_ZONE_TICK_DMG, 5),
    tickMs: parseNumber(import.meta.env.VITE_ZONE_TICK_MS, 1000),
    plan: [
      { phase: 1, radius: parseNumber(import.meta.env.VITE_ZONE_R1, 600), durationMs: parseNumber(import.meta.env.VITE_ZONE_T1, 20000) },
      { phase: 2, radius: parseNumber(import.meta.env.VITE_ZONE_R2, 350), durationMs: parseNumber(import.meta.env.VITE_ZONE_T2, 20000) },
      { phase: 3, radius: parseNumber(import.meta.env.VITE_ZONE_R3, 180), durationMs: parseNumber(import.meta.env.VITE_ZONE_T3, 20000) },
    ],
  },
};

export { parseNumber };
