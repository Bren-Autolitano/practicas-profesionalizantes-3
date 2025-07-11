let canvas = document.createElement('canvas');
canvas.width = 400;
canvas.height = 400;
document.body.appendChild(canvas);

let ctx = canvas.getContext('2d');

class Rectangulo {
    constructor(x, y, width, height, angle = 0) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.angle = angle;
    }

    draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = 'lightblue';
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);

        ctx.lineWidth = 3;
        ctx.strokeStyle = 'purple';
        ctx.strokeRect(-this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
    }

    rotate(deltaAngle) {
        this.angle += deltaAngle;
        this.draw();
    }

    moveForward(speed) {
        const dx = Math.cos(this.angle) * speed;
        const dy = Math.sin(this.angle) * speed;
        this.x += dx;
        this.y += dy;
        this.draw();
    }

    moveBackward(speed) {
        const dx = Math.cos(this.angle) * speed;
        const dy = Math.sin(this.angle) * speed;
        this.x -= dx;
        this.y -= dy;
        this.draw();
    }
}

class RectangleController {
    constructor(rectangle) {
        this.rectangle = rectangle;
        this.speed = 5;
        this.rotationSpeed = 0.1;
        this.listenToKeys();
    }

    listenToKeys() {
        window.addEventListener('keydown', (event) => {
            switch(event.key) {
                case 'ArrowUp':
                    this.rectangle.moveForward(this.speed);
                    break;
                case 'ArrowDown':
                    this.rectangle.moveBackward(this.speed);
                    break;
                case 'ArrowLeft':
                    this.rectangle.rotate(-this.rotationSpeed);
                    break;
                case 'ArrowRight':
                    this.rectangle.rotate(this.rotationSpeed);
                    break;
            }
        });
    }
}

function main() {
    const auto = new Rectangulo(200, 200, 100, 50);
    auto.draw();
    new RectangleController(auto);
}

window.onload = main;
