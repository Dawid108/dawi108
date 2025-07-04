const CACHE_NAME = "norwegia-v1";
const urlsToCache = [
  "https://dawid108.github.io/dawi108/20250703_norwegia.html",
  "https://dawid108.github.io/dawi108/20250704_manifest.json",
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});