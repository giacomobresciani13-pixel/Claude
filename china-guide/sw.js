// Cache dell'app: guida, frasi e SOS funzionano anche offline (la mappa no).
const CACHE = "china-ready-v1";
const SHELL = [
  "./", "./index.html", "./css/style.css", "./js/app.js", "./js/geo.js",
  "./js/data/places.js", "./js/data/guide.js", "./manifest.json", "./icons/icon.svg",
  "https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.js",
  "https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.css"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  const isShell = url.origin === location.origin || url.hostname === "unpkg.com";
  if (e.request.method !== "GET" || !isShell) return;
  e.respondWith(
    fetch(e.request)
      .then((res) => { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(e.request, copy)); return res; })
      .catch(() => caches.match(e.request))
  );
});
