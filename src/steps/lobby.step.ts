import { Board, Entities, GameStep } from '@fuwu-yuan/bgew';

export class LobbyStep extends GameStep {
  name = 'lobby';
  private title!: Entities.Label;
  private input!: Entities.Inputtext;
  private button!: Entities.Button;

  constructor(board: Board) {
    super(board);
  }

  onEnter(_data: any): void {
    const w = this.board.width;
    const y0 = this.board.height / 2 - 60;
    this.title = new Entities.Label(0, 80, 'Micro Royal — Lobby', this.board.ctx);
    this.title.fontSize = 32;
    this.title.x = w / 2 - this.title.width / 2;
    this.board.addEntity(this.title);

    this.input = new Entities.Inputtext(w / 2 - 160, y0, 320, 40, '');
    this.input.placeholder = 'Votre pseudo…';
    this.board.addEntity(this.input);

    this.button = new Entities.Button(w / 2 - 80, y0 + 60, 160, 40, 'Prêt');
    this.board.addEntity(this.button);

    this.board.onMouseEvent('click', () => {
      if (this.button.clicked) {
        const name = (this.input.text || 'Player').trim() || 'Player';
        this.board.moveToStep('match', { name });
      }
    });
  }

  onLeave(): void {
    // Cleanup is handled by Board.reset when moving steps (entities removed)
  }

  update(_delta: number): void {}
  draw(): void {}
}

