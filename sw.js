// Network-first cache for Sofia's English app
// Strategy: bypass anche HTTP cache del browser (cache:'no-store') così quiz/data
// freschi appena online. Fallback su cache SW solo se offline.
const CACHE = 'sofia-u5-v11';
const ASSETS = ['./', 'index.html', 'style.css', 'app.js', 'data.js', 'manifest.json', 'icon.svg'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS.map(a => new Request(a, {cache: 'reload'})))));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;
  // Bypass HTTP cache del browser: forza fetch fresco dal server ad ogni richiesta
  const freshRequest = new Request(e.request.url, {
    method: 'GET',
    headers: e.request.headers,
    mode: 'same-origin',
    credentials: 'same-origin',
    cache: 'no-store',
    redirect: 'follow'
  });
  e.respondWith(
    fetch(freshRequest).then(res => {
      if (res && res.ok) {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
      }
      return res;
    }).catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
  );
});

self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
});
