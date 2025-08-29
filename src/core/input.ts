export class InputManager {
  private keys = new Set<string>();
  public mouse = { x: 0, y: 0 };

  constructor(private listen: {
    onKeyboardEvent: (ev: 'keyup'|'keydown'|'keypress'|'all', cb: (e: KeyboardEvent)=>void) => void,
    onMouseEvent: (ev: 'mousemove'|'all'|'click'|'dblclick'|'contextmenu'|'mousedown'|'mouseup'|'mouseenter'|'mouseleave', cb: (e: MouseEvent, x: number, y: number)=>void) => void,
  }) {
    this.listen.onKeyboardEvent('keydown', (e) => this.keys.add(e.key.toLowerCase()));
    this.listen.onKeyboardEvent('keyup',   (e) => this.keys.delete(e.key.toLowerCase()));
    this.listen.onMouseEvent('mousemove', (_e, x, y) => { this.mouse.x = x; this.mouse.y = y; });
  }

  isDown(key: string) {
    return this.keys.has(key.toLowerCase());
  }
}

