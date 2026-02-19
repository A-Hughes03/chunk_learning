import { Chunk } from "./chunk.js";

export class World {
    constructor(chunkSize, tileSize, viewDistance = 2) {
        this.chunks = new Map();
        this.chunkSize = chunkSize;
        this.tileSize = tileSize;
        this.viewDistance = viewDistance;
    }

    #key(chunkX, chunkY) {
        return `${chunkX},${chunkY}`;
    }

    getChunk(chunkX, chunkY) {
        return this.chunks.get(this.#key(chunkX, chunkY));
    }

    getTile(worldX, worldY) {
        const chunkX = Math.floor(worldX / (this.chunkSize * this.tileSize));
        const chunkY = Math.floor(worldY / (this.chunkSize * this.tileSize));
        const chunk = this.getChunk(chunkX, chunkY);
        if (!chunk) return null;

        const tileX = Math.floor((worldX % (this.chunkSize * this.tileSize)) / this.tileSize);
        const tileY = Math.floor((worldY % (this.chunkSize * this.tileSize)) / this.tileSize);
        return chunk.tiles[tileX][tileY];
    }

    setTile(worldX, worldY, tile) {
        const chunkX = Math.floor(worldX / (this.chunkSize * this.tileSize));
        const chunkY = Math.floor(worldY / (this.chunkSize * this.tileSize));
        let chunk = this.loadChunk(chunkX, chunkY);

        const localX = Math.floor((worldX % (this.chunkSize * this.tileSize)) / this.tileSize);
        const localY = Math.floor((worldY % (this.chunkSize * this.tileSize)) / this.tileSize);
        chunk.setTile(localX, localY, tile);
    }

    loadChunk(chunkX, chunkY) {
        const key = this.#key(chunkX, chunkY);
        if (!this.chunks.has(key)) {
            this.chunks.set(key, new Chunk(chunkX, chunkY, this.tileSize, this.chunkSize));
        }
        return this.chunks.get(key);
    }

    unloadChunk(chunkX, chunkY) {
        this.chunks.delete(this.#key(chunkX, chunkY));
    }

    loadChunksAroundPlayer(playerX, playerY) {
        const playerChunkX = Math.floor(playerX / (this.chunkSize * this.tileSize));
        const playerChunkY = Math.floor(playerY / (this.chunkSize * this.tileSize));

        for (let dx = -this.viewDistance; dx <= this.viewDistance; dx++) {
            for (let dy = -this.viewDistance; dy <= this.viewDistance; dy++) {
                this.loadChunk(playerChunkX + dx, playerChunkY + dy);
            }
        }
    }

    unloadDistantChunks(playerX, playerY) {
        const playerChunkX = Math.floor(playerX / (this.chunkSize * this.tileSize));
        const playerChunkY = Math.floor(playerY / (this.chunkSize * this.tileSize));

        for (let key of this.chunks.keys()) {
            const [chunkX, chunkY] = key.split(",").map(Number);
            const distanceX = Math.abs(chunkX - playerChunkX);
            const distanceY = Math.abs(chunkY - playerChunkY);

            if (distanceX > this.viewDistance + 1 || distanceY > this.viewDistance + 1) {
                this.unloadChunk(chunkX, chunkY);
            }
        }
    }

    render(ctx, playerX, playerY, canvasWidth, canvasHeight) {
        for (let chunk of this.chunks.values()) {
            const offsetX = canvasWidth / 2 - playerX + chunk.chunkX * this.chunkSize * this.tileSize;
            const offsetY = canvasHeight / 2 - playerY + chunk.chunkY * this.chunkSize * this.tileSize;
            chunk.render(ctx, offsetX, offsetY);
        }
    }
}