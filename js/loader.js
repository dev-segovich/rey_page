// ============================================
// RESOURCE PRELOADER
// Monitors loading of images and videos
// ============================================
class ResourceLoader {
    constructor() {
        this.loadingScreen = document.getElementById('loading-screen');
        this.progressBar = document.getElementById('progress-bar');
        this.statusText = document.getElementById('loading-status');
        
        // Collect all assets
        this.images = Array.from(document.images);
        this.videos = Array.from(document.querySelectorAll('video'));
        
        this.totalAssets = this.images.length + this.videos.length;
        this.loadedAssets = 0;
        
        // Removed safety timeout as requested - strict 100% check enabled
        
        this.init();
    }
    
    init() {
        if (this.totalAssets === 0) {
            this.finish();
            return;
        }

        // Monitor Images
        this.images.forEach(img => {
            if (img.complete) {
                this.incrementProgress();
            } else {
                img.addEventListener('load', () => this.incrementProgress());
                img.addEventListener('error', () => this.incrementProgress());
            }
        });
        
        // Monitor Videos
        this.videos.forEach(video => {
            if (video.readyState >= 3) { // HAVE_FUTURE_DATA
                 this.incrementProgress();
            } else {
                // 'canplay' or 'loadeddata' usually enough for "loaded" specific visual presence
                video.addEventListener('loadeddata', () => this.incrementProgress());
                video.addEventListener('error', () => this.incrementProgress());
            }
        });
    }
    
    incrementProgress() {
        this.loadedAssets++;
        const progress = Math.min((this.loadedAssets / this.totalAssets) * 100, 100);
        
        if (this.progressBar) {
            this.progressBar.style.width = `${progress}%`;
        }
        
        if (this.statusText) {
            this.statusText.innerText = `${Math.round(progress)}%`;
        }
        
        if (this.loadedAssets >= this.totalAssets) {
            // Small buffer for smoothness
            setTimeout(() => this.finish(), 500);
        }
    }
    
    finish() {
        // Strict 100% only

        
        if (this.progressBar) this.progressBar.style.width = '100%';
        if (this.statusText) this.statusText.innerText = '100%';
        
        // Fade out
        setTimeout(() => {
            if (this.loadingScreen) {
                this.loadingScreen.classList.add('hidden');
            }
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ResourceLoader();
});
