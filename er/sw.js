// Retired: the ER app moved to https://er.pediaos.com. This worker replaces the old /er/ one on
// returning devices: it clears the old offline copy, takes over any open /er/ page (even one a
// stale cache served) and answers every /er/ page load with a redirect to the new site.
const TARGET = 'https://er.pediaos.com/';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k.startsWith('perc-')).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
      .then(() => self.clients.matchAll({ type: 'window' }))
      .then(cs => Promise.all(cs.map(c => c.navigate(c.url).catch(() => {}))))
  );
});
self.addEventListener('fetch', e => {
  if (e.request.mode === 'navigate') e.respondWith(Response.redirect(TARGET, 302));
});
