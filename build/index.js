var E = Object.defineProperty;
var k = (a, t, n) => t in a ? E(a, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : a[t] = n;
var o = (a, t, n) => k(a, typeof t != "symbol" ? t + "" : t, n);
const M = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>pause</title><path d="M14,19H18V5H14M6,19H10V5H6V19Z" /></svg>', V = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>play</title><path d="M8,5.14V19.14L19,12.14L8,5.14Z" /></svg>', B = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>reload</title><path d="M2 12C2 16.97 6.03 21 11 21C13.39 21 15.68 20.06 17.4 18.4L15.9 16.9C14.63 18.25 12.86 19 11 19C4.76 19 1.64 11.46 6.05 7.05C10.46 2.64 18 5.77 18 12H15L19 16H19.1L23 12H20C20 7.03 15.97 3 11 3C6.03 3 2 7.03 2 12Z" /></svg>', N = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>skip-backward</title><path d="M20,5V19L13,12M6,5V19H4V5M13,5V19L6,12" /></svg>', H = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>skip-forward</title><path d="M4,5V19L11,12M18,5V19H20V5M11,5V19L18,12" /></svg>', x = "rgb(204, 204, 204)", v = (a) => {
  const t = document.createElement("img");
  return t.src = `data:image/svg+xml,${encodeURIComponent(a)}`, t.style.width = "24px", t.style.height = "24px", t;
};
let C;
const S = ({
  length: a,
  interval: t,
  onSliderValueChange: n
}) => {
  const i = document.createElement("div");
  i.classList.add("maplibregl-ctrl"), i.classList.add("maplibregl-ctrl-group"), i.style.width = "240px", i.style.height = "84px", i.style.backgroundColor = "#fff", i.style.textAlign = "center";
  const l = document.createElement("div");
  l.innerHTML = "<br />", l.style.marginTop = "4px", i.appendChild(l);
  const e = document.createElement("input");
  e.type = "range", e.value = "0", e.min = "0", e.max = String(a - 1), e.addEventListener("input", () => {
    n();
  }), e.style.width = "80%", e.style.margin = "4px 0", i.appendChild(e);
  const s = document.createElement("div");
  s.style.display = "flex", s.style.justifyContent = "center", s.style.margin = "4px 0 0 0";
  const c = (f) => {
    r.style.backgroundColor = f ? x : "";
  }, y = () => r.style.backgroundColor === x, r = document.createElement("button");
  r.appendChild(v(B)), r.style.border = "0", r.style.borderRadius = "0", r.style.marginRight = "16px", r.style.height = "24px", r.style.borderRadius = "4px", r.onclick = () => c(!y()), s.appendChild(r);
  const u = () => (e.value = String(Math.max(0, Number(e.value) - 1)), n(), Number(e.min) < Number(e.value)), g = () => {
    if (r.style.backgroundColor !== "" && Number(e.value) == Number(e.max))
      for (; u(); )
        ;
    else
      e.value = String(
        Math.min(Number(e.max), Number(e.value) + 1)
      );
    return n(), Number(e.value) < Number(e.max);
  }, m = document.createElement("button");
  m.appendChild(v(N)), m.onclick = u, m.style.border = "0", m.style.height = "24px", m.style.borderRadius = "4px";
  const b = () => {
    C !== void 0 && (clearInterval(C), C = void 0, p.onclick = null, d.style.backgroundColor = "");
  }, p = document.createElement("button");
  p.appendChild(v(M)), p.style.border = "0", p.style.height = "24px", p.style.borderRadius = "4px", p.onclick = b;
  const w = () => d.style.backgroundColor === x, L = () => {
    w() || (d.style.backgroundColor = x, C = setInterval(() => {
      g();
    }, t));
  }, d = document.createElement("button");
  d.appendChild(v(V)), d.style.border = "0", d.style.height = "24px", d.style.borderRadius = "4px", d.onclick = L;
  const h = document.createElement("button");
  return h.appendChild(v(H)), h.style.border = "0", h.style.height = "24px", h.style.borderRadius = "4px", h.onclick = g, s.appendChild(m), s.appendChild(p), s.appendChild(d), s.appendChild(h), i.appendChild(s), {
    container: i,
    titleDiv: l,
    slider: e,
    increment: g,
    decrement: u,
    isPlaying: w,
    play: L,
    pause: b,
    isLoopEnabled: y,
    setLoopEnabled: c
  };
};
class R {
  constructor(t, n = {}) {
    o(this, "map");
    o(this, "options");
    o(this, "container");
    o(this, "containerTitle");
    o(this, "temporalSlider");
    o(this, "temporalFrames");
    o(this, "next");
    o(this, "prev");
    o(this, "play");
    o(this, "pause");
    o(this, "isPlaying");
    o(this, "isLoopEnabled");
    o(this, "setLoopEnabled");
    o(this, "goto");
    this.temporalFrames = t, this.options = n;
    const i = {
      length: this.temporalFrames.length,
      interval: this.options.interval || 500,
      onSliderValueChange: () => this.refresh()
    }, {
      container: l,
      titleDiv: e,
      slider: s,
      increment: c,
      decrement: y,
      play: r,
      pause: u,
      isPlaying: g,
      isLoopEnabled: m,
      setLoopEnabled: b
    } = S(i);
    this.container = l, this.containerTitle = e, this.temporalSlider = s, this.next = c, this.prev = y, this.play = r, this.pause = u, this.isPlaying = g, this.isLoopEnabled = m, this.setLoopEnabled = b, this.goto = (p) => {
      s.value = String(
        Math.min(this.temporalFrames.length - 1, Math.max(0, p))
      ), this.refresh();
    };
  }
  onAdd(t) {
    return this.map = t, t.getContainer().appendChild(this.container), this.map.once("styledata", () => {
      this.refresh();
    }), this.container;
  }
  onRemove() {
    var t;
    (t = this.container.parentNode) == null || t.removeChild(this.container), this.map = void 0;
  }
  getDefaultPosition() {
    return "bottom-left";
  }
  refresh() {
    const t = Number(this.temporalSlider.value);
    this.containerTitle.innerHTML = this.temporalFrames[t].title;
    const n = this.temporalFrames[t].layers.map(
      (i) => i.id
    );
    this.temporalFrames.forEach((i) => {
      i.layers.forEach(
        (l) => this.setVisible(l, n.includes(l.id))
      );
    });
  }
  setVisible(t, n = !0) {
    var i, l, e, s;
    if (t.type === "raster" || t.type === "fill" || t.type === "circle" || t.type === "line") {
      t.type === "raster" && ((i = this.map) == null || i.setPaintProperty(
        t.id,
        `${t.type}-opacity-transition`,
        {
          // set disable fade-in transition
          duration: 0
        }
      ));
      let c;
      n ? c = ((l = t.paint) == null ? void 0 : l[`${t.type}-opacity`]) || 1 : c = this.options.performance ? 1e-21 : 0, (e = this.map) == null || e.setPaintProperty(t.id, `${t.type}-opacity`, c);
    } else
      (s = this.map) == null || s.setLayoutProperty(
        t.id,
        "visibility",
        n ? "visible" : "none"
      );
  }
}
export {
  R as default
};
//# sourceMappingURL=index.js.map
