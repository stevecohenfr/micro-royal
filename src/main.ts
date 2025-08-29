import { Board } from '@fuwu-yuan/bgew';
import { MainStep } from './steps/main.step';
import { config } from './config';

const app = document.getElementById('app') as HTMLDivElement;
const startOverlay = document.getElementById('start-overlay') as HTMLDivElement | null;
const startBtn = document.getElementById('start-btn') as HTMLButtonElement | null;

// Initialize BGEW board on demand (on Start click)
const boot = () => {
  const { title, version, canvas, physics } = config;
  const board = new Board(title, version, canvas.width, canvas.height, app, canvas.background, undefined, physics.collisions);
  const mainStep = new MainStep(board);
  board.step = mainStep;
  board.addSteps([mainStep]);
  board.start();
};

if (startBtn) {
  startBtn.addEventListener('click', () => {
    startOverlay?.remove();
    boot();
  });
} else {
  // Fallback for cases without overlay
  boot();
}

// Export a no-op to keep module shape for future hot reload hooks.
export {}; 
