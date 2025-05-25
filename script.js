// Confetti animation
function createConfetti() {
    const canvas = document.getElementById('confetti');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confetti = [];
    const confettiCount = 200;
    const gravity = 0.5;
    const terminalVelocity = 5;
    const drag = 0.075;
    const colors = [
        { front: '#ff6b6b', back: '#ff8e8e' },
        { front: '#4ecdc4', back: '#45b7af' },
        { front: '#ffd93d', back: '#ffd93d' },
        { front: '#95e1d3', back: '#95e1d3' },
    ];

    class Confetti {
        constructor(color) {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height - canvas.height;
            this.w = Math.random() * 10 + 5;
            this.h = Math.random() * 5 + 5;
            this.rotation = Math.random() * 2 * Math.PI;
            this.color = color;
            this.velocity = {
                x: Math.random() * 6 - 3,
                y: Math.random() * -15 - 15
            };
        }

        update() {
            this.velocity.x += Math.random() * 0.1 - 0.05;
            this.velocity.y += gravity;
            this.velocity.x *= (1 - drag);
            this.velocity.y *= (1 - drag);

            if (this.velocity.y > terminalVelocity) {
                this.velocity.y = terminalVelocity;
            }

            this.x += this.velocity.x;
            this.y += this.velocity.y;
            this.rotation += 0.01;

            if (this.y > canvas.height) {
                this.y = -10;
                this.velocity.y = Math.random() * -15 - 15;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.fillStyle = this.color.front;
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x + this.w * Math.cos(this.rotation), this.y + this.w * Math.sin(this.rotation));
            ctx.lineTo(this.x + this.w * Math.cos(this.rotation) + this.h * Math.cos(this.rotation + Math.PI / 2), this.y + this.w * Math.sin(this.rotation) + this.h * Math.sin(this.rotation + Math.PI / 2));
            ctx.lineTo(this.x + this.h * Math.cos(this.rotation + Math.PI / 2), this.y + this.h * Math.sin(this.rotation + Math.PI / 2));
            ctx.fill();
        }
    }

    for (let i = 0; i < confettiCount; i++) {
        confetti.push(new Confetti(colors[Math.floor(Math.random() * colors.length)]));
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        confetti.forEach(confetto => {
            confetto.update();
            confetto.draw();
        });
        requestAnimationFrame(animate);
    }

    animate();
}

// Floating hearts animation
function createFloatingHearts() {
    const container = document.getElementById('floatingHearts');
    if (!container) return;

    const colors = ['#ff6b6b', '#ff8e8e', '#ffd93d', '#95e1d3'];
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 2 + 's';
        heart.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        container.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 5000);
    }

    setInterval(createHeart, 300);
}

// Celebration button handler
function startCelebration() {
    createConfetti();
    const button = document.querySelector('.celebration-button');
    if (button) {
        button.textContent = '🎉 Happy Birthday! 🎉';
        button.disabled = true;
    }
}

// Initialize animations when the page loads
document.addEventListener('DOMContentLoaded', () => {
    createFloatingHearts();
    
    // Add click event to the flame to blow out the candle
    const flame = document.querySelector('.flame');
    if (flame) {
        flame.addEventListener('click', () => {
            flame.style.display = 'none';
            startCelebration();
        });
    }
}); 