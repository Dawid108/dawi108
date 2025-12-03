self.addEventListener("install", e => {
  console.log("Service Worker: install");
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  console.log("Service Worker: activate");
});
