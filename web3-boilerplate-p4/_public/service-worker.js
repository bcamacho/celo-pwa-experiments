// - only works with valid HTTPS or http://localhost
// - only grabs requests within its scope
// - only has access to the files on its folder or “below”
const CACHE_NAME = 'sw-cache-example';
const toCache = [
  '/',
  '/index.html',
  '/_js/status.js',
  '/_js/database.js',
];

self.addEventListener('install', function(event) {
  console.log('used to register the service worker')
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(toCache)
      })
      .then(self.skipWaiting())
  )
})

/*
Fetch checks every request that is made on the page.
If there is a match found in the cache — take localhost/,
for example, since we have it cached — it will use the cached version.
In this case, the / is the index.html file,
which will include other resources, such as /js/pwa.js.
This is not in your cache, so a normal request will be
made to the server to fetch the dependencies of that file.
*/
self.addEventListener('fetch', function(event) {
  console.log('used to intercept requests so we can check for the file or data in the cache')
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        return caches.open(CACHE_NAME)
          .then((cache) => {
            return cache.match(event.request)
          })
      })
  )
})

/*
Whenever we update our service worker, we want the old ones to be removed
instead of leaving them hanging in the client’s browser.
This ensures that the old service workers are removed and claims your
newly installed SW as the one to use from now on. */
self.addEventListener('activate', function(event) {
  console.log('this event triggers when the service worker activates')
  event.waitUntil(
    caches.keys()
      .then((keyList) => {
        return Promise.all(keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache', key)
            return caches.delete(key)
          }
        }))
      })
      .then(() => self.clients.claim())
  )
})

// self.addEventListener('message', function(event) {
//   console.log('used to send a message to the service worker')
// })
//
// self.addEventListener('sync', function(event) {
//   console.log('used to sync between server/client')
// })
//
// self.addEventListener('push', function(event) {
//   console.log('this event pushes data to the service worker activates')
// })
