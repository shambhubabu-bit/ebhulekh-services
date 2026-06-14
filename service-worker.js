const CACHE_NAME = "ebhulekh-v1";

const urlsToCache = [
    "./",
    "./index.html",
    "./amin-calculator.html",
    "./laggi-converter.html",
    "./dynamic-unit-converter.html",
    "./length-converter.html",
    "./logo.png"
];

// Install Event
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(urlsToCache);
        })
    );

    self.skipWaiting();
});

// Activate Event
self.addEventListener("activate", event => {

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {

                    if(cache !== CACHE_NAME){
                        return caches.delete(cache);
                    }

                })
            );
        })
    );

    self.clients.claim();

});

// Fetch Event
self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)
        .then(response => {

            return response || fetch(event.request);

        })

    );

});