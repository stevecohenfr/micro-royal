import { Board, Entities, GameStep } from '@fuwu-yuan/bgew';
import { InputManager } from '@/core/input';
import { config } from '@/config';
import { createBeepWavDataUri } from '@/utils/audio';

type Player = {
  name: string;
  hp: number;
  body: Entities.Rectangle;
};

type Bullet = {
  body: Entities.Oval | Entities.Rectangle;
  vx: number;
  vy: number;
  ttl: number;
};

export class MatchStep extends GameStep {
  name = 'match';
  private input!: InputManager;
  private player!: Player;
  private obstacles: Entities.Rectangle[] = [];
  private bullets: Bullet[] = [];
  private lastShot = 0;
  private sfx: { shoot?: string; hit?: string; death?: string } = {};

  constructor(board: Board) {
    super(board);
  }

  async onEnter(data: any): Promise<void> {
    // World setup
    this.input = new InputManager({
      onKeyboardEvent: (ev, cb) => this.board.onKeyboardEvent(ev, cb),
      onMouseEvent: (ev, cb) => this.board.onMouseEvent(ev, cb),
    });

    const { balance } = config;
    // Player
    const body = new Entities.Rectangle(300, 300, 28, 28, '#6cf', '#249');
    this.player = { name: (data?.name || 'Player') as string, hp: balance.playerMaxHp, body };
    this.board.addEntity(body);

    // Obstacles
    const rect = (x: number, y: number, w: number, h: number) => {
      const r = new Entities.Rectangle(x, y, w, h, '#444', '#222');
      this.obstacles.push(r);
      this.board.addEntity(r);
    };
    // Static arena obstacles within ~2000x2000
    for (let i = 0; i < 8; i++) rect(200 + i * 180, 600, 100, 30);
    for (let i = 0; i < 6; i++) rect(1000, 300 + i * 200, 30, 120);
    rect(1600, 1600, 150, 150);

    // Sounds
    const [shoot, hit, death] = await Promise.all([
      createBeepWavDataUri(80, 1400),
      createBeepWavDataUri(80, 300),
      createBeepWavDataUri(300, 120),
    ]);
    this.sfx.shoot = 'sfx/shoot';
    this.sfx.hit = 'sfx/hit';
    this.sfx.death = 'sfx/death';
    this.board.registerSound(this.sfx.shoot, shoot, false, 0.4);
    this.board.registerSound(this.sfx.hit, hit, false, 0.4);
    this.board.registerSound(this.sfx.death, death, false, 0.5);

    // Shoot on click or spacebar
    this.board.onMouseEvent('click', (e, x, y) => this.tryShootTowards(x, y));
    this.board.onKeyboardEvent('keydown', (e) => {
      if (e.key.toLowerCase() === ' ') this.tryShootTowards(this.input.mouse.x, this.input.mouse.y);
    });
  }

  onLeave(): void {}

  update(delta: number): void {
    const { playerSpeed } = config.balance;
    const p = this.player.body;
    // Movement
    const left = this.input.isDown('arrowleft') || this.input.isDown('a') || this.input.isDown('q');
    const right = this.input.isDown('arrowright') || this.input.isDown('d');
    const up = this.input.isDown('arrowup') || this.input.isDown('w') || this.input.isDown('z');
    const down = this.input.isDown('arrowdown') || this.input.isDown('s');
    const dt = delta / 1000;
    p.x += (Number(right) - Number(left)) * playerSpeed * dt;
    p.y += (Number(down) - Number(up)) * playerSpeed * dt;

    // Camera center on player
    this.camera.x = p.x + p.width / 2 - this.board.width / 2;
    this.camera.y = p.y + p.height / 2 - this.board.height / 2;

    // Bullets update
    for (const b of this.bullets) {
      b.body.x += b.vx * dt;
      b.body.y += b.vy * dt;
      b.ttl -= delta;
    }
    // Bullet collisions and lifetime
    const alive: Bullet[] = [];
    for (const b of this.bullets) {
      const hitObstacle = this.obstacles.some((o) => this.overlapRect(b.body, o));
      const hitPlayer = this.overlapRect(b.body, p);
      if (hitPlayer) {
        this.applyDamage(config.balance.projectileDamage);
        this.board.playSound(this.sfx.hit!, false, 0.6);
      }
      if (!hitObstacle && !hitPlayer && b.ttl > 0) alive.push(b);
      else this.board.removeEntity(b.body);
    }
    this.bullets = alive;
  }

  draw(): void {
    // HUD
    const ctx = this.board.ctx;
    ctx.save();
    ctx.fillStyle = '#e6e6e6';
    ctx.font = '14px system-ui, sans-serif';
    ctx.fillText(`${this.player.name}  HP: ${this.player.hp}`, 10, 20);
    ctx.fillText(`Ammo: ∞  DMG: ${config.balance.projectileDamage}`, 10, 38);
    ctx.restore();
  }

  private tryShootTowards(x: number, y: number) {
    const now = performance.now();
    if (now - this.lastShot < config.balance.fireCooldownMs) return;
    this.lastShot = now;
    const p = this.player.body;
    const cx = p.x + p.width / 2;
    const cy = p.y + p.height / 2;
    const dx = x - cx;
    const dy = y - cy;
    const len = Math.hypot(dx, dy) || 1;
    const vx = (dx / len) * config.balance.projectileSpeed;
    const vy = (dy / len) * config.balance.projectileSpeed;
    const bullet = new Entities.Oval(cx - 3, cy - 3, 6, 6, '#ffdd55', '#ffaa00');
    this.board.addEntity(bullet);
    this.bullets.push({ body: bullet, vx, vy, ttl: 1200 });
    this.board.playSound(this.sfx.shoot!, false, 0.5);
  }

  private overlapRect(a: Entities.Rectangle | Entities.Oval, b: Entities.Rectangle) {
    const aw = (a as any).width ?? 6;
    const ah = (a as any).height ?? 6;
    return !(
      (a as any).x + aw < b.x ||
      (a as any).x > b.x + b.width ||
      (a as any).y + ah < b.y ||
      (a as any).y > b.y + b.height
    );
  }

  private applyDamage(amount: number) {
    this.player.hp = Math.max(0, this.player.hp - amount);
    if (this.player.hp <= 0) {
      this.board.playSound(this.sfx.death!, false, 0.8);
      // Move to end after a small delay
      this.addTimer(800, () => this.board.moveToStep('end', { message: 'K.O.' }));
    }
  }
}

