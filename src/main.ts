import { Board } from '@fuwu-yuan/bgew';
import { LobbyStep } from './steps/lobby.step';
import { MatchStep } from './steps/match.step';
import { EndStep } from './steps/end.step';
import { config } from './config';

const app = document.getElementById('app') as HTMLDivElement;
const startOverlay = document.getElementById('start-overlay') as HTMLDivElement | null;
const startBtn = document.getElementById('start-btn') as HTMLButtonElement | null;

// Initialize BGEW board on demand (on Start click)
const boot = () => {
  const { title, version, canvas, physics } = config;
  const board = new Board(title, version, canvas.width, canvas.height, app, canvas.background, undefined, physics.collisions);
  const lobby = new LobbyStep(board);
  const match = new MatchStep(board);
  const end = new EndStep(board);
  board.addSteps([lobby, match, end]);
  board.step = lobby;
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
