// Firebase Messaging Service Worker
self.addEventListener("push", (event) => {
    const notif = event.data.json().notification;

    event.waitUntil(self.registration.showNotification(notif.title , {
        body: notif.body,
        icon: notif.icon || https://sreehariajesh.github.io/panniAcademy.com/Images/32x32.png
        data: {
            url: notif.click_action || https://sreehariajesh.github.io/panniAcademy.com/
        }
    }));
});

self.addEventListener("notificationclick", (event) => {
    event.waitUntil(clients.openWindow(event.notification.data.url));
});

const CACHE_NAME = 'panni-academy-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/app.js',
  '/Images/32x32.png',
  '/Images/16x16.png',
  '/Images/180x180.png',
  '/manifest.json',
  '/panniGame.html', 
  '/chess.html'
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
      return cachedResponse || fetch(event.request).catch(() => {
        // Optional: If an offline page exists, return it.
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
          if (!cacheWhitelist.includes(cacheName)) {
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

// Push Notification Event
self.addEventListener('push', function(event) {
  const data = event.data.json(); 
  console.log('Received push message:', data);

  const notificationOptions = {
    body: data.message,
    icon: '/path/to/your/icon.png'
  };
  self.registration.showNotification(data.title, notificationOptions);
});


