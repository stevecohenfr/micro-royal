const app = document.getElementById('app') as HTMLDivElement;
const bootMsg = document.getElementById('boot-msg') as HTMLDivElement | null;

// Minimal bootstrap: create a canvas and draw a title.
const canvas = document.createElement('canvas');
canvas.width = 960;
canvas.height = 540;
app.appendChild(canvas);

const ctx = canvas.getContext('2d');
if (ctx) {
  ctx.fillStyle = '#181824';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#e6e6e6';
  ctx.font = '24px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Micro Royal — Bootstrap OK', canvas.width / 2, canvas.height / 2);
}

if (bootMsg) bootMsg.remove();

// Export a no-op to keep module shape for future hot reload hooks.
export {}; 

