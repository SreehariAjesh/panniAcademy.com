const CACHE_NAME = 'panni-academy-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/app.js',
  '/Images/32x32.png',
  '/Images/16x16.png',
  '/Images/180x180.png',
  '/manifest.json',
  '/offline.html',  // Optional offline fallback page
];

// Install event - Cache necessary files
self.addEventListener('install', event => {
  console.log('Service Worker installing and caching static assets...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache).then(() => {
        console.log('All required assets are cached.');
        self.skipWaiting(); // Force the waiting service worker to become active
      }).catch(error => {
        console.error('Failed to cache:', error);
      });
    })
  );
});

// Fetch event - Serve from cache or fetch from network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      // Return cached response if found, otherwise fetch from the network
      return cachedResponse || fetch(event.request).catch(() => {
        // If both cache and network fail, show a fallback offline page (optional)
        return caches.match('/offline.html');
      });
    })
  );
});

// Activate event - Clear old caches and activate new service worker
self.addEventListener('activate', event => {
  console.log('Service Worker activating and cleaning old caches...');
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim(); // Take control of all clients immediately
    })
  );
});

// Optional: Listen for push notifications (if needed)
// self.addEventListener('push', function(event) {
//   const options = {
//     body: event.data.text(),
//     icon: '/Images/180x180.png',
//     badge: '/Images/32x32.png'
//   };

//   event.waitUntil(
//     self.registration.showNotification('PANNI Academy Notification', options)
//   );
// });
