// ============================================
// PARTICLES BACKGROUND ANIMATION
// ============================================
class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particles');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 100;
        
        this.resize();
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    init() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
                color: Math.random() > 0.5 ? '#00d4ff' : '#ff006e'
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach((particle, i) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Boundary check
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = particle.color;
            this.ctx.fill();
            
            // Draw connections
            this.particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.strokeStyle = particle.color;
                    this.ctx.globalAlpha = (150 - distance) / 150 * 0.3;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                    this.ctx.globalAlpha = 1;
                }
            });
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// ============================================
// HEMISPHERE INTERACTION
// ============================================
class BrainInterface {
    constructor() {
        this.leftHemisphere = document.getElementById('left-hemisphere');
        this.rightHemisphere = document.getElementById('right-hemisphere');
        this.brainContainer = document.querySelector('.brain-container');
        
        this.init();
    }
    
    init() {
        // Click handlers with ripple effect
        this.leftHemisphere.addEventListener('click', (e) => {
            this.createRipple(e, 'blue');
            setTimeout(() => {
                this.navigate('matematico.html');
            }, 400);
        });
        
        this.rightHemisphere.addEventListener('click', (e) => {
            this.createRipple(e, 'pink');
            setTimeout(() => {
                this.navigate('creativo.html');
            }, 400);
        });
        
        // Enhanced hover effects
        this.addHoverEffects();
        
        // Add floating animation to brain
        this.addFloatingAnimation();
    }
    
    createRipple(event, color) {
        const ripple = document.createElement('div');
        ripple.classList.add('ripple-effect', `ripple-${color}`);
        
        const rect = this.brainContainer.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        this.brainContainer.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 800);
    }
    
    navigate(url) {
        // Add transition effect
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            window.location.href = url;
        }, 500);
    }
    
    addHoverEffects() {
        // Add sound effect on hover (optional)
        const hemispheres = [this.leftHemisphere, this.rightHemisphere];
        
        hemispheres.forEach(hemisphere => {
            hemisphere.addEventListener('mouseenter', () => {
                hemisphere.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
            });
            
            hemisphere.addEventListener('mouseleave', () => {
                hemisphere.style.transition = 'transform 0.4s ease';
            });
        });
    }
    
    addFloatingAnimation() {
        let angle = 0;
        const float = () => {
            angle += 0.01;
            const offset = Math.sin(angle) * 5;
            this.brainContainer.style.transform = `translateY(${offset}px)`;
            requestAnimationFrame(float);
        };
        float();
    }
}

// ============================================
// GLITCH TEXT EFFECT
// ============================================
class GlitchEffect {
    constructor() {
        this.glitchElements = document.querySelectorAll('.glitch');
        this.init();
    }
    
    init() {
        this.glitchElements.forEach(element => {
            setInterval(() => {
                if (Math.random() > 0.95) {
                    this.glitch(element);
                }
            }, 100);
        });
    }
    
    glitch(element) {
        const text = element.getAttribute('data-text');
        const glitchChars = '!<>-_\\/[]{}—=+*^?#________';
        
        let iterations = 0;
        const interval = setInterval(() => {
            element.textContent = text
                .split('')
                .map((char, index) => {
                    if (index < iterations) {
                        return text[index];
                    }
                    return glitchChars[Math.floor(Math.random() * glitchChars.length)];
                })
                .join('');
            
            if (iterations >= text.length) {
                clearInterval(interval);
                element.textContent = text;
            }
            
            iterations += 1 / 3;
        }, 30);
    }
}

// ============================================
// NEURAL NETWORK ANIMATION
// ============================================
class NeuralAnimation {
    constructor() {
        this.neurons = document.querySelectorAll('.neuron');
        this.synapses = document.querySelectorAll('.synapse');
        this.init();
    }
    
    init() {
        // Random activation of neurons
        setInterval(() => {
            const randomNeuron = this.neurons[Math.floor(Math.random() * this.neurons.length)];
            this.activateNeuron(randomNeuron);
        }, 500);
    }
    
    activateNeuron(neuron) {
        neuron.style.animation = 'none';
        setTimeout(() => {
            neuron.style.animation = 'neuronPulse 0.6s ease-in-out';
        }, 10);
    }
}

// ============================================
// CURSOR TRAIL EFFECT
// ============================================
class CursorTrail {
    constructor() {
        this.trail = [];
        this.maxTrail = 20;
        this.init();
    }
    
    init() {
        document.addEventListener('mousemove', (e) => {
            this.addTrailDot(e.clientX, e.clientY);
        });
    }
    
    addTrailDot(x, y) {
        const dot = document.createElement('div');
        dot.style.position = 'fixed';
        dot.style.left = `${x}px`;
        dot.style.top = `${y}px`;
        dot.style.width = '4px';
        dot.style.height = '4px';
        dot.style.borderRadius = '50%';
        dot.style.background = 'rgba(0, 212, 255, 0.6)';
        dot.style.pointerEvents = 'none';
        dot.style.zIndex = '9999';
        dot.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        document.body.appendChild(dot);
        this.trail.push(dot);
        
        setTimeout(() => {
            dot.style.opacity = '0';
            dot.style.transform = 'scale(0)';
        }, 10);
        
        setTimeout(() => {
            dot.remove();
            this.trail.shift();
        }, 500);
        
        if (this.trail.length > this.maxTrail) {
            const oldDot = this.trail.shift();
            oldDot.remove();
        }
    }
}

// ============================================
// AUDIO FEEDBACK (Optional)
// ============================================
class AudioFeedback {
    constructor() {
        this.audioContext = null;
        this.init();
    }
    
    init() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Web Audio API not supported');
        }
    }
    
    playTone(frequency, duration) {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    }
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new ParticleSystem();
    new BrainInterface();
    new GlitchEffect();
    new NeuralAnimation();
    new CursorTrail();
    const audio = new AudioFeedback();
    
    // Add audio feedback to hemispheres
    const leftHemisphere = document.getElementById('left-hemisphere');
    const rightHemisphere = document.getElementById('right-hemisphere');
    
    leftHemisphere.addEventListener('mouseenter', () => {
        audio.playTone(440, 0.1); // A note for left (mathematical)
    });
    
    rightHemisphere.addEventListener('mouseenter', () => {
        audio.playTone(523.25, 0.1); // C note for right (creative)
    });
    
    // Fade in animation
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// KEYBOARD SHORTCUTS
// ============================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        // Navigate to mathematical hemisphere
        window.location.href = 'matematico.html';
    } else if (e.key === 'ArrowRight') {
        // Navigate to creative hemisphere
        window.location.href = 'creativo.html';
    }
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
// Reduce particle count on mobile
if (window.innerWidth < 768) {
    const canvas = document.getElementById('particles');
    if (canvas) {
        canvas.style.opacity = '0.3';
    }
}

// Lazy load heavy animations on mobile
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (reducedMotion.matches) {
    document.querySelectorAll('.neuron, .synapse').forEach(element => {
        element.style.animation = 'none';
    });
}
