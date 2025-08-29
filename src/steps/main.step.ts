import { Board, Entities, GameStep, Timer } from '@fuwu-yuan/bgew';
import { InputManager } from '@/core/input';
import { config } from '@/config';
import { createBeepWavDataUri } from '@/utils/audio';

export class MainStep extends GameStep {
  name = 'main';
  private titleEntity: Entities.Label;
  private box: Entities.Rectangle;
  private box2: Entities.Rectangle;
  private vx = 120; // px/s
  private vy = 80; // px/s
  private blink?: Timer;
  private input!: InputManager;
  private playerImage?: Entities.Image;

  constructor(board: Board) {
    super(board);
    this.titleEntity = new Entities.Label(0, 0, this.board.name, this.board.ctx);
    this.titleEntity.fontSize = 48;
    this.titleEntity.x = this.board.width / 2 - this.titleEntity.width / 2;
    this.titleEntity.y = this.board.height / 2 - this.titleEntity.height / 2;
    this.board.addEntity(this.titleEntity);

    // Simple moving rectangle to exercise update/draw hooks
    this.box = new Entities.Rectangle(100, 100, 80, 40, '#5b5bd6', '#2a2a6a');
    this.board.addEntity(this.box);

    this.box2 = new Entities.Rectangle(300, 220, 60, 60, '#d66b5b', '#6a2a2a');
    this.board.addEntity(this.box2);

    // Placeholder player sprite image
    this.playerImage = new Entities.Image('/assets/player.svg', 20, 20, 32, 32);
    this.board.addEntity(this.playerImage);
  }

  onEnter(_data: any): void {
    this.board.onMouseEvent('mousemove', (_event, x, y) => {
      this.titleEntity.x = x - this.titleEntity.width / 2;
      this.titleEntity.y = y - this.titleEntity.height;
    });

    // Blink the title color every second (repeat timer)
    let toggle = false;
    this.blink = this.addTimer(1000, () => {
      toggle = !toggle;
      this.titleEntity.fontColor = toggle ? '#ffd166' : '#e6e6e6';
    }, true);

    this.input = new InputManager({
      onKeyboardEvent: (ev, cb) => this.board.onKeyboardEvent(ev, cb),
      onMouseEvent: (ev, cb) => this.board.onMouseEvent(ev, cb),
    });

    // Register and play simple sounds (BGM loop + SFX on click)
    (async () => {
      const [bgm, sfx] = await Promise.all([
        createBeepWavDataUri(800, 220),
        createBeepWavDataUri(150, 880),
      ]);
      this.board.registerSound('bgm/loop', bgm, true, 0.1);
      this.board.registerSound('sfx/beep', sfx, false, 0.5);
      this.board.playSound('bgm/loop', true, 0.1);
    })();

    this.board.onMouseEvent('click', () => {
      this.board.playSound('sfx/beep', false, 0.6);
    });
  }

  onLeave(): void {}
  update(delta: number) {
    // Keyboard: ZQSD/WSAD arrows to move box; otherwise autonomous movement
    const speed = 180;
    let moved = false;
    if (this.input) {
      const left = this.input.isDown('arrowleft') || this.input.isDown('a') || this.input.isDown('q');
      const right = this.input.isDown('arrowright') || this.input.isDown('d');
      const up = this.input.isDown('arrowup') || this.input.isDown('w') || this.input.isDown('z');
      const down = this.input.isDown('arrowdown') || this.input.isDown('s');
      const dx = (Number(right) - Number(left)) * speed * (delta / 1000);
      const dy = (Number(down) - Number(up)) * speed * (delta / 1000);
      if (dx !== 0 || dy !== 0) {
        this.box.x += dx;
        this.box.y += dy;
        moved = true;
      }
    }
    if (!moved) {
      this.box.x += (this.vx * delta) / 1000;
      this.box.y += (this.vy * delta) / 1000;
    }
    if (this.box.x <= 0 || this.box.x + this.box.width >= this.board.width) this.vx *= -1;
    if (this.box.y <= 0 || this.box.y + this.box.height >= this.board.height) this.vy *= -1;

    // Move second box automatically
    this.box2.x -= (this.vx * delta) / 1000;
    this.box2.y += (this.vy * delta) / 1000;
    if (this.box2.x <= 0 || this.box2.x + this.box2.width >= this.board.width) this.vx *= -1;
    if (this.box2.y <= 0 || this.box2.y + this.box2.height >= this.board.height) this.vy *= -1;

    // Collisions toggle (simple AABB demo)
    if (config.physics.collisions && this.overlap(this.box, this.box2)) {
      // basic bounce
      this.vx *= -1; this.vy *= -1;
      const c1 = this.box.fillColor; this.box.fillColor = this.box2.fillColor; this.box2.fillColor = c1;
    }

    // Camera follow the first box (centered)
    const cx = this.box.x + this.box.width / 2 - this.board.width / 2;
    const cy = this.box.y + this.box.height / 2 - this.board.height / 2;
    this.camera.x = Math.max(0, cx);
    this.camera.y = Math.max(0, cy);
  }

  draw(): void {
    // Overlay small debug text (dt is not passed here, so keep simple info)
    const ctx = this.board.ctx;
    ctx.save();
    ctx.fillStyle = '#9aa0a6';
    ctx.font = '12px system-ui, sans-serif';
    ctx.fillText(`Entities: ${this.board.countEntities()} | Collisions: ${String(config.physics.collisions)}`, 8, 16);
    ctx.restore();
  }

  private overlap(a: Entities.Rectangle, b: Entities.Rectangle) {
    return !(a.x + a.width < b.x || a.x > b.x + b.width || a.y + a.height < b.y || a.y > b.y + b.height);
  }
}
