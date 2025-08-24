const CACHE_NAME = 'pwa-tracker-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  'https://unpkg.com/leaflet@1.9.3/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.3/dist/leaflet.js'
];

// Install SW and cache essential assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

// Activate - clean old caches if any
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

// Fetch handler - respond with cache if possible
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResp) => {
      return cachedResp || fetch(event.request);
    })
  );
});
