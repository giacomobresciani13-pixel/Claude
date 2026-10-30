# China Ready 中

Guida web (installabile su telefono come PWA) per chi va in Cina per la prima volta.
Città: Shenzhen, Hong Kong, Guangzhou, Xi'an, Chengdu, Chongqing.

## Funzioni
- **Mappa 3D** (MapLibre + OpenFreeMap): edifici 3D, rilievo del terreno, rotazione, geolocalizzazione.
- **Luoghi e ristoranti** per città con nome cinese, pinyin, metro e consiglio pratico.
- **"Mostra al tassista"**: nome in cinese a schermo intero.
- **Apri/Naviga in Amap** con coordinate convertite WGS-84 → GCJ-02 (`js/geo.js`), così il pin è nel punto giusto.
- **Setup interattivo**: visto, eSIM, Alipay, WeChat, Amap, Didi, treni, cibo, arrivo, Hong Kong — con checklist salvata sul dispositivo e problemi comuni.
- **Frasi** con pronuncia (sintesi vocale) e **SOS** con numeri di emergenza e consolati.
- Guida, frasi e SOS funzionano **offline** (service worker).

## Avvio locale
```bash
cd china-guide && python3 -m http.server 8000
# apri http://localhost:8000
```

## Aggiungere un luogo
In `js/data/places.js`, coordinate **WGS-84** (quelle di Google Maps fuori dalla Cina / OpenStreetMap):
```js
{ id: "cd-xxx", city: "chengdu", cat: "eat", name: "…", zh: "…", py: "…", ll: [lng, lat], tip: "…", metro: "…" }
```

## Limiti noti / prossimi passi
- Le tile di OpenFreeMap dalla Cina possono essere lente: per un'app in produzione usare l'SDK Amap (3D nativo, dati locali).
- Alcuni luoghi "cibo" indicano una zona o un piatto tipico, non un locale preciso: da completare con i tuoi ristoranti preferiti.
- Regole su visti e commissioni cambiano spesso: verificarle prima di ogni pubblicazione.
