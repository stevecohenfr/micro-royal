import { Board, Entities, GameStep, Timer } from '@fuwu-yuan/bgew';

export class MainStep extends GameStep {
  name = 'main';
  private titleEntity: Entities.Label;
  private box: Entities.Rectangle;
  private vx = 120; // px/s
  private vy = 80; // px/s
  private blink?: Timer;

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
  }

  onLeave(): void {}
  update(delta: number) {
    // Move the rectangle and bounce on borders
    this.box.x += (this.vx * delta) / 1000;
    this.box.y += (this.vy * delta) / 1000;
    if (this.box.x <= 0 || this.box.x + this.box.width >= this.board.width) this.vx *= -1;
    if (this.box.y <= 0 || this.box.y + this.box.height >= this.board.height) this.vy *= -1;
  }

  draw(): void {
    // Overlay small debug text (dt is not passed here, so keep simple info)
    const ctx = this.board.ctx;
    ctx.save();
    ctx.fillStyle = '#9aa0a6';
    ctx.font = '12px system-ui, sans-serif';
    ctx.fillText(`Entities: ${this.board.countEntities()}`, 8, 16);
    ctx.restore();
  }
}
