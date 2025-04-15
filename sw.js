const CACHE_NAME = 'tigerscore-v2';
const urlsToCache = [
  '/TigerScore/',
  '/TigerScore/index.html',
  '/TigerScore/manifest.json',
  '/TigerScore/styles/main.css',
  '/TigerScore/styles/game.css',
  '/TigerScore/styles/splash.css',
  '/TigerScore/app.js',
  '/TigerScore/components/Header.js',
  '/TigerScore/components/GameSetup.js',
  '/TigerScore/components/Scoreboard.js',
  '/TigerScore/components/PlayerScore.js',
  '/TigerScore/components/NumberPad.js',
  '/TigerScore/components/VictoryPopup.js',
  '/TigerScore/components/ScoreHistory.js',
  '/TigerScore/components/GameControls.js',
  '/TigerScore/utils/gameLogic.js',
  '/TigerScore/utils/storage.js',
  '/TigerScore/utils/gameStats.js',
  '/TigerScore/assets/TigerScore_Icon.png',
  'https://app.trickle.so/storage/public/images/usr_0edcd6d6a0000001/64d109f4-e371-498b-967e-d89d998c59c1.png',
  'https://app.trickle.so/storage/public/images/usr_0edcd6d6a0000001/1c94e046-d7be-4e37-89dc-7b55e3066fc8.png',
  'https://resource.trickle.so/vendor_lib/unpkg/react@18/umd/react.production.min.js',
  'https://resource.trickle.so/vendor_lib/unpkg/react-dom@18/umd/react-dom.production.min.js',
  'https://resource.trickle.so/vendor_lib/unpkg/@babel/standalone/babel.min.js',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request)
          .then(response => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response as it can only be consumed once
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // Return a fallback response for offline access
            if (event.request.url.indexOf('.html') > -1) {
              return caches.match('/index.html');
            }
          });
      })
  );
}); 