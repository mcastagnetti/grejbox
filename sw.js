const version = "0.1.0";
const cacheName = `grejbox-${version}`;

// Caching homepage and assets.
self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/index.html?homescreen=1',
                '/?homescreen=1',
                '/grej.0.aac',
                '/grej.1.aac',
            ]).then(function() { 
                self.skipWaiting();
            });
        })
    );
});

// Check in our cache and return the cached version of the assets if we have them.
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});