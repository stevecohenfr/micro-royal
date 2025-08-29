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
};

export { parseNumber };
