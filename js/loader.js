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
		this.videos = Array.from(document.querySelectorAll("video"));

		// Combine all images (DOM + Manual)
		this.allImages = [...this.domImages, ...this.manualImages];

		this.totalAssets = this.allImages.length + this.videos.length;
		this.loadedAssets = 0;

		this.init();
	}

	init() {
		if (this.totalAssets === 0) {
			this.finish();
			return;
		}

		console.log(
			`Starting loader. Total assets: ${this.totalAssets} (Images: ${this.allImages.length}, Videos: ${this.videos.length})`
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

		// Monitor Videos - STRICT CHECK
		this.videos.forEach((video) => {
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

				this.incrementProgress();
				video.removeEventListener("canplaythrough", onLoaded);
				video.removeEventListener("error", onError);
			};

			const onError = () => {
				if (isVideoLoaded) return;
				isVideoLoaded = true;

				if (interval) clearInterval(interval);

				console.warn("Failed to load video:", video.currentSrc || video.src);
				this.incrementProgress();
				video.removeEventListener("canplaythrough", onLoaded);
				video.removeEventListener("error", onError);
			};

			// Check if already ready (HAVE_ENOUGH_DATA = 4)
			if (video.readyState === 4) {
				onLoaded();
			} else {
				video.addEventListener("canplaythrough", onLoaded);
				video.addEventListener("error", onError);

				// Backup: sometimes canplaythrough doesn't fire if it quickly went to readyState 4
				// We poll readyState just in case events were missed or browser quirks
				interval = setInterval(() => {
					if (video.readyState === 4) {
						onLoaded();
					}
				}, 1000);

				// Also trigger load so it actually buffers
				video.load();
			}
		});
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
				this.videos.forEach((v) => {
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
