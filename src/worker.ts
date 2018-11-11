const ctx: ServiceWorker = self as any;
const CACHE_NAME = 'sw-cache-v1';
const urlsToCache = ['src.77de5100.js'];

ctx.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

ctx.addEventListener('activate', event => {
    console.log('V1 now ready to handle fetches !');
});

ctx.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) return response;
            const fetchRequest = event.request.clone();
            return fetch(fetchRequest).then(response => {
                if (
                    !response ||
                    response.status !== 200 ||
                    response.type !== 'basic'
                ) {
                    return response;
                }

                const responseToCache = response.clone();
                caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, responseToCache);
                });

                return response;
            });
        })
    );
});
