// WGS-84 -> GCJ-02 (il sistema "offuscato" obbligatorio per le mappe in Cina continentale).
// Senza conversione i pin su Amap/Didi risultano spostati di 300–600 m.
(function () {
  const PI = Math.PI, A = 6378245.0, EE = 0.00669342162296594323;

  function tLat(x, y) {
    let r = -100 + 2 * x + 3 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
    r += (20 * Math.sin(6 * x * PI) + 20 * Math.sin(2 * x * PI)) * 2 / 3;
    r += (20 * Math.sin(y * PI) + 40 * Math.sin(y / 3 * PI)) * 2 / 3;
    r += (160 * Math.sin(y / 12 * PI) + 320 * Math.sin(y * PI / 30)) * 2 / 3;
    return r;
  }
  function tLng(x, y) {
    let r = 300 + x + 2 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
    r += (20 * Math.sin(6 * x * PI) + 20 * Math.sin(2 * x * PI)) * 2 / 3;
    r += (20 * Math.sin(x * PI) + 40 * Math.sin(x / 3 * PI)) * 2 / 3;
    r += (150 * Math.sin(x / 12 * PI) + 300 * Math.sin(x / 30 * PI)) * 2 / 3;
    return r;
  }

  function wgsToGcj([lng, lat]) {
    let dLat = tLat(lng - 105, lat - 35), dLng = tLng(lng - 105, lat - 35);
    const rad = lat / 180 * PI;
    let magic = 1 - EE * Math.sin(rad) ** 2;
    const sq = Math.sqrt(magic);
    dLat = (dLat * 180) / ((A * (1 - EE)) / (magic * sq) * PI);
    dLng = (dLng * 180) / (A / sq * Math.cos(rad) * PI);
    return [lng + dLng, lat + dLat];
  }

  // Hong Kong non usa GCJ-02: si converte solo per la Cina continentale.
  window.Geo = {
    toAmap(place, city) { return city.mainland ? wgsToGcj(place.ll) : place.ll; },
    amapUrl(place, city) {
      const [lng, lat] = this.toAmap(place, city);
      const name = encodeURIComponent(place.zh);
      return `https://uri.amap.com/marker?position=${lng.toFixed(6)},${lat.toFixed(6)}&name=${name}&coordinate=gaode&callnative=1&src=chinaguide`;
    },
    navUrl(place, city) {
      const [lng, lat] = this.toAmap(place, city);
      return `https://uri.amap.com/navigation?to=${lng.toFixed(6)},${lat.toFixed(6)},${encodeURIComponent(place.zh)}&mode=car&coordinate=gaode&callnative=1&src=chinaguide`;
    },
    googleUrl(place) {
      const [lng, lat] = place.ll;
      return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    }
  };
})();
