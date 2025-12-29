// ============================================
// RESOURCE PRELOADER
// Monitors loading of images and videos
// ============================================
class ResourceLoader {
	constructor() {
		this.loadingScreen = document.getElementById("loading-screen");
		this.progressBar = document.getElementById("progress-bar");
		this.statusText = document.getElementById("loading-status");

		// Manual assets to preload (Background images for hover effects)
		this.manualImagePaths = [
			"img/rightSide/img1.webp",
			"img/rightSide/img2.webp",
			"img/rightSide/img3.webp",
		];

		// Create Image objects for manual assets
		this.manualImages = this.manualImagePaths.map((src) => {
			const img = new Image();
			img.src = src;
			return img;
		});

		// Collect all assets
		this.domImages = Array.from(document.images);
		this.allVideos = Array.from(document.querySelectorAll("video"));

		// Solo el primer video bloqueará el loader
		this.primaryVideo = document.getElementById("vid-1") || this.allVideos[0];

		// Videos secundarios se cargarán en background
		this.backgroundVideos = this.allVideos.filter(
			(v) => v !== this.primaryVideo
		);

		// Combine all images (DOM + Manual)
		this.allImages = [...this.domImages, ...this.manualImages];

		// Total assets = imágenes + solo el video principal
		this.totalAssets = this.allImages.length + (this.primaryVideo ? 1 : 0);
		this.loadedAssets = 0;

		this.init();
	}

	init() {
		if (this.totalAssets === 0) {
			this.finish();
			return;
		}

		console.log(
			`Starting loader. Total assets: ${this.totalAssets} (Images: ${
				this.allImages.length
			}, Primary Video: ${this.primaryVideo ? 1 : 0})`
		);
		console.log(
			`Background videos (${this.backgroundVideos.length}) loading in background...`
		);

		// Monitor All Images (DOM + Manual)
		this.allImages.forEach((img) => {
			if (img.complete) {
				this.incrementProgress();
			} else {
				img.addEventListener("load", () => this.incrementProgress(), {
					once: true,
				});
				img.addEventListener(
					"error",
					() => {
						console.warn("Failed to load image:", img.src);
						this.incrementProgress();
					},
					{ once: true }
				);
			}
		});

		// Monitor ONLY Primary Video (blocks loader)
		if (this.primaryVideo) {
			this.loadVideo(this.primaryVideo, true);
		}

		// Load background videos (non-blocking)
		this.backgroundVideos.forEach((video) => {
			this.loadVideo(video, false);
		});
	}

	// Helper method to load a video
	loadVideo(video, blockLoader = true) {
		// Force preload if not set
		if (video.preload === "none") {
			video.preload = "auto";
		}

		let isVideoLoaded = false;
		let interval = null;

		const onLoaded = () => {
			if (isVideoLoaded) return;
			isVideoLoaded = true;

			if (interval) clearInterval(interval);

			if (blockLoader) {
				this.incrementProgress();
			} else {
				console.log(`Background video loaded: ${video.id || video.src}`);
			}

			video.removeEventListener("canplaythrough", onLoaded);
			video.removeEventListener("error", onError);
		};

		const onError = () => {
			if (isVideoLoaded) return;
			isVideoLoaded = true;

			if (interval) clearInterval(interval);

			console.warn("Failed to load video:", video.currentSrc || video.src);

			if (blockLoader) {
				this.incrementProgress();
			}

			video.removeEventListener("canplaythrough", onLoaded);
			video.removeEventListener("error", onError);
		};

		// Check if already ready (HAVE_ENOUGH_DATA = 4)
		if (video.readyState === 4) {
			onLoaded();
		} else {
			video.addEventListener("canplaythrough", onLoaded);
			video.addEventListener("error", onError);

			// Backup polling in case events don't fire
			interval = setInterval(() => {
				if (video.readyState === 4) {
					onLoaded();
				}
			}, 1000);

			// Trigger load to start buffering
			video.load();
		}
	}

	incrementProgress() {
		this.loadedAssets++;
		// console.log(`Progress: ${this.loadedAssets} / ${this.totalAssets}`);

		const progress = Math.min(
			(this.loadedAssets / this.totalAssets) * 100,
			100
		);

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
		if (this.progressBar) this.progressBar.style.width = "100%";
		if (this.statusText) this.statusText.innerText = "100%";

		// Fade out
		setTimeout(() => {
			if (this.loadingScreen) {
				this.loadingScreen.classList.add("hidden");

				// Optimization: Try to play videos again to ensure they start if autoplay was blocked/waiting
				this.allVideos.forEach((v) => {
					if (v.paused && v.autoplay) {
						v.play().catch((e) => console.log("Autoplay caught:", e));
					}
				});
			}
		}, 500);
	}
}

document.addEventListener("DOMContentLoaded", () => {
	new ResourceLoader();
});
