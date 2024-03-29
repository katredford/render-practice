// TODO: Create a service worker that caches static assets:

const cache_name = 'cache-v1'
const urlsToCache = [
  '/index.html',
  '/',
  '/css/style.css',
  '/index.js',
  '/images/logo.png'
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cache_name).then((cache) => cache.addAll(urlsToCache))
  )
})

// Activate - the service worker is activated after install.
self.addEventListener('activate', (e) =>
  e.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  )
);

// Claim - the service worker is claimed after install.
// When a service worker is initially registered, pages won't use it until the next load.
// The clients.claim() method is used to claim the service worker immediately.
self.addEventListener('activate', (e) => {
  e.waitUntil(clients.claim());
});

// Example of a simple cache-first network-first strategy
// The service worker is checking the cache for a response and if it doesn't find it, it fetches it.
self.addEventListener('fetch', (e) =>
  e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)))
);
