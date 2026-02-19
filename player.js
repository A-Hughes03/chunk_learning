export class Player {
    constructor(canvas) {
        this.canvas = canvas;
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;

        // Size and speed scale with canvas size
        this.size = Math.min(canvas.width, canvas.height) * 0.02;
        this.speed = Math.min(Math.min(canvas.width, canvas.height) * 0.005, 5);
        this.color = "#5b8fc9";

        this.keys = {};
    }

    handleKey(key, isPressed) {
        this.keys[key] = isPressed;
    }

    clampPosition() {
        this.x = Math.max(this.size / 2, Math.min(this.canvas.width - this.size / 2, this.x));
        this.y = Math.max(this.size / 2, Math.min(this.canvas.height - this.size / 2, this.y));
    }

    updatePosition() {
        if (this.keys['ArrowUp'] || this.keys['w']) this.y -= this.speed;
        if (this.keys['ArrowDown'] || this.keys['s']) this.y += this.speed;
        if (this.keys['ArrowLeft'] || this.keys['a']) this.x -= this.speed;
        if (this.keys['ArrowRight'] || this.keys['d']) this.x += this.speed;

        this.clampPosition();
    }

    render(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(
            this.x - this.size / 2,
            this.y - this.size / 2,
            this.size,
            this.size
        );
    }

    resize() {
        this.size = Math.min(this.canvas.width, this.canvas.height) * 0.02;
        this.speed = Math.min(this.canvas.width, this.canvas.height) * 0.01;
    }

}