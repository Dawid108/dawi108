const CACHE_NAME = 'cypr-guide-v1';
const ASSETS = [
  './',
  './20260716_cypr.html', // upewnij się, że nazwa pliku się zgadza
];

// Instalacja Service Workera i zapisanie plików w cache
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Aktywacja i czyszczenie starego cache
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Serwowanie plików z cache, gdy nie ma internetu
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request);
    })
  );
});
