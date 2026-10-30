(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const store = {
    get(k, d) { try { const v = localStorage.getItem("cr:" + k); return v ? JSON.parse(v) : d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem("cr:" + k, JSON.stringify(v)); } catch {} }
  };

  const state = {
    city: CITIES.find((c) => c.id === store.get("city")) || CITIES[0],
    cat: "all",
    query: "",
    selected: null,
    markers: new Map(),
    done: store.get("done", {})
  };

  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg; t.hidden = false;
    clearTimeout(toast._t); toast._t = setTimeout(() => (t.hidden = true), 2200);
  }

  async function copy(text) {
    try { await navigator.clipboard.writeText(text); toast("Copiato: " + text); }
    catch { toast("Copia non disponibile"); }
  }

  function speak(text, cantonese) {
    if (!("speechSynthesis" in window)) return toast("Sintesi vocale non disponibile");
    const u = new SpeechSynthesisUtterance(text);
    u.lang = cantonese ? "zh-HK" : "zh-CN";
    u.rate = 0.8;
    speechSynthesis.cancel(); speechSynthesis.speak(u);
  }

  function showCard(zh, py, it) {
    $("#showZh").textContent = zh; $("#showPy").textContent = py || ""; $("#showIt").textContent = it || "";
    $("#showCard").hidden = false;
  }
  $("#showCard").addEventListener("click", () => ($("#showCard").hidden = true));

  // ---------------- Tabs ----------------
  $$(".tabbar button").forEach((b) => b.addEventListener("click", () => {
    $$(".tabbar button").forEach((x) => x.classList.toggle("active", x === b));
    $$(".view").forEach((v) => v.classList.toggle("active", v.id === "view-" + b.dataset.view));
    if (b.dataset.view === "map" && map) map.resize();
  }));

  // ---------------- City selector ----------------
  const sel = $("#citySelect");
  sel.innerHTML = CITIES.map((c) => `<option value="${c.id}">${c.name} ${c.zh}</option>`).join("");
  sel.value = state.city.id;
  sel.addEventListener("change", () => setCity(CITIES.find((c) => c.id === sel.value)));

  // ---------------- Map ----------------
  let map = null, spinning = false, terrainOn = false, is3d = true;

  function initMap() {
    if (!window.maplibregl) { $("#mapFallback").hidden = false; return; }
    map = new maplibregl.Map({
      container: "map",
      style: "https://tiles.openfreemap.org/styles/liberty",
      center: state.city.center, zoom: state.city.zoom, pitch: 55, bearing: -15,
      maxPitch: 80, attributionControl: { compact: true }
    });
    map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), "top-left");
    map.addControl(new maplibregl.GeolocateControl({ positionOptions: { enableHighAccuracy: true }, trackUserLocation: true }), "top-left");

    const failTimer = setTimeout(() => { if (!map.loaded()) $("#mapFallback").hidden = false; }, 12000);
    map.on("load", () => {
      clearTimeout(failTimer);
      $("#mapFallback").hidden = true;
      ensureBuildings();
      map.addSource("dem", {
        type: "raster-dem", encoding: "terrarium", tileSize: 256, maxzoom: 14,
        tiles: ["https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png"]
      });
      renderMarkers();
    });
    map.on("error", (e) => console.warn("map:", e && e.error));
    map.on("dragstart", () => (spinning = false));
  }

  // Liberty includes 3D buildings; if the style changes we add our own extrusion.
  function ensureBuildings() {
    if (map.getLayer("building-3d")) return;
    const src = Object.keys(map.getStyle().sources).find((k) => map.getSource(k).type === "vector");
    if (!src) return;
    map.addLayer({
      id: "building-3d", type: "fill-extrusion", source: src, "source-layer": "building", minzoom: 14,
      paint: {
        "fill-extrusion-color": "#d9d2c5",
        "fill-extrusion-height": ["coalesce", ["get", "render_height"], 10],
        "fill-extrusion-base": ["coalesce", ["get", "render_min_height"], 0],
        "fill-extrusion-opacity": 0.85
      }
    });
  }

  $("#btn3d").addEventListener("click", (e) => {
    if (!map) return;
    is3d = !is3d;
    e.currentTarget.classList.toggle("on", is3d);
    if (map.getLayer("building-3d")) map.setLayoutProperty("building-3d", "visibility", is3d ? "visible" : "none");
    map.easeTo({ pitch: is3d ? 60 : 0, bearing: is3d ? -20 : 0, duration: 800 });
  });

  $("#btnTerrain").addEventListener("click", (e) => {
    if (!map || !map.getSource("dem")) return;
    terrainOn = !terrainOn;
    e.currentTarget.classList.toggle("on", terrainOn);
    map.setTerrain(terrainOn ? { source: "dem", exaggeration: 1.4 } : null);
    if (terrainOn) toast("Rilievo attivo: utile a Chongqing e Hong Kong");
  });

  $("#btnSpin").addEventListener("click", (e) => {
    if (!map) return;
    spinning = !spinning;
    e.currentTarget.classList.toggle("on", spinning);
    const step = () => {
      if (!spinning) { $("#btnSpin").classList.remove("on"); return; }
      map.rotateTo(map.getBearing() + 20, { duration: 2000, easing: (t) => t });
      map.once("moveend", step);
    };
    if (spinning) step();
  });

  function visiblePlaces() {
    const q = state.query.trim().toLowerCase();
    return PLACES.filter((p) => p.city === state.city.id)
      .filter((p) => state.cat === "all" || p.cat === state.cat)
      .filter((p) => !q || [p.name, p.zh, p.py, p.tip].join(" ").toLowerCase().includes(q));
  }

  function renderMarkers() {
    state.markers.forEach((m) => m.remove());
    state.markers.clear();
    if (!map) return;
    visiblePlaces().forEach((p) => {
      const c = CATEGORIES[p.cat];
      const el = document.createElement("div");
      el.className = "marker";
      el.style.background = c.color;
      el.innerHTML = `<span>${c.icon}</span>`;
      el.title = p.name;
      el.addEventListener("click", (ev) => { ev.stopPropagation(); selectPlace(p); });
      const m = new maplibregl.Marker({ element: el, anchor: "bottom" }).setLngLat(p.ll).addTo(map);
      state.markers.set(p.id, m);
    });
  }

  // ---------------- Side panel ----------------
  const chips = $("#catChips");
  chips.innerHTML = [`<button class="chip on" data-cat="all">Tutto</button>`]
    .concat(Object.entries(CATEGORIES).map(([k, c]) => `<button class="chip" data-cat="${k}">${c.icon} ${c.label}</button>`))
    .join("");
  chips.addEventListener("click", (e) => {
    const b = e.target.closest(".chip"); if (!b) return;
    state.cat = b.dataset.cat;
    $$(".chip", chips).forEach((x) => x.classList.toggle("on", x === b));
    refresh();
  });
  $("#search").addEventListener("input", (e) => { state.query = e.target.value; refresh(); });

  const panel = $("#panel");
  $("#panelHandle").addEventListener("click", () => {
    if (panel.classList.contains("expanded")) { panel.classList.remove("expanded"); panel.classList.add("collapsed"); }
    else if (panel.classList.contains("collapsed")) panel.classList.remove("collapsed");
    else panel.classList.add("expanded");
  });

  function renderList() {
    const list = visiblePlaces();
    $("#placeList").innerHTML = list.length ? list.map((p) => {
      const c = CATEGORIES[p.cat];
      return `<li data-id="${p.id}" class="${state.selected === p.id ? "selected" : ""}">
        <div class="place-ico" style="background:${c.color}22">${c.icon}</div>
        <div class="place-txt"><b>${esc(p.name)}</b><small>${esc(p.zh)} · ${c.label}</small></div>
      </li>`;
    }).join("") : `<li class="muted">Nessun risultato.</li>`;
  }
  $("#placeList").addEventListener("click", (e) => {
    const li = e.target.closest("li[data-id]"); if (!li) return;
    selectPlace(PLACES.find((p) => p.id === li.dataset.id));
  });

  function refresh() { renderList(); renderMarkers(); }

  function setCity(city) {
    state.city = city; state.selected = null;
    store.set("city", city.id);
    sel.value = city.id;
    $("#cityIntro").textContent = city.intro;
    refresh();
    if (map) map.flyTo({ center: city.center, zoom: city.zoom, pitch: is3d ? 55 : 0, bearing: -15, duration: 2500, essential: true });
    renderSos();
  }

  function selectPlace(p) {
    state.selected = p.id;
    state.markers.forEach((m, id) => m.getElement().classList.toggle("selected", id === p.id));
    renderList();
    if (map) {
      spinning = false;
      map.flyTo({ center: p.ll, zoom: 16.6, pitch: is3d ? 65 : 0, bearing: map.getBearing() + 30, duration: 2200, essential: true });
    }
    openSheet(p);
  }

  // ---------------- Place sheet ----------------
  function openSheet(p) {
    const city = CITIES.find((c) => c.id === p.city);
    const c = CATEGORIES[p.cat];
    $("#placeBody").innerHTML = `
      <span class="tag">${c.icon} ${c.label}</span><span class="tag">${city.name}</span>
      ${p.metro ? `<span class="tag">🚇 ${esc(p.metro)}</span>` : ""}
      <h3>${esc(p.name)}</h3>
      <p class="zh-big">${esc(p.zh)}</p>
      <p class="py">${esc(p.py)}</p>
      <div class="tip">${esc(p.tip)}</div>
      <div class="actions">
        <button class="btn primary" data-act="show">🚕 Mostra al tassista</button>
        <a class="btn" href="${Geo.navUrl(p, city)}" target="_blank" rel="noopener">🧭 Naviga con Amap</a>
        <a class="btn" href="${Geo.amapUrl(p, city)}" target="_blank" rel="noopener">📍 Apri in Amap</a>
        <button class="btn" data-act="copy">📋 Copia nome 中文</button>
        <button class="btn" data-act="speak">🔊 Pronuncia</button>
        ${city.mainland ? "" : `<a class="btn" href="${Geo.googleUrl(p)}" target="_blank" rel="noopener">🌐 Google Maps</a>`}
      </div>
      <p class="note">${city.mainland
        ? "Per Didi: incolla il nome cinese nella destinazione. Le coordinate per Amap sono già convertite in GCJ-02."
        : "A Hong Kong Google Maps funziona normalmente."}</p>`;
    const body = $("#placeBody");
    body.querySelector('[data-act="show"]').onclick = () =>
      showCard(`请带我去\n${p.zh}`, p.py, `Per favore, portami a: ${p.name}`);
    body.querySelector('[data-act="copy"]').onclick = () => copy(p.zh);
    body.querySelector('[data-act="speak"]').onclick = () => speak(p.zh, !city.mainland);
    $("#placeSheet").hidden = false;
  }
  $("#placeSheet").addEventListener("click", (e) => {
    if (e.target.id === "placeSheet" || e.target.closest("[data-close]")) $("#placeSheet").hidden = true;
  });

  // ---------------- Setup guide ----------------
  function renderGuide() {
    let html = "";
    Object.entries(PHASES).forEach(([phase, title]) => {
      html += `<h3 class="phase-title">${title}</h3>`;
      GUIDE.filter((s) => s.phase === phase).forEach((s) => {
        const done = s.tasks.filter((_, i) => state.done[`${s.id}:${i}`]).length;
        const complete = done === s.tasks.length;
        html += `<details class="step ${complete ? "done" : ""}" data-step="${s.id}">
          <summary>
            <span class="step-ico">${s.icon}</span>
            <span class="step-title">${esc(s.title)}</span>
            <span class="step-count">${complete ? "✓ Fatto" : `${done}/${s.tasks.length}`}</span>
          </summary>
          <div class="step-body">
            <p class="why">${esc(s.why)}</p>
            ${s.tasks.map((t, i) => {
              const k = `${s.id}:${i}`;
              return `<label class="task ${state.done[k] ? "checked" : ""}">
                <input type="checkbox" data-k="${k}" ${state.done[k] ? "checked" : ""}><span>${esc(t)}</span></label>`;
            }).join("")}
            <div class="problems"><h4>Problemi comuni</h4>
              ${s.problems.map((p) => `<div class="problem"><b>${esc(p.q)}</b>${esc(p.a)}</div>`).join("")}
            </div>
            <p class="verify">${esc(s.verify)}</p>
          </div>
        </details>`;
      });
    });
    const open = $$("details.step[open]").map((d) => d.dataset.step);
    $("#guideList").innerHTML = html;
    open.forEach((id) => { const d = $(`details[data-step="${id}"]`); if (d) d.open = true; });
    updateProgress();
  }

  $("#guideList").addEventListener("change", (e) => {
    const k = e.target.dataset.k; if (!k) return;
    if (e.target.checked) state.done[k] = true; else delete state.done[k];
    store.set("done", state.done);
    renderGuide();
  });

  function updateProgress() {
    const all = GUIDE.flatMap((s) => s.tasks.map((_, i) => `${s.id}:${i}`));
    const n = all.filter((k) => state.done[k]).length;
    const pct = Math.round((n / all.length) * 100);
    $("#progressPct").textContent = pct + "%";
    $("#progressBar").style.width = pct + "%";
    const next = GUIDE.find((s) => s.tasks.some((_, i) => !state.done[`${s.id}:${i}`]));
    $("#progressNext").textContent = next
      ? `Prossimo passo: ${next.icon} ${next.title}`
      : "Sei pronto per la Cina! 一路顺风 (buon viaggio)";
  }

  // ---------------- Phrases ----------------
  function renderPhrases() {
    $("#phraseList").innerHTML = PHRASES.map((g, gi) => `
      <div class="phrase-group"><h3>${esc(g.group)}</h3>
        ${g.items.map((p, i) => `<div class="phrase" data-g="${gi}" data-i="${i}">
          <div class="phrase-txt"><div class="zh">${esc(p.zh)}</div><p class="py">${esc(p.py)}</p><div class="it">${esc(p.it)}</div></div>
          <button class="speak" aria-label="Ascolta">🔊</button>
        </div>`).join("")}
      </div>`).join("");
  }
  $("#phraseList").addEventListener("click", (e) => {
    const row = e.target.closest(".phrase"); if (!row) return;
    const g = PHRASES[row.dataset.g], p = g.items[row.dataset.i];
    if (e.target.closest(".speak")) speak(p.zh, g.cantonese);
    else showCard(p.zh, p.py, p.it);
  });

  // ---------------- SOS ----------------
  function renderSos() {
    const nums = state.city.mainland ? EMERGENCY.mainland : EMERGENCY.hk;
    $("#sosContent").innerHTML = `
      <h2 class="section-h">Numeri di emergenza · ${state.city.name}</h2>
      <div class="sos-grid">${nums.map((x) => `<a class="sos-btn" href="tel:${x.n}"><b>${x.n}</b>${esc(x.label)}</a>`).join("")}</div>
      <h2 class="section-h">Frasi rapide</h2>
      <div class="sos-grid">
        <button class="sos-btn" data-sos="救命！|jiùmìng!|Aiuto!"><b>🆘</b>Aiuto</button>
        <button class="sos-btn" data-sos="请叫救护车|qǐng jiào jiùhùchē|Chiamate un'ambulanza"><b>🚑</b>Ambulanza</button>
        <button class="sos-btn" data-sos="我的护照丢了|wǒ de hùzhào diū le|Ho perso il passaporto"><b>🛂</b>Passaporto perso</button>
        <button class="sos-btn" data-sos="我迷路了|wǒ mílù le|Mi sono perso"><b>🧭</b>Mi sono perso</button>
      </div>
      <h2 class="section-h">Rappresentanze italiane e info</h2>
      <div class="link-list">${EMERGENCY.italy.map((x) => `<a href="${x.url}" target="_blank" rel="noopener">${esc(x.label)} ↗</a>`).join("")}</div>
      <p class="muted">Salva i numeri del consolato in rubrica prima di partire: i siti .esteri.it potrebbero caricarsi lentamente dalla Cina.</p>`;
  }
  $("#sosContent").addEventListener("click", (e) => {
    const b = e.target.closest("[data-sos]"); if (!b) return;
    const [zh, py, it] = b.dataset.sos.split("|");
    showCard(zh, py, it);
  });

  // ---------------- Boot ----------------
  initMap();
  setCity(state.city);
  renderGuide();
  renderPhrases();

  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
})();
