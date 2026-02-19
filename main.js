import { Player } from "./player.js";
import { Chunk } from "./chunk.js";
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

const testChunk = new Chunk(0, 0, 32, 16);

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    testChunk.render(ctx, 0, 0);

    player.updatePosition();
    player.render(ctx);

    requestAnimationFrame(gameLoop);
}

gameLoop();
