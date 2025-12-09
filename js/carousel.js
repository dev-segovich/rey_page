// ============================================
// BACKGROUND VIDEO/IMAGE CAROUSEL
// Alternates active class every 5 seconds
// ============================================
class BackgroundCarousel {
    constructor() {
        this.items = document.querySelectorAll('.bg-media-item');
        if (!this.items.length) return;
        
        this.currentIndex = 0;
        this.intervalTime = 5000; // 5 seconds
        
        this.init();
    }
    
    init() {
        // Start the cycle
        this.interval = setInterval(() => this.nextSlide(), this.intervalTime);
    }
    
    nextSlide() {
        // Remove active from current
        this.items[this.currentIndex].classList.remove('active');
        
        // Calculate next index
        this.currentIndex = (this.currentIndex + 1) % this.items.length;
        
        // Add active to next
        this.items[this.currentIndex].classList.add('active');
        
        // Optional: If it's a video, ensure it plays. 
        // If it was paused for some reason, this helps.
        const nextItem = this.items[this.currentIndex];
        if (nextItem.tagName === 'VIDEO') {
            nextItem.play().catch(e => console.log("Video play warning:", e));
        }
    }
}

// Add to global init
document.addEventListener('DOMContentLoaded', () => {
   new BackgroundCarousel(); 
});
