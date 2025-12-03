// ============================================
// LOGICAL CANVAS ANIMATION - MATHEMATICAL
// ============================================
class LogicalAnimation {
    constructor() {
        this.canvas = document.getElementById('logical-canvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.equations = [];
        this.binaryDigits = [];
        
        this.mathSymbols = ['π', 'Σ', '∫', '∞', 'α', 'β', 'γ', 'θ', 'λ', 'ω', '∂', '√', '±', '≠', '≈', '≤', '≥'];
        this.mathEquations = [
            'E=mc²',
            'a²+b²=c²',
            'F=ma',
            '∫f(x)dx',
            'lim x→∞',
            'dy/dx',
            'Σn²',
            'log(x)',
            'sin²+cos²=1',
            'eⁱᵖ+1=0'
        ];
        
        this.resize();
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        const parent = this.canvas.parentElement;
        this.canvas.width = parent.offsetWidth;
        this.canvas.height = parent.offsetHeight;
        this.init();
    }
    
    init() {
        this.particles = [];
        this.equations = [];
        this.binaryDigits = [];
        
        // Binary rain effect
        const cols = Math.floor(this.canvas.width / 30);
        for (let i = 0; i < cols; i++) {
            this.binaryDigits.push({
                x: i * 30 + 15,
                y: Math.random() * this.canvas.height,
                speed: Math.random() * 1 + 0.5,
                value: Math.random() > 0.5 ? '1' : '0',
                opacity: Math.random() * 0.5 + 0.3,
                size: Math.random() * 8 + 12
            });
        }
        
        // Floating equations
        for (let i = 0; i < 8; i++) {
            this.equations.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                text: this.mathEquations[Math.floor(Math.random() * this.mathEquations.length)],
                size: Math.random() * 8 + 16,
                opacity: Math.random() * 0.4 + 0.2,
                rotation: Math.random() * 0.2 - 0.1
            });
        }
        
        // Math symbols grid
        for (let i = 0; i < 15; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                symbol: this.mathSymbols[Math.floor(Math.random() * this.mathSymbols.length)],
                size: Math.random() * 10 + 18,
                opacity: Math.random() * 0.3 + 0.2,
                pulseOffset: Math.random() * Math.PI * 2,
                vx: (Math.random() - 0.5) * 0.2,
                vy: (Math.random() - 0.5) * 0.2
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        const time = Date.now() * 0.001;
        
        // Draw grid pattern
        this.drawGrid();
        
        // Draw binary rain
        this.ctx.font = '14px "Courier New", monospace';
        this.ctx.textAlign = 'center';
        this.binaryDigits.forEach(digit => {
            digit.y += digit.speed;
            
            if (digit.y > this.canvas.height + 20) {
                digit.y = -20;
                digit.value = Math.random() > 0.5 ? '1' : '0';
            }
            
            this.ctx.fillStyle = `rgba(203, 213, 224, ${digit.opacity})`;
            this.ctx.fillText(digit.value, digit.x, digit.y);
        });
        
        // Draw floating equations
        this.equations.forEach(eq => {
            eq.x += eq.vx;
            eq.y += eq.vy;
            
            // Boundary check
            if (eq.x < -100) eq.x = this.canvas.width + 100;
            if (eq.x > this.canvas.width + 100) eq.x = -100;
            if (eq.y < -50) eq.y = this.canvas.height + 50;
            if (eq.y > this.canvas.height + 50) eq.y = -50;
            
            this.ctx.save();
            this.ctx.translate(eq.x, eq.y);
            this.ctx.rotate(eq.rotation);
            this.ctx.font = `${eq.size}px 'Orbitron', monospace`;
            this.ctx.fillStyle = `rgba(160, 174, 192, ${eq.opacity})`;
            this.ctx.textAlign = 'center';
            this.ctx.fillText(eq.text, 0, 0);
            this.ctx.restore();
        });
        
        // Draw math symbols with pulse
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Boundary bounce
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            const pulse = Math.sin(time * 2 + particle.pulseOffset) * 0.3 + 0.7;
            const currentSize = particle.size * pulse;
            
            this.ctx.font = `${currentSize}px 'Orbitron', serif`;
            this.ctx.fillStyle = `rgba(226, 232, 240, ${particle.opacity * pulse})`;
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(particle.symbol, particle.x, particle.y);
        });
        
        // Draw geometric patterns
        this.drawGeometricPatterns(time);
        
        requestAnimationFrame(() => this.animate());
    }
    
    drawGrid() {
        this.ctx.strokeStyle = 'rgba(160, 174, 192, 0.08)';
        this.ctx.lineWidth = 1;
        
        const gridSize = 60;
        
        for (let x = 0; x < this.canvas.width; x += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }
        
        for (let y = 0; y < this.canvas.height; y += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }
    }
    
    drawGeometricPatterns(time) {
        // Draw rotating triangles
        this.ctx.strokeStyle = 'rgba(203, 213, 224, 0.15)';
        this.ctx.lineWidth = 1.5;
        
        for (let i = 0; i < 3; i++) {
            const centerX = (this.canvas.width / 4) * (i + 1);
            const centerY = (this.canvas.height / 4) * (i + 1.5);
            const size = 40 + i * 20;
            const rotation = time * 0.3 + i * Math.PI / 3;
            
            this.ctx.save();
            this.ctx.translate(centerX, centerY);
            this.ctx.rotate(rotation);
            
            this.ctx.beginPath();
            for (let j = 0; j < 3; j++) {
                const angle = (j / 3) * Math.PI * 2 - Math.PI / 2;
                const x = Math.cos(angle) * size;
                const y = Math.sin(angle) * size;
                if (j === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            }
            this.ctx.closePath();
            this.ctx.stroke();
            
            this.ctx.restore();
        }
    }
}

// ============================================
// CREATIVE CANVAS ANIMATION - PREMIUM
// ============================================
class CreativeAnimation {
    constructor() {
        this.canvas = document.getElementById('creative-canvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.shapes = [];
        
        this.resize();
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        const parent = this.canvas.parentElement;
        this.canvas.width = parent.offsetWidth;
        this.canvas.height = parent.offsetHeight;
        this.init();
    }
    
    init() {
        this.shapes = [];
        
        // Create organic flowing shapes
        for (let i = 0; i < 6; i++) {
            this.shapes.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 80 + 60,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                hue: 260 + Math.random() * 30, // Purple range
                pulseOffset: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.01
            });
        }
    }
    
    animate() {
        // Create smooth trail effect
        this.ctx.fillStyle = 'rgba(15, 20, 25, 0.12)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        const time = Date.now() * 0.001;
        
        // Draw flowing organic shapes
        this.shapes.forEach((shape, index) => {
            // Update position
            shape.x += shape.vx;
            shape.y += shape.vy;
            
            // Boundary check with smooth bounce
            if (shape.x < 0 || shape.x > this.canvas.width) {
                shape.vx *= -1;
                shape.x = Math.max(0, Math.min(this.canvas.width, shape.x));
            }
            if (shape.y < 0 || shape.y > this.canvas.height) {
                shape.vy *= -1;
                shape.y = Math.max(0, Math.min(this.canvas.height, shape.y));
            }
            
            // Pulsing effect
            const pulse = Math.sin(time * 1.5 + shape.pulseOffset) * 0.3 + 1;
            const currentRadius = shape.radius * pulse;
            
            // Draw multiple layers for depth
            for (let layer = 3; layer >= 1; layer--) {
                const layerRadius = currentRadius * (layer * 0.4);
                const layerOpacity = 0.15 / layer;
                
                const gradient = this.ctx.createRadialGradient(
                    shape.x, shape.y, 0,
                    shape.x, shape.y, layerRadius
                );
                
                gradient.addColorStop(0, `hsla(${shape.hue}, 70%, 70%, ${layerOpacity * 1.5})`);
                gradient.addColorStop(0.5, `hsla(${shape.hue}, 65%, 60%, ${layerOpacity})`);
                gradient.addColorStop(1, `hsla(${shape.hue}, 60%, 50%, 0)`);
                
                this.ctx.fillStyle = gradient;
                this.ctx.beginPath();
                this.ctx.arc(shape.x, shape.y, layerRadius, 0, Math.PI * 2);
                this.ctx.fill();
            }
        });
        
        // Draw elegant flowing curves
        this.drawFlowingCurves(time);
        
        // Draw particle trails
        this.drawParticleTrails(time);
        
        requestAnimationFrame(() => this.animate());
    }
    
    drawFlowingCurves(time) {
        for (let i = 0; i < 3; i++) {
            this.ctx.beginPath();
            this.ctx.strokeStyle = `hsla(${270 + i * 15}, 60%, 65%, 0.12)`;
            this.ctx.lineWidth = 3;
            
            for (let x = 0; x <= this.canvas.width; x += 20) {
                const y = Math.sin(x * 0.008 + time * 0.6 + i * 1.2) * 50 +
                          Math.cos(x * 0.012 - time * 0.4) * 30 +
                          this.canvas.height / 2;
                
                if (x === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            }
            
            this.ctx.stroke();
        }
    }
    
    drawParticleTrails(time) {
        const trailCount = 12;
        
        for (let i = 0; i < trailCount; i++) {
            const angle = (i / trailCount) * Math.PI * 2 + time * 0.3;
            const radius = 100 + Math.sin(time * 2 + i) * 50;
            const x = this.canvas.width / 2 + Math.cos(angle) * radius;
            const y = this.canvas.height / 2 + Math.sin(angle) * radius;
            
            const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, 15);
            gradient.addColorStop(0, 'hsla(280, 70%, 70%, 0.3)');
            gradient.addColorStop(1, 'hsla(280, 70%, 70%, 0)');
            
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(x, y, 15, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }
}

// ============================================
// BRAIN SVG ENHANCEMENTS
// ============================================
class BrainEnhancement {
    constructor() {
        this.brainSvg = document.querySelector('.brain-svg');
        if (!this.brainSvg) return;
        
        this.addGradients();
        this.init();
    }
    
    addGradients() {
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        
        // Left brain gradients
        const leftGradient = `
            <linearGradient id="leftGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#CBD5E0;stop-opacity:0.9" />
                <stop offset="50%" style="stop-color:#A0AEC0;stop-opacity:0.85" />
                <stop offset="100%" style="stop-color:#718096;stop-opacity:0.8" />
            </linearGradient>
            <linearGradient id="leftGradientActive" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#E2E8F0;stop-opacity:1" />
                <stop offset="50%" style="stop-color:#CBD5E0;stop-opacity:0.95" />
                <stop offset="100%" style="stop-color:#A0AEC0;stop-opacity:0.9" />
            </linearGradient>
        `;
        
        // Right brain gradients
        const rightGradient = `
            <linearGradient id="rightGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#B794F4;stop-opacity:0.9" />
                <stop offset="50%" style="stop-color:#9F7AEA;stop-opacity:0.85" />
                <stop offset="100%" style="stop-color:#805AD5;stop-opacity:0.8" />
            </linearGradient>
            <linearGradient id="rightGradientActive" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#D6BCFA;stop-opacity:1" />
                <stop offset="50%" style="stop-color:#B794F4;stop-opacity:0.95" />
                <stop offset="100%" style="stop-color:#9F7AEA;stop-opacity:0.9" />
            </linearGradient>
        `;
        
        defs.innerHTML = leftGradient + rightGradient;
        this.brainSvg.insertBefore(defs, this.brainSvg.firstChild);
    }
    
    init() {
        const leftBrain = document.querySelector('.left-brain path');
        const rightBrain = document.querySelector('.right-brain path');
        
        if (leftBrain) leftBrain.style.fill = 'url(#leftGradient)';
        if (rightBrain) rightBrain.style.fill = 'url(#rightGradient)';
    }
}

// ============================================
// SIDE INTERACTION & NAVIGATION
// ============================================
class SideInteraction {
    constructor() {
        this.leftSide = document.getElementById('left-side');
        this.rightSide = document.getElementById('right-side');
        
        this.init();
    }
    
    init() {
        // Click handlers for sides (fallback)
        this.leftSide.addEventListener('click', (e) => {
            // Only navigate if not clicking the button
            if (!e.target.closest('.btn-ver-mas')) {
                this.navigate('matematico.html', 'left');
            }
        });
        
        this.rightSide.addEventListener('click', (e) => {
            // Only navigate if not clicking the button
            if (!e.target.closest('.btn-ver-mas')) {
                this.navigate('creativo.html', 'right');
            }
        });
        
        // Click handlers for "Ver más" buttons
        const buttons = document.querySelectorAll('.btn-ver-mas');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent side click
                const target = button.getAttribute('data-target');
                const side = target.includes('matematico') ? 'left' : 'right';
                this.navigate(target, side);
            });
        });
    }
    
    navigate(url, side) {
        const container = document.querySelector('.split-container');
        const brain = document.querySelector('.brain-center');
        
        // Elegant exit animation
        if (side === 'left') {
            container.style.transform = 'translateX(-100%)';
            if (brain) brain.style.transform = 'translate(-150%, -50%) scale(0.5)';
        } else {
            container.style.transform = 'translateX(100%)';
            if (brain) brain.style.transform = 'translate(50%, -50%) scale(0.5)';
        }
        
        container.style.transition = 'transform 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        if (brain) brain.style.transition = 'all 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        
        setTimeout(() => {
            window.location.href = url;
        }, 1000);
    }
}

// ============================================
// MOUSE INTERACTION - SUBTLE PARALLAX
// ============================================
class MouseInteraction {
    constructor() {
        this.init();
    }
    
    init() {
        document.addEventListener('mousemove', (e) => {
            const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
            
            // Only apply parallax to content, not brain
            const leftContent = document.querySelector('.left-half .side-content');
            const rightContent = document.querySelector('.right-half .side-content');
            
            if (leftContent) {
                leftContent.style.transform = `translate(${-mouseX * 3}px, ${-mouseY * 3}px)`;
            }
            
            if (rightContent) {
                rightContent.style.transform = `translate(${mouseX * 3}px, ${mouseY * 3}px)`;
            }
        });
    }
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all systems
    new LogicalAnimation();
    new CreativeAnimation();
    new BrainEnhancement();
    new SideInteraction();
    new MouseInteraction();
    
    // Elegant fade in
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// KEYBOARD SHORTCUTS
// ============================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        window.location.href = 'matematico.html';
    } else if (e.key === 'ArrowRight') {
        window.location.href = 'creativo.html';
    }
});
