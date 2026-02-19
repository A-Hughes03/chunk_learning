import { Player } from "./player.js";
import { World } from "./world.js";
import { setupInput } from "./input.js";

const CHUNK_SIZE = 16;
const TILE_SIZE = 32;
const VIEW_DISTANCE = 2;

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player = new Player(canvas);
setupInput(player);

const world = new World(CHUNK_SIZE, TILE_SIZE, VIEW_DISTANCE);

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    player.resize();
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();


function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    world.loadChunksAroundPlayer(player.x, player.y);
    world.unloadDistantChunks(player.x, player.y);

    world.render(ctx, player.x, player.y, canvas.width, canvas.height);

    player.updatePosition();
    player.render(ctx);

    requestAnimationFrame(gameLoop);
}

gameLoop();
