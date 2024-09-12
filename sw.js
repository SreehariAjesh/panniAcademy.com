const cacheName = 'pwa-cache-v1';
const filesToCache = [
  '/',
  'index.html',
  'styles.css',
  'app.js',
  'manifest.json',
  'images/6262d795-9c1a-4c99-9423-cd1499fce84c.png',
  'images/6262d795-9c1a-4c99-9423-cd1499fce84c (1).png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
