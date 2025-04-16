const CACHE_NAME = 'tigerscore-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/app.js',
  '/styles/main.css',
  '/styles/game.css',
  '/styles/splash.css',
  '/components/Header.js',
  '/components/GameSetup.js',
  '/components/Scoreboard.js',
  '/components/PlayerScore.js',
  '/components/GameControls.js',
  '/components/GameHistory.js',
  '/components/GameStats.js',
  '/components/GameSettings.js',
  '/components/GameOver.js',
  '/components/GameModeSelector.js',
  '/components/TeamSetup.js',
  '/utils/checkoutRoutes.js',
  '/assets/TigerScore_Icon.png',
  '/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
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
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            return response;
          });
      })
  );
}); 