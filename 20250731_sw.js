const CACHE_NAME = 'madery-cache-v1';
const urlsToCache = [
  '20250731_madera.html',
  '20250731_manifest.json'
];

// Instalacja SW i cachowanie plików
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Obsługa zapytań – najpierw z cache, potem z sieci
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
