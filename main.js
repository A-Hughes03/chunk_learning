import { Player } from "./player.js";
import { setupInput } from "./input.js";

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player = new Player(canvas);
setupInput(player);

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    player.resize();
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.updatePosition();
    player.render(ctx);
    requestAnimationFrame(gameLoop);
}

gameLoop();
