self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('chatgpt-app').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/manifest.json',
        '/favicon.ico',
        '/icon.png',
        '/static/js/bundle.js',
        '/static/js/1.chunk.js',
        '/static/js/main.chunk.js',
        // Добавь здесь другие ресурсы, которые хочешь кэшировать
      ]);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request);
    })
  );
});
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('chatgpt-app').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/manifest.json',
        '/favicon.ico',
        '/icon.png',
        '/static/js/bundle.js',
        '/static/js/1.chunk.js',
        '/static/js/main.chunk.js',
      ]);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request);
    })
  );
});
self.addEventListener('install', e => {
  e.waitUntil(caches.open('v1').then(c => c.addAll(['/', '/mkk-/', '/mkk-/index.html'])));
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});