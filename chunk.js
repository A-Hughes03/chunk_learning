export class Chunk {
    constructor(chunkX, chunkY, tileSize, chunkSize) {
        this.chunkX = chunkX;
        this.chunkY = chunkY;
        this.tileSize = tileSize;
        this.chunkSize = chunkSize;
        this.tiles = [];
        this.dirty = false;

        this.generateTiles();
    }

    generateTiles() {
        this.tiles = [];

        for (let x = 0; x < this.chunkSize; x++) {
            this.tiles[x] = [];
            for (let y = 0; y < this.chunkSize; y++) {
                const worldX = this.chunkX * this.chunkSize + x;
                const worldY = this.chunkY * this.chunkSize + y;
                this.tiles[x][y] = this.getBaseTile(worldX, worldY);
            }
        }
    }

    getBaseTile(worldX, worldY) {
        return (worldX + worldY) % 2 === 0 ? "grass" : "dirt";
    }

    setTile(x, y, type) {
        this.tiles[x][y] = type;
        this.dirty = true;
    }

    render(ctx, offsetX = 0, offsetY = 0) {
        for (let x = 0; x < this.chunkSize; x++) {
            for (let y = 0; y < this.chunkSize; y++) {
                const tile = this.tiles[x][y];
                ctx.fillStyle = tile === "grass" ? "#3c9d3c" : "#8b5a2b";
                ctx.fillRect(
                    offsetX + x * this.tileSize,
                    offsetY + y * this.tileSize,
                    this.tileSize,
                    this.tileSize
                );
            }
        }
    }

}