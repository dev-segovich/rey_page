// ============================================
// SERVICE WORKER - CACHE STRATEGY
// Cache-first for videos, Network-first for HTML
// ============================================

const CACHE_NAME = "rey-vivas-v2";
const VIDEO_CACHE = "rey-vivas-videos-v2";

// Assets que se cachearán bajo demanda (lazy caching)
// Ya no intentamos pre-cachearlos durante la instalación para evitar problemas con rutas

// Install event - skip waiting immediately
self.addEventListener("install", (event) => {
	console.log("[Service Worker] Installing...");

	event.waitUntil(
		Promise.resolve().then(() => {
			console.log("[Service Worker] Installed - Ready for lazy caching");
			return self.skipWaiting();
		})
	);
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
	console.log("[Service Worker] Activating...");

	event.waitUntil(
		caches
			.keys()
			.then((cacheNames) => {
				return Promise.all(
					cacheNames.map((cacheName) => {
						if (cacheName !== CACHE_NAME && cacheName !== VIDEO_CACHE) {
							console.log("[Service Worker] Deleting old cache:", cacheName);
							return caches.delete(cacheName);
						}
					})
				);
			})
			.then(() => {
				console.log("[Service Worker] Activated");
				return self.clients.claim();
			})
	);
});

// Fetch event - implement caching strategies
self.addEventListener("fetch", (event) => {
	const { request } = event;
	const url = new URL(request.url);

	// Strategy for VIDEOS: Cache-first (aggressive caching)
	if (
		request.url.includes("/videos/") ||
		request.url.endsWith(".mp4") ||
		request.url.endsWith(".webm")
	) {
		event.respondWith(
			caches.open(VIDEO_CACHE).then((cache) => {
				return cache.match(request).then((cachedResponse) => {
					if (cachedResponse) {
						console.log(
							"[Service Worker] Serving video from cache:",
							request.url
						);
						return cachedResponse;
					}

					console.log(
						"[Service Worker] Fetching and caching video:",
						request.url
					);
					return fetch(request).then((networkResponse) => {
						// Clone the response before caching
						// FIX: Don't cache partial responses (206) to avoid errors
						if (networkResponse.status === 200) {
							cache.put(request, networkResponse.clone());
						}
						return networkResponse;
					});
				});
			})
		);
		return;
	}

	// Strategy for IMAGES: Cache-first
	if (
		request.url.includes("/img/") ||
		request.url.endsWith(".jpg") ||
		request.url.endsWith(".jpeg") ||
		request.url.endsWith(".png") ||
		request.url.endsWith(".webp") ||
		request.url.endsWith(".svg")
	) {
		event.respondWith(
			caches.match(request).then((cachedResponse) => {
				if (cachedResponse) {
					return cachedResponse;
				}

				return fetch(request).then((networkResponse) => {
					return caches.open(CACHE_NAME).then((cache) => {
						if (networkResponse.status === 200) {
							cache.put(request, networkResponse.clone());
						}
						return networkResponse;
					});
				});
			})
		);
		return;
	}

	// Strategy for FONTS: Cache-first (long-term caching)
	if (
		request.url.includes("/fonts/") ||
		request.url.endsWith(".ttf") ||
		request.url.endsWith(".woff") ||
		request.url.endsWith(".woff2") ||
		request.url.endsWith(".otf")
	) {
		event.respondWith(
			caches.match(request).then((cachedResponse) => {
				if (cachedResponse) {
					return cachedResponse;
				}

				return fetch(request).then((networkResponse) => {
					return caches.open(CACHE_NAME).then((cache) => {
						if (networkResponse.status === 200) {
							cache.put(request, networkResponse.clone());
						}
						return networkResponse;
					});
				});
			})
		);
		return;
	}

	// Strategy for CSS/JS: Cache-first with network fallback
	if (request.url.endsWith(".css") || request.url.endsWith(".js")) {
		event.respondWith(
			caches.match(request).then((cachedResponse) => {
				if (cachedResponse) {
					return cachedResponse;
				}

				return fetch(request).then((networkResponse) => {
					return caches.open(CACHE_NAME).then((cache) => {
						if (networkResponse.status === 200) {
							cache.put(request, networkResponse.clone());
						}
						return networkResponse;
					});
				});
			})
		);
		return;
	}

	// Strategy for HTML: Network-first (to get latest content)
	if (request.url.endsWith(".html") || request.mode === "navigate") {
		event.respondWith(
			fetch(request)
				.then((networkResponse) => {
					return caches.open(CACHE_NAME).then((cache) => {
						if (networkResponse.status === 200) {
							cache.put(request, networkResponse.clone());
						}
						return networkResponse;
					});
				})
				.catch(() => {
					return caches.match(request);
				})
		);
		return;
	}

	// Default: Network-first
	event.respondWith(
		fetch(request).catch(() => {
			return caches.match(request);
		})
	);
});
