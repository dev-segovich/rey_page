// ============================================
// ULTRA MINIMAL AESTHETIC - LEFT SIDE
// Barely visible, editorial style
// ============================================
class MinimalLeftAnimation {
    constructor() {
        this.canvas = document.getElementById('logical-canvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        
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
        
        // Very few, very subtle particles
        const particleCount = 15;
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.2,
                vy: (Math.random() - 0.5) * 0.2,
                radius: Math.random() * 1.5 + 0.5,
                opacity: Math.random() * 0.15 + 0.05,
                pulseOffset: Math.random() * Math.PI * 2
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        const time = Date.now() * 0.0008;
        
        // Draw ultra-subtle particles
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            const pulse = Math.sin(time * 1.5 + particle.pulseOffset) * 0.3 + 0.7;
            const currentOpacity = particle.opacity * pulse;
            
            // Soft minimal glow
            const gradient = this.ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, particle.radius * 4
            );
            gradient.addColorStop(0, `rgba(212, 168, 154, ${currentOpacity * 0.5})`);
            gradient.addColorStop(0.5, `rgba(212, 168, 154, ${currentOpacity * 0.2})`);
            gradient.addColorStop(1, `rgba(212, 168, 154, 0)`);
            
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius * 4, 0, Math.PI * 2);
            this.ctx.fill();
        });
        
        // Draw one subtle flowing line
        this.drawMinimalLine(time);
        
        requestAnimationFrame(() => this.animate());
    }
    
    drawMinimalLine(time) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = `rgba(184, 175, 163, 0.04)`;
        this.ctx.lineWidth = 1;
        
        for (let x = 0; x <= this.canvas.width; x += 10) {
            const y = Math.sin(x * 0.006 + time * 0.4) * 30 +
                      Math.cos(x * 0.009 - time * 0.3) * 20 +
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

// ============================================
// ULTRA MINIMAL AESTHETIC - RIGHT SIDE
// ============================================
class MinimalRightAnimation {
    constructor() {
        this.canvas = document.getElementById('creative-canvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        
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
        
        // Minimal particles
        for (let i = 0; i < 18; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.15,
                vy: (Math.random() - 0.5) * 0.15,
                radius: Math.random() * 1.2 + 0.4,
                opacity: Math.random() * 0.2 + 0.05
            });
        }
    }
    
    animate() {
        // Very subtle trail effect
        this.ctx.fillStyle = 'rgba(250, 249, 246, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        const time = Date.now() * 0.0008;
        
        // Draw minimal particles
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            const gradient = this.ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, particle.radius * 3
            );
            gradient.addColorStop(0, `rgba(168, 181, 160, ${particle.opacity})`);
            gradient.addColorStop(0.5, `rgba(168, 181, 160, ${particle.opacity * 0.5})`);
            gradient.addColorStop(1, `rgba(168, 181, 160, 0)`);
            
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius * 3, 0, Math.PI * 2);
            this.ctx.fill();
        });
        
        // One flowing curve
        this.drawMinimalCurve(time);
        
        requestAnimationFrame(() => this.animate());
    }
    
    drawMinimalCurve(time) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = `rgba(155, 168, 136, 0.05)`;
        this.ctx.lineWidth = 1;
        
        for (let x = 0; x <= this.canvas.width; x += 10) {
            const y = Math.sin(x * 0.007 + time * 0.4) * 35 +
                      Math.cos(x * 0.005 - time * 0.25) * 22 +
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

// ============================================
// BRAIN MINIMAL STYLING
// ============================================
class BrainMinimal {
    constructor() {
        this.brainSvg = document.querySelector('.brain-svg');
        if (!this.brainSvg) return;
        
        this.init();
    }
    
    init() {
        const leftBrain = document.querySelector('.left-brain path');
        const rightBrain = document.querySelector('.right-brain path');
        
        if (leftBrain) {
            leftBrain.style.fill = '#D4A89A';
            leftBrain.style.opacity = '0.8';
        }
        if (rightBrain) {
            rightBrain.style.fill = '#A8B5A0';
            rightBrain.style.opacity = '0.8';
        }
    }
}

// ============================================
// ELEGANT NAVIGATION
// ============================================
class ElegantNavigation {
    constructor() {
        this.leftSide = document.getElementById('left-side');
        this.rightSide = document.getElementById('right-side');
        
        this.init();
    }
    
    init() {
        // Only make the main titles clickable, not the entire background
        const leftTitle = document.querySelector('.left-half .main-title-container');
        const rightTitle = document.querySelector('.right-half .main-title-container-right');
        
        if (leftTitle) {
            leftTitle.addEventListener('click', () => {
                this.navigate('negocios.html', 'left');
            });
        }
        
        if (rightTitle) {
            rightTitle.addEventListener('click', () => {
                this.navigate('viajes.html', 'right');
            });
        }
    }
    
    navigate(url, side) {
        // Ultra minimal fade transition
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100vw';
        overlay.style.height = '100vh';
        overlay.style.zIndex = '9999';
        overlay.style.pointerEvents = 'none';
        
        const color = side === 'left' 
            ? 'rgba(245, 243, 238, 0.98)' 
            : 'rgba(245, 243, 238, 0.98)';
        
        overlay.style.background = color;
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 1s cubic-bezier(0.19, 1, 0.22, 1)';
        
        document.body.appendChild(overlay);
        
        setTimeout(() => {
            overlay.style.opacity = '1';
        }, 10);
        
        // Fade brain
        const brain = document.querySelector('.brain-center');
        if (brain) {
            brain.style.transition = 'all 1s cubic-bezier(0.19, 1, 0.22, 1)';
            brain.style.opacity = '0';
            brain.style.transform = 'translate(-50%, -50%) scale(0.92)';
        }
        
        setTimeout(() => {
            window.location.href = url;
        }, 1100);
    }
}

// ============================================
// SUBTLE PARALLAX
// ============================================
class SubtleParallax {
    constructor() {
        this.init();
    }
    
    init() {
        let rafId = null;
        
        document.addEventListener('mousemove', (e) => {
            if (rafId) return;
            
            rafId = requestAnimationFrame(() => {
                const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
                const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
                
                const leftContent = document.querySelector('.left-half .hemisphere-content');
                const rightContent = document.querySelector('.right-half .hemisphere-content');
                const brain = document.querySelector('.brain-center');
                
                if (leftContent) {
                    leftContent.style.transform = `translate(${-mouseX * 3}px, ${-mouseY * 3}px)`;
                }
                
                if (rightContent) {
                    rightContent.style.transform = `translate(${mouseX * 3}px, ${mouseY * 3}px) translateX(70px)`;
                }
                
                if (brain) {
                    // Only horizontal parallax for brain (no Y movement)
                    brain.style.transform = `translate(calc(-50% + ${mouseX * 5}px), -50%)`;
                }
                
                rafId = null;
            });
        });
    }
}

// ============================================
// ANIMATED WAVE BORDER
// Reacts to mouse movement velocity
// ============================================
class WaveAnimation {
    constructor() {
        this.wavePath = document.getElementById('wave-path');
        if (!this.wavePath) return;
        
        this.mouseVelocity = 0;
        this.lastMouseX = 0;
        this.lastMouseY = 0;
        this.lastTime = Date.now();
        this.time = 0;
        
        // ==========================================
        // CONFIGURACIÓN DE LA ONDA / WAVE SETTINGS
        // Juega con estos valores para ajustar el efecto
        // ==========================================
        this.baseAmplitude = 2;     // Reposo: Onda visible siempre (antes 10)
        this.maxAmplitude = 20;      // Rápido: Picos estilo EKG
        
        this.baseFrequency = 0.002;   // Reposo: Curvas suaves pero CLARAMENTE VISIBLES (antes 0.001 era recta)
        this.maxFrequency = 0.001;    // Rápido: Picos intermedios
        
        this.segments = 400;         // Resolución balanceada para rendimiento y suavidad
        // ==========================================
        
        this.currentAmplitude = this.baseAmplitude;
        this.currentFrequency = this.baseFrequency;
        
        this.init();
    }
    
    init() {
        this.momentVelocity = 0; // Velocidad suavizada
        
        // Track mouse movement using accumulation
        document.addEventListener('mousemove', (e) => {
            // Calculate distance from last recorded position
            const deltaX = e.clientX - this.lastMouseX;
            const deltaY = e.clientY - this.lastMouseY;
            
            // Avoid jumps on first move or context switches
            // Increased threshold heavily to capture fast flicks
            if (Math.abs(deltaX) < 2000 && Math.abs(deltaY) < 2000) {
                const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                // Impulse proportional to distance
                this.momentVelocity += distance * 0.2; 
            } else {
                // If movement is HUGE (likely a super fast flick or context switch),
                // apply a max impulse instead of ignoring it
                this.momentVelocity += 100;
            }
            
            this.lastMouseX = e.clientX;
            this.lastMouseY = e.clientY;
        });
        
        // Initialize positions
        this.lastMouseX = window.innerWidth / 2;
        this.lastMouseY = window.innerHeight / 2;
        
        // Start animation
        this.animate();
    }
    
    animate() {
        this.time += 0.05; 
        
        // Apply decay to velocity (inertia)
        // 0.9 = long tail, 0.8 = short snappy tail
        this.momentVelocity *= 0.9;
        
        // Cap max velocity to avoid explosion
        const safeVelocity = Math.min(this.momentVelocity, 100);
        
        // Map velocity to a 0-1 factor for interpolation
        // Sensitivity: changing divider (e.g. / 20) changes how easy it is to trigger max state
        const velocityFactor = Math.min(safeVelocity / 15, 1);
        
        this.currentAmplitude = this.baseAmplitude + 
            (this.maxAmplitude - this.baseAmplitude) * velocityFactor;
        
        this.currentFrequency = this.baseFrequency + 
            (this.maxFrequency - this.baseFrequency) * velocityFactor;
        
        // Generate vertical wave path
        let pathData = '';
        let clipPathPoints = []; 
        
        const waveRequestX = 30; 
        
        for (let i = 0; i <= this.segments; i++) {
            const y = (i / this.segments) * 100; // Percentage
            
            // BASE WAVE (SINUSOIDAL)
            let waveForm = Math.sin(this.time + i * this.currentFrequency * 10);
            
            // EFECTO EKG / ERRÁTICO
            // Si hay movimiento rápido, añadimos "ruido" aleatorio para hacer picos agudos
            if (velocityFactor > 0.05) {
                // Genera un valor aleatorio entre -1 y 1 multiplicado por la velocidad
                const noise = (Math.random() - 0.5) * 2 * velocityFactor;
                // Mezclamos la onda suave con el ruido
                waveForm = waveForm * 0.7 + noise * 0.8;
            }
            
            // Calculate final offset
            const offset = waveForm * this.currentAmplitude;
            
            // X position
            // We use pixels for X since clip-path polygon can mix units
            const x = waveRequestX + offset;
            
            if (i === 0) {
                pathData = `M ${x},0`;
            } else {
                pathData += ` L ${x},${y * (window.innerHeight/100)}`; 
            }
            
            // Add point for clip-path (x px, y %)
            clipPathPoints.push(`${x}px ${y}%`);
        }
        
        // Scale SVG to match window height manually given viewBox issues with percentage
        const height = window.innerHeight;
        // Re-generate SVG path with explicit pixel height for consistency if needed, 
        // using previously calculated percentage-based logic for SVG is fine if viewBox is matching.
        // But here we simply update the SVG path.
        // NOTE: SVG in HTML is 100% height. We used 0-100 coordinates in loop? 
        // Let's stick to percentages for SVG Y to match preserveAspectRatio="none" or viewbox behavior
        // Actually, let's keep SVG simple: M x, y% -> translated to pixels implicitly by SVG scaling? 
        // No, SVG viewBox is 0 0 100 100 (if we set it) or we use pixels.
        // Let's use pixel coordinates for everything to align perfectly.
        
        let pathDataPixel = '';
        for (let i = 0; i <= this.segments; i++) {
             const yPct = (i / this.segments);
             const yPx = yPct * height;
             const offset = Math.sin(this.time + i * this.currentFrequency * 10) * 
                          this.currentAmplitude;
             const x = waveRequestX + offset;
             
             pathDataPixel += (i===0 ? `M ${x},${yPx}` : ` L ${x},${yPx}`);
        }
        
        this.wavePath.setAttribute('d', pathDataPixel);
        
        // Create Clip Path Polygon
        // Points down the wave, then to bottom-right, top-right, close.
        const polygon = `polygon(${clipPathPoints.join(', ')}, 100% 100%, 100% 0)`;
        
        // Apply clip-path to STABLE LAYERS
        // 1. The static background layer
        // 2. The carousel container (which appears on expansion)
        const targets = document.querySelectorAll('.right-background-layer, .carousel-container-vertical, .right-clipped-container');
        
        targets.forEach(el => {
            el.style.clipPath = polygon;
            el.style.webkitClipPath = polygon;
        });
        
        // Sync global wave border position to right side
        // This ensures the invisible SVG wave follows the split line perfectly
        const rightSide = document.querySelector('.right-half');
        if (rightSide) {
            // Sync global wave border position to right side
            // This ensures the invisible SVG wave follows the split line perfectly
            const rect = rightSide.getBoundingClientRect();
            // Wave internal offset logic matches clip-path relative logic
            const waveContainer = document.querySelector('.wave-border');
            if (waveContainer) {
                waveContainer.style.left = `${rect.left}px`;
            }
        }
        
        // Style updates based on velocity - BUT MAKE STROKE INVISIBLE
        // User wants only the image shape to wave, no visible line
        const strokeWidth = 0; 
        
        this.wavePath.setAttribute('stroke-width', strokeWidth);
        this.wavePath.setAttribute('stroke', 'rgba(0, 0, 0, 0)'); // Transparent
        
        requestAnimationFrame(() => this.animate());
    }
}

// ============================================
// POSITION-BASED EXPANSION
// Left expands when mouse in first 20% of width
// Right expands when mouse in last 80% of width
// ============================================
class PositionBasedExpansion {
    constructor() {
        this.leftSide = document.getElementById('left-side');
        this.rightSide = document.getElementById('right-side');
        this.init();
    }
    
    init() {
        let rafId = null;
        
        document.addEventListener('mousemove', (e) => {
            if (rafId) return;
            
            rafId = requestAnimationFrame(() => {
                const mouseX = e.clientX;
                const windowWidth = window.innerWidth;
                const mousePercentage = (mouseX / windowWidth) * 100;

                // Force expansion if hovering nav list (ONLY ON DESKTOP)
                // On mobile (column layout), this would cause height expansion which we want to avoid
                if (windowWidth > 768) {
                    const hoveringLeftNav = e.target.closest('.left-nav .nav-list');
                    const hoveringRightNav = e.target.closest('.right-nav .nav-list');

                    if (hoveringLeftNav) {
                        this.leftSide.classList.add('expanded');
                        this.rightSide.classList.remove('expanded');
                        rafId = null;
                        return;
                    }

                    if (hoveringRightNav) {
                        this.rightSide.classList.add('expanded');
                        this.leftSide.classList.remove('expanded');
                        rafId = null;
                        return;
                    }
                }
                
                // Expand left side if mouse is in first 20%
                if (mousePercentage <= 20) {
                    this.leftSide.classList.add('expanded');
                    this.rightSide.classList.remove('expanded');
                }
                // Expand right side if mouse is in last 20% (80% to 100%)
                else if (mousePercentage >= 80) {
                    this.rightSide.classList.add('expanded');
                    this.leftSide.classList.remove('expanded');
                }
                // Neutral zone (20% to 80%) - no expansion
                else {
                    this.leftSide.classList.remove('expanded');
                    this.rightSide.classList.remove('expanded');
                }
                
                rafId = null;
            });
        });
        
        // Reset on mouse leave
        document.addEventListener('mouseleave', () => {
            this.leftSide.classList.remove('expanded');
            this.rightSide.classList.remove('expanded');
        });
    }
}

// ============================================
// NAV HOVER EFFECTS - SHOW DYNAMIC BACKGROUNDS
// ============================================
class NavHoverEffects {
    constructor() {
        this.leftSide = document.querySelector('.left-half');
        this.rightSide = document.querySelector('.right-half');
        this.leftBgLayer = document.getElementById('left-dynamic-bg');
        this.rightBgLayer = document.getElementById('right-dynamic-bg');
        
        this.init();
    }

    init() {
        // --- Left Side Links ---
        // 1. Atex Group -> Video Background
        this.setupLinkHover('atex-link', 'left', 'video', 'vid-1');
        
        // 2. Example 2 -> Image Background
        this.setupLinkHover('biz-link-2', 'left', 'video', 'vid-2');
        
        // 3. Example 3 -> Image Background
        this.setupLinkHover('biz-link-3', 'left', 'video', 'vid-3');


        // --- Right Side Links ---
        // 1. Example 1 -> Image Background
        this.setupLinkHover('travel-link-1', 'right', 'image', 'img/rightSide/example1.jpg');
        
        // 2. Example 2 -> Image Background
        this.setupLinkHover('travel-link-2', 'right', 'image', 'img/rightSide/example2.jpg');
        
        // 3. Example 3 -> Image Background
        this.setupLinkHover('travel-link-3', 'right', 'image', 'img/rightSide/example3.jpg');

        // 4. Example 4 -> Image Background
        this.setupLinkHover('travel-link-4', 'right', 'image', 'img/rightSide/bg-rightSide.jpg');
    }

    setupLinkHover(linkId, side, type, assetIdOrUrl = '') {
        const link = document.getElementById(linkId);
        if (!link) return;

        const targetSide = side === 'left' ? this.leftSide : this.rightSide;
        const targetBgLayer = side === 'left' ? this.leftBgLayer : this.rightBgLayer;

        link.addEventListener('mouseenter', () => {
             // Logic: "Sticky" background. The last hovered link sets the background state.
            // We do not revert on mouseleave.
            
            if (type === 'video') {
                targetSide.classList.remove('show-dynamic-bg');
                targetSide.classList.add('show-video-background');
                
                // Logic: Switch active video class
                // 1. Deactivate all videos
                const allVideos = targetSide.querySelectorAll('.bg-video');
                allVideos.forEach(v => v.classList.remove('active-video'));
                
                // 2. Activate specific video by ID
                const activeVideo = document.getElementById(assetIdOrUrl);
                if (activeVideo) {
                    activeVideo.classList.add('active-video');
                    // Ensure it is playing (should be autoplaying but just in case)
                    // activeVideo.play(); 
                    // User requested "resume where left off", so we just show it. 
                    // Autoplay attribute handles the running state.
                }
                
            } else if (type === 'image') {
                // If image, set the image and show the dynamic layer
                targetSide.classList.remove('show-video-background'); // This implicitly "hides" the active video container from view context, but keeping opacity logic separate if needed
                
                targetBgLayer.style.backgroundImage = `url('${assetIdOrUrl}')`;
                targetSide.classList.add('show-dynamic-bg');
            }
        });
    }
}

// ============================================
// DYNAMIC BRAND TEXT - MOUSE INTERACTION
// ============================================
class DynamicBrandText {
    constructor() {
        this.brandText = document.querySelector('.center-brand-text');
        if (!this.brandText) return;

        this.variants = [
            { text: "Rey Vivas", font: "'EB Garamond', serif", letterSpacing: "0.2em", weight: "400", style: "normal" },
            { text: "レイ・ヴィヴァス", font: "'Noto Serif JP', serif", letterSpacing: "0.15em", weight: "500", style: "normal" }, // Japanese
            { text: "R V", font: "'Inter', sans-serif", letterSpacing: "0.5em", weight: "900", style: "normal" },
            { text: "rey_vivas", font: "'Courier New', monospace", letterSpacing: "0.05em", weight: "400", style: "normal" },
            { text: "REY VIVAS", font: "'Crimson Text', serif", letterSpacing: "0.4em", weight: "400", style: "italic" },
            { text: "Rey.", font: "'EB Garamond', serif", letterSpacing: "0.1em", weight: "700", style: "italic" },
            { text: "[ R V ]", font: "'Inter', sans-serif", letterSpacing: "0.2em", weight: "600", style: "normal" },
            { text: "Rey Vivas", font: "'Times New Roman', serif", letterSpacing: "-0.05em", weight: "400", style: "normal" }, // Classic tight
            { text: "R.V.", font: "'Inter', sans-serif", letterSpacing: "0.8em", weight: "300", style: "normal" },
            { text: "REY", font: "'Inter', sans-serif", letterSpacing: "0.3em", weight: "800", style: "normal" },
            { text: "vivas", font: "'Courier New', monospace", letterSpacing: "0.2em", weight: "400", style: "italic" },
            { text: "Rey Vivas", font: "'EB Garamond', serif", letterSpacing: "0.5em", weight: "400", style: "normal" }, // Wide
            { text: "RV.", font: "'Crimson Text', serif", letterSpacing: "0.2em", weight: "600", style: "italic" },
            { text: "<RV/>", font: "'Courier New', monospace", letterSpacing: "0.1em", weight: "600", style: "normal" },
            { text: "Rey Vivas", font: "'Inter', sans-serif", letterSpacing: "0.1em", weight: "100", style: "normal" }, // Ultra thin
            { text: "яey vivas", font: "'Courier New', monospace", letterSpacing: "0.1em", weight: "500", style: "normal" }, // Pseudo-cyrillic aesthetics
            { text: "R---V", font: "'Inter', sans-serif", letterSpacing: "0.4em", weight: "700", style: "normal" },
            { text: "Rey Vivas", font: "'Georgia', serif", letterSpacing: "0.05em", weight: "400", style: "italic" },
            { text: "REY.", font: "'Helvetica', sans-serif", letterSpacing: "0.25em", weight: "900", style: "normal" },
            { text: "{ rey }", font: "'Courier New', monospace", letterSpacing: "0.15em", weight: "400", style: "normal" },
            { text: "Rey Vivas", font: "'Verdana', sans-serif", letterSpacing: "0.6em", weight: "400", style: "normal" }, // Ultra wide sans
            { text: "rv", font: "'EB Garamond', serif", letterSpacing: "0.2em", weight: "600", style: "italic" }, // Lowercase serif
            { text: "Rey | Vivas", font: "'Inter', sans-serif", letterSpacing: "0.15em", weight: "300", style: "normal" },
            { text: "R & V", font: "'Crimson Text', serif", letterSpacing: "0.2em", weight: "400", style: "italic" },
            { text: "ReyVivas", font: "'Inter', sans-serif", letterSpacing: "-0.08em", weight: "700", style: "normal" } // Tight cluster
        ];

        this.lastX = 0;
        this.lastY = 0;
        this.glitchTimeout = null;

        this.init();
    }

    init() {
        let throttleTimer;
        
        document.addEventListener('mousemove', (e) => {
            if (throttleTimer) return;
            
            throttleTimer = requestAnimationFrame(() => {
                this.updateText(e.clientX, e.clientY);
                throttleTimer = null;
            });
        });
    }

    updateText(mouseX, mouseY) {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        // --- 1. Typography Switching ---
        const pctX = mouseX / windowWidth;
        const pctY = mouseY / windowHeight;
        
        const len = this.variants.length;
        // Multiplier 2.5 makes it cycle through the list 2.5x times across the screen
        const index = Math.floor((pctX + pctY) * len * 2.5) % len;

        const variant = this.variants[index];
        
        // Apply styles only if changed
        if (this.brandText.innerText !== variant.text) {
            this.brandText.innerText = variant.text;
            this.brandText.style.fontFamily = variant.font;
            this.brandText.style.letterSpacing = variant.letterSpacing;
            this.brandText.style.fontWeight = variant.weight;
            this.brandText.style.fontStyle = variant.style;
        }

        // --- 2. Glitch Effect (Velocity Based) ---
        const deltaX = Math.abs(mouseX - this.lastX);
        const deltaY = Math.abs(mouseY - this.lastY);
        const velocity = deltaX + deltaY; 

        // Calculate offset based on speed - INTENSIFIED
        // Sensitivity: / 2.5 means higher multipliers for lower speeds
        const offset = Math.min(velocity / 2.5, 30); // Max offset increased to 30px
        
        if (offset > 0.5) { // Threshold lowered
            // Apply Stronger Red/Cyan chromatic aberration
            // Added vertical jitter (Math.random) for chaotic effect
            const jitterY = (Math.random() - 0.5) * offset * 0.5;
            
            this.brandText.style.textShadow = `
                ${offset}px ${jitterY}px 0px rgba(255, 0, 60, 0.9), 
                -${offset}px ${-jitterY}px 0px rgba(0, 255, 230, 0.9),
                0px 0px ${offset * 0.5}px rgba(255, 255, 255, 0.8)
            `;
            
            // Aggressive skew and random scale
            const scale = 1 + (Math.random() * 0.1); 
            
            if (offset > 4) {
                 this.brandText.style.transform = `translate(-50%, -50%) skewX(${-offset * 1.5}deg) scale(${scale})`;
            } else {
                 this.brandText.style.transform = `translate(-50%, -50%) skewX(${-offset}deg)`;
            }
        } else {
            this.brandText.style.textShadow = 'none';
            this.brandText.style.transform = `translate(-50%, -50%)`;
        }
        
        this.lastX = mouseX;
        this.lastY = mouseY;
        
        // Reset Shadow when stopping
        if (this.glitchTimeout) clearTimeout(this.glitchTimeout);
        this.glitchTimeout = setTimeout(() => {
            this.brandText.style.textShadow = 'none';
            this.brandText.style.transform = `translate(-50%, -50%)`;
        }, 50);
    }
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize minimal systems
    new MinimalLeftAnimation();
    new MinimalRightAnimation();
    new BrainMinimal();
    new ElegantNavigation();
    new SubtleParallax();
    new WaveAnimation();
    new PositionBasedExpansion();
    new NavHoverEffects();
    new DynamicBrandText();
    
    // Ultra elegant fade in
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1.5s cubic-bezier(0.19, 1, 0.22, 1)';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 200);
});

// ============================================
// KEYBOARD SHORTCUTS
// ============================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        window.location.href = 'negocios.html';
    } else if (e.key === 'ArrowRight') {
        window.location.href = 'viajes.html';
    }
});
