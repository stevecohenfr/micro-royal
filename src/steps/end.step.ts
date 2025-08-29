import { Board, Entities, GameStep } from '@fuwu-yuan/bgew';

export class EndStep extends GameStep {
  name = 'end';
  private title!: Entities.Label;
  private sub!: Entities.Label;
  private btn!: Entities.Button;

  constructor(board: Board) {
    super(board);
  }

  onEnter(data: any): void {
    const w = this.board.width;
    this.title = new Entities.Label(0, 120, data?.message || 'Fin de partie', this.board.ctx);
    this.title.fontSize = 36;
    this.title.x = w / 2 - this.title.width / 2;
    this.board.addEntity(this.title);

    this.sub = new Entities.Label(0, 170, 'Retour Lobby pour rejouer', this.board.ctx);
    this.sub.fontSize = 18;
    this.sub.x = w / 2 - this.sub.width / 2;
    this.board.addEntity(this.sub);

    this.btn = new Entities.Button(w / 2 - 90, 220, 180, 44, 'Retour Lobby');
    this.board.addEntity(this.btn);

    this.board.onMouseEvent('click', () => {
      if (this.btn.clicked) this.board.moveToStep('lobby', {});
    });
  }

  onLeave(): void {}
  update(_delta: number): void {}
  draw(): void {}
}

