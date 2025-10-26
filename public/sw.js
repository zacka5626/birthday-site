self.addEventListener('install', event => {
event.waitUntil(
caches.open('birthday-site-v1').then(cache => cache.addAll([
'/', '/index.html', '/sw.js'
]))
);
self.skipWaiting();
});


self.addEventListener('activate', event => {
event.waitUntil(self.clients.claim());
});


self.addEventListener('fetch', event => {
if(event.request.method !== 'GET') return;
event.respondWith(
caches.match(event.request).then(cached => cached || fetch(event.request).then(res => {
// cache fetched assets (basic strategy)
return caches.open('birthday-site-v1').then(cache=>{ try{ cache.put(event.request, res.clone()); }catch(e){} return res; });
}).catch(()=> caches.match('/')))
);
});
