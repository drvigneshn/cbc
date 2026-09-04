const CACHE = 'cbc-v5.2.3';
const CORE = ['./','index.html','about.html','privacy.html','dose-reference.html','manifest.webmanifest','icon.svg','icon-192.png','icon-512.png','apple-touch-icon.png','favicon-32.png'];
self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE).catch(()=>{})));
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;   // let the usage counter etc. hit the network
  e.respondWith(
    caches.match(req).then(cached => {
      const net = fetch(req).then(res => {
        if (res && res.status === 200) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
        return res;
      }).catch(() => cached || caches.match('./'));
      return cached || net;
    })
  );
});
