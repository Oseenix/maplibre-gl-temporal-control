var mn = Object.defineProperty;
var vn = (n, e, t) => e in n ? mn(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var k = (n, e, t) => vn(n, typeof e != "symbol" ? e + "" : e, t);
const bn = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>pause</title><path d="M14,19H18V5H14M6,19H10V5H6V19Z" /></svg>', wn = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>play</title><path d="M8,5.14V19.14L19,12.14L8,5.14Z" /></svg>', kn = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>reload</title><path d="M2 12C2 16.97 6.03 21 11 21C13.39 21 15.68 20.06 17.4 18.4L15.9 16.9C14.63 18.25 12.86 19 11 19C4.76 19 1.64 11.46 6.05 7.05C10.46 2.64 18 5.77 18 12H15L19 16H19.1L23 12H20C20 7.03 15.97 3 11 3C6.03 3 2 7.03 2 12Z" /></svg>', Cn = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>skip-backward</title><path d="M20,5V19L13,12M6,5V19H4V5M13,5V19L6,12" /></svg>', En = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>skip-forward</title><path d="M4,5V19L11,12M18,5V19H20V5M11,5V19L18,12" /></svg>', de = "rgb(204, 204, 204)", re = (n) => {
  const e = document.createElement("img");
  return e.src = `data:image/svg+xml,${encodeURIComponent(n)}`, e.style.width = "24px", e.style.height = "24px", e;
};
let ye;
const Mn = ({
  length: n,
  interval: e,
  onSliderValueChange: t
}) => {
  const r = document.createElement("div");
  r.classList.add("maplibregl-ctrl"), r.classList.add("maplibregl-ctrl-group"), r.style.width = "calc(min((500% - 29px), 260px))", r.style.height = "84px", r.style.backgroundColor = "rgba(0, 36, 71, 0.8)", r.style.textAlign = "center";
  const i = document.createElement("div");
  i.innerHTML = "<br />", i.style.marginTop = "4px", r.appendChild(i);
  const s = document.createElement("input");
  s.type = "range", s.value = "0", s.min = "0", s.max = String(n - 1), s.addEventListener("input", () => {
    t();
  }), s.style.width = "80%", s.style.margin = "4px 0", r.appendChild(s);
  const o = document.createElement("div");
  o.style.display = "flex", o.style.justifyContent = "center", o.style.margin = "4px 0 0 0";
  const a = (B) => {
    u.style.backgroundColor = B ? de : "";
  }, l = () => u.style.backgroundColor === de, u = document.createElement("button");
  u.appendChild(re(kn)), u.style.border = "0", u.style.borderRadius = "0", u.style.marginRight = "16px", u.style.height = "24px", u.style.borderRadius = "4px", u.onclick = () => a(!l()), o.appendChild(u);
  const c = () => (s.value = String(Math.max(0, Number(s.value) - 1)), t(), Number(s.min) < Number(s.value)), f = () => {
    if (u.style.backgroundColor !== "" && Number(s.value) == Number(s.max))
      for (; c(); )
        ;
    else
      s.value = String(
        Math.min(Number(s.max), Number(s.value) + 1)
      );
    return t(), Number(s.value) < Number(s.max);
  }, y = document.createElement("button");
  y.appendChild(re(Cn)), y.onclick = c, y.style.border = "0", y.style.height = "24px", y.style.borderRadius = "4px";
  const p = () => {
    ye !== void 0 && (clearInterval(ye), ye = void 0, d.onclick = null, I.style.backgroundColor = "");
  }, d = document.createElement("button");
  d.appendChild(re(bn)), d.style.border = "0", d.style.height = "24px", d.style.borderRadius = "4px", d.onclick = p;
  const w = () => I.style.backgroundColor === de, M = () => {
    w() || (I.style.backgroundColor = de, ye = setInterval(() => {
      f();
    }, e));
  }, I = document.createElement("button");
  I.appendChild(re(wn)), I.style.border = "0", I.style.height = "24px", I.style.borderRadius = "4px", I.onclick = M;
  const A = document.createElement("button");
  return A.appendChild(re(En)), A.style.border = "0", A.style.height = "24px", A.style.borderRadius = "4px", A.onclick = f, o.appendChild(y), o.appendChild(d), o.appendChild(I), o.appendChild(A), r.appendChild(o), {
    container: r,
    titleDiv: i,
    slider: s,
    increment: f,
    decrement: c,
    isPlaying: w,
    play: M,
    pause: p,
    isLoopEnabled: l,
    setLoopEnabled: a
  };
};
class Wr {
  constructor(e, t = {}) {
    k(this, "map");
    k(this, "options");
    k(this, "container");
    k(this, "containerTitle");
    k(this, "temporalSlider");
    k(this, "temporalFrames");
    k(this, "next");
    k(this, "prev");
    k(this, "play");
    k(this, "pause");
    k(this, "isPlaying");
    k(this, "isLoopEnabled");
    k(this, "setLoopEnabled");
    k(this, "goto");
    this.temporalFrames = e, this.options = t;
    const r = {
      length: this.temporalFrames.length,
      interval: this.options.interval || 500,
      onSliderValueChange: () => this.refresh()
    }, {
      container: i,
      titleDiv: s,
      slider: o,
      increment: a,
      decrement: l,
      play: u,
      pause: c,
      isPlaying: f,
      isLoopEnabled: y,
      setLoopEnabled: p
    } = Mn(r);
    this.container = i, this.containerTitle = s, this.temporalSlider = o, this.next = a, this.prev = l, this.play = u, this.pause = c, this.isPlaying = f, this.isLoopEnabled = y, this.setLoopEnabled = p, this.goto = (d) => {
      o.value = String(
        Math.min(this.temporalFrames.length - 1, Math.max(0, d))
      ), this.refresh();
    };
  }
  onAdd(e) {
    return this.map = e, e.getContainer().appendChild(this.container), this.map.once("styledata", () => {
      this.refresh();
    }), this.container;
  }
  onRemove() {
    var e;
    (e = this.container.parentNode) == null || e.removeChild(this.container), this.map = void 0;
  }
  getDefaultPosition() {
    return "bottom-left";
  }
  refresh() {
    const e = Number(this.temporalSlider.value);
    this.containerTitle.innerHTML = this.temporalFrames[e].title;
    const t = this.temporalFrames[e].layers.map(
      (r) => r.id
    );
    this.temporalFrames.forEach((r) => {
      r.layers.forEach(
        (i) => this.setVisible(i, t.includes(i.id))
      );
    });
  }
  setVisible(e, t = !0) {
    var r, i, s, o;
    if (e.type === "raster" || e.type === "fill" || e.type === "circle" || e.type === "line") {
      e.type === "raster" && ((r = this.map) == null || r.setPaintProperty(
        e.id,
        `${e.type}-opacity-transition`,
        {
          // set disable fade-in transition
          duration: 0
        }
      ));
      let a;
      t ? a = ((i = e.paint) == null ? void 0 : i[`${e.type}-opacity`]) || 1 : a = this.options.performance ? 1e-21 : 0, (s = this.map) == null || s.setPaintProperty(e.id, `${e.type}-opacity`, a);
    } else
      (o = this.map) == null || o.setLayoutProperty(
        e.id,
        "visibility",
        t ? "visible" : "none"
      );
  }
}
function Vt(n, ...e) {
  for (const t of e)
    for (const r in t)
      n[r] = t[r];
  return n;
}
class F extends Error {
  constructor(e, t) {
    super(t), this.message = t, this.key = e;
  }
}
class rt {
  constructor(e, t = []) {
    this.parent = e, this.bindings = {};
    for (const [r, i] of t)
      this.bindings[r] = i;
  }
  concat(e) {
    return new rt(this, e);
  }
  get(e) {
    if (this.bindings[e])
      return this.bindings[e];
    if (this.parent)
      return this.parent.get(e);
    throw new Error(`${e} not found in scope.`);
  }
  has(e) {
    return this.bindings[e] ? !0 : this.parent ? this.parent.has(e) : !1;
  }
}
const Ie = { kind: "null" }, h = { kind: "number" }, v = { kind: "string" }, g = { kind: "boolean" }, j = { kind: "color" }, Ae = { kind: "projectionDefinition" }, Y = { kind: "object" }, m = { kind: "value" }, Tn = { kind: "error" }, De = { kind: "collator" }, $e = { kind: "formatted" }, xe = { kind: "padding" }, ce = { kind: "resolvedImage" }, Pe = { kind: "variableAnchorOffsetCollection" };
function $(n, e) {
  return {
    kind: "array",
    itemType: n,
    N: e
  };
}
function C(n) {
  if (n.kind === "array") {
    const e = C(n.itemType);
    return typeof n.N == "number" ? `array<${e}, ${n.N}>` : n.itemType.kind === "value" ? "array" : `array<${e}>`;
  } else
    return n.kind;
}
const In = [
  Ie,
  h,
  v,
  g,
  j,
  Ae,
  $e,
  Y,
  $(m),
  xe,
  ce,
  Pe
];
function se(n, e) {
  if (e.kind === "error")
    return null;
  if (n.kind === "array") {
    if (e.kind === "array" && (e.N === 0 && e.itemType.kind === "value" || !se(n.itemType, e.itemType)) && (typeof n.N != "number" || n.N === e.N))
      return null;
  } else {
    if (n.kind === e.kind)
      return null;
    if (n.kind === "value") {
      for (const t of In)
        if (!se(t, e))
          return null;
    }
  }
  return `Expected ${C(n)} but found ${C(e)} instead.`;
}
function it(n, e) {
  return e.some((t) => t.kind === n.kind);
}
function W(n, e) {
  return e.some((t) => t === "null" ? n === null : t === "array" ? Array.isArray(n) : t === "object" ? n && !Array.isArray(n) && typeof n == "object" : t === typeof n);
}
function J(n, e) {
  return n.kind === "array" && e.kind === "array" ? n.itemType.kind === e.itemType.kind && typeof n.N == "number" : n.kind === e.kind;
}
const _t = 0.96422, Ut = 1, Wt = 0.82521, Xt = 4 / 29, K = 6 / 29, Zt = 3 * K * K, An = K * K * K, Dn = Math.PI / 180, $n = 180 / Math.PI;
function Jt(n) {
  return n = n % 360, n < 0 && (n += 360), n;
}
function Gt([n, e, t, r]) {
  n = Re(n), e = Re(e), t = Re(t);
  let i, s;
  const o = qe((0.2225045 * n + 0.7168786 * e + 0.0606169 * t) / Ut);
  n === e && e === t ? i = s = o : (i = qe((0.4360747 * n + 0.3850649 * e + 0.1430804 * t) / _t), s = qe((0.0139322 * n + 0.0971045 * e + 0.7141733 * t) / Wt));
  const a = 116 * o - 16;
  return [a < 0 ? 0 : a, 500 * (i - o), 200 * (o - s), r];
}
function Re(n) {
  return n <= 0.04045 ? n / 12.92 : Math.pow((n + 0.055) / 1.055, 2.4);
}
function qe(n) {
  return n > An ? Math.pow(n, 1 / 3) : n / Zt + Xt;
}
function Qt([n, e, t, r]) {
  let i = (n + 16) / 116, s = isNaN(e) ? i : i + e / 500, o = isNaN(t) ? i : i - t / 200;
  return i = Ut * Ve(i), s = _t * Ve(s), o = Wt * Ve(o), [
    He(3.1338561 * s - 1.6168667 * i - 0.4906146 * o),
    // D50 -> sRGB
    He(-0.9787684 * s + 1.9161415 * i + 0.033454 * o),
    He(0.0719453 * s - 0.2289914 * i + 1.4052427 * o),
    r
  ];
}
function He(n) {
  return n = n <= 304e-5 ? 12.92 * n : 1.055 * Math.pow(n, 1 / 2.4) - 0.055, n < 0 ? 0 : n > 1 ? 1 : n;
}
function Ve(n) {
  return n > K ? n * n * n : Zt * (n - Xt);
}
function xn(n) {
  const [e, t, r, i] = Gt(n), s = Math.sqrt(t * t + r * r);
  return [Math.round(s * 1e4) ? Jt(Math.atan2(r, t) * $n) : NaN, s, e, i];
}
function Pn([n, e, t, r]) {
  return n = isNaN(n) ? 0 : n * Dn, Qt([t, Math.cos(n) * e, Math.sin(n) * e, r]);
}
function Sn([n, e, t, r]) {
  n = Jt(n), e /= 100, t /= 100;
  function i(s) {
    const o = (s + n / 30) % 12, a = e * Math.min(t, 1 - t);
    return t - a * Math.max(-1, Math.min(o - 3, 9 - o, 1));
  }
  return [i(0), i(8), i(4), r];
}
function Nn(n) {
  if (n = n.toLowerCase().trim(), n === "transparent")
    return [0, 0, 0, 0];
  const e = Ln[n];
  if (e) {
    const [i, s, o] = e;
    return [i / 255, s / 255, o / 255, 1];
  }
  if (n.startsWith("#") && /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/.test(n)) {
    const s = n.length < 6 ? 1 : 2;
    let o = 1;
    return [
      ge(n.slice(o, o += s)),
      ge(n.slice(o, o += s)),
      ge(n.slice(o, o += s)),
      ge(n.slice(o, o + s) || "ff")
    ];
  }
  if (n.startsWith("rgb")) {
    const i = /^rgba?\(\s*([\de.+-]+)(%)?(?:\s+|\s*(,)\s*)([\de.+-]+)(%)?(?:\s+|\s*(,)\s*)([\de.+-]+)(%)?(?:\s*([,\/])\s*([\de.+-]+)(%)?)?\s*\)$/, s = n.match(i);
    if (s) {
      const [
        o,
        // eslint-disable-line @typescript-eslint/no-unused-vars
        a,
        // <numeric>
        l,
        // %         (optional)
        u,
        // ,         (optional)
        c,
        // <numeric>
        f,
        // %         (optional)
        y,
        // ,         (optional)
        p,
        // <numeric>
        d,
        // %         (optional)
        w,
        // ,|/       (optional)
        M,
        // <numeric> (optional)
        I
        // %         (optional)
      ] = s, A = [u || " ", y || " ", w].join("");
      if (A === "  " || A === "  /" || A === ",," || A === ",,,") {
        const B = [l, f, d].join(""), pe = B === "%%%" ? 100 : B === "" ? 255 : 0;
        if (pe) {
          const Mt = [
            G(+a / pe, 0, 1),
            G(+c / pe, 0, 1),
            G(+p / pe, 0, 1),
            M ? Tt(+M, I) : 1
          ];
          if (It(Mt))
            return Mt;
        }
      }
      return;
    }
  }
  const t = /^hsla?\(\s*([\de.+-]+)(?:deg)?(?:\s+|\s*(,)\s*)([\de.+-]+)%(?:\s+|\s*(,)\s*)([\de.+-]+)%(?:\s*([,\/])\s*([\de.+-]+)(%)?)?\s*\)$/, r = n.match(t);
  if (r) {
    const [
      i,
      // eslint-disable-line @typescript-eslint/no-unused-vars
      s,
      // <numeric>
      o,
      // ,         (optional)
      a,
      // <numeric>
      l,
      // ,         (optional)
      u,
      // <numeric>
      c,
      // ,|/       (optional)
      f,
      // <numeric> (optional)
      y
      // %         (optional)
    ] = r, p = [o || " ", l || " ", c].join("");
    if (p === "  " || p === "  /" || p === ",," || p === ",,,") {
      const d = [
        +s,
        G(+a, 0, 100),
        G(+u, 0, 100),
        f ? Tt(+f, y) : 1
      ];
      if (It(d))
        return Sn(d);
    }
  }
}
function ge(n) {
  return parseInt(n.padEnd(2, n), 16) / 255;
}
function Tt(n, e) {
  return G(e ? n / 100 : n, 0, 1);
}
function G(n, e, t) {
  return Math.min(Math.max(e, n), t);
}
function It(n) {
  return !n.some(Number.isNaN);
}
const Ln = {
  aliceblue: [240, 248, 255],
  antiquewhite: [250, 235, 215],
  aqua: [0, 255, 255],
  aquamarine: [127, 255, 212],
  azure: [240, 255, 255],
  beige: [245, 245, 220],
  bisque: [255, 228, 196],
  black: [0, 0, 0],
  blanchedalmond: [255, 235, 205],
  blue: [0, 0, 255],
  blueviolet: [138, 43, 226],
  brown: [165, 42, 42],
  burlywood: [222, 184, 135],
  cadetblue: [95, 158, 160],
  chartreuse: [127, 255, 0],
  chocolate: [210, 105, 30],
  coral: [255, 127, 80],
  cornflowerblue: [100, 149, 237],
  cornsilk: [255, 248, 220],
  crimson: [220, 20, 60],
  cyan: [0, 255, 255],
  darkblue: [0, 0, 139],
  darkcyan: [0, 139, 139],
  darkgoldenrod: [184, 134, 11],
  darkgray: [169, 169, 169],
  darkgreen: [0, 100, 0],
  darkgrey: [169, 169, 169],
  darkkhaki: [189, 183, 107],
  darkmagenta: [139, 0, 139],
  darkolivegreen: [85, 107, 47],
  darkorange: [255, 140, 0],
  darkorchid: [153, 50, 204],
  darkred: [139, 0, 0],
  darksalmon: [233, 150, 122],
  darkseagreen: [143, 188, 143],
  darkslateblue: [72, 61, 139],
  darkslategray: [47, 79, 79],
  darkslategrey: [47, 79, 79],
  darkturquoise: [0, 206, 209],
  darkviolet: [148, 0, 211],
  deeppink: [255, 20, 147],
  deepskyblue: [0, 191, 255],
  dimgray: [105, 105, 105],
  dimgrey: [105, 105, 105],
  dodgerblue: [30, 144, 255],
  firebrick: [178, 34, 34],
  floralwhite: [255, 250, 240],
  forestgreen: [34, 139, 34],
  fuchsia: [255, 0, 255],
  gainsboro: [220, 220, 220],
  ghostwhite: [248, 248, 255],
  gold: [255, 215, 0],
  goldenrod: [218, 165, 32],
  gray: [128, 128, 128],
  green: [0, 128, 0],
  greenyellow: [173, 255, 47],
  grey: [128, 128, 128],
  honeydew: [240, 255, 240],
  hotpink: [255, 105, 180],
  indianred: [205, 92, 92],
  indigo: [75, 0, 130],
  ivory: [255, 255, 240],
  khaki: [240, 230, 140],
  lavender: [230, 230, 250],
  lavenderblush: [255, 240, 245],
  lawngreen: [124, 252, 0],
  lemonchiffon: [255, 250, 205],
  lightblue: [173, 216, 230],
  lightcoral: [240, 128, 128],
  lightcyan: [224, 255, 255],
  lightgoldenrodyellow: [250, 250, 210],
  lightgray: [211, 211, 211],
  lightgreen: [144, 238, 144],
  lightgrey: [211, 211, 211],
  lightpink: [255, 182, 193],
  lightsalmon: [255, 160, 122],
  lightseagreen: [32, 178, 170],
  lightskyblue: [135, 206, 250],
  lightslategray: [119, 136, 153],
  lightslategrey: [119, 136, 153],
  lightsteelblue: [176, 196, 222],
  lightyellow: [255, 255, 224],
  lime: [0, 255, 0],
  limegreen: [50, 205, 50],
  linen: [250, 240, 230],
  magenta: [255, 0, 255],
  maroon: [128, 0, 0],
  mediumaquamarine: [102, 205, 170],
  mediumblue: [0, 0, 205],
  mediumorchid: [186, 85, 211],
  mediumpurple: [147, 112, 219],
  mediumseagreen: [60, 179, 113],
  mediumslateblue: [123, 104, 238],
  mediumspringgreen: [0, 250, 154],
  mediumturquoise: [72, 209, 204],
  mediumvioletred: [199, 21, 133],
  midnightblue: [25, 25, 112],
  mintcream: [245, 255, 250],
  mistyrose: [255, 228, 225],
  moccasin: [255, 228, 181],
  navajowhite: [255, 222, 173],
  navy: [0, 0, 128],
  oldlace: [253, 245, 230],
  olive: [128, 128, 0],
  olivedrab: [107, 142, 35],
  orange: [255, 165, 0],
  orangered: [255, 69, 0],
  orchid: [218, 112, 214],
  palegoldenrod: [238, 232, 170],
  palegreen: [152, 251, 152],
  paleturquoise: [175, 238, 238],
  palevioletred: [219, 112, 147],
  papayawhip: [255, 239, 213],
  peachpuff: [255, 218, 185],
  peru: [205, 133, 63],
  pink: [255, 192, 203],
  plum: [221, 160, 221],
  powderblue: [176, 224, 230],
  purple: [128, 0, 128],
  rebeccapurple: [102, 51, 153],
  red: [255, 0, 0],
  rosybrown: [188, 143, 143],
  royalblue: [65, 105, 225],
  saddlebrown: [139, 69, 19],
  salmon: [250, 128, 114],
  sandybrown: [244, 164, 96],
  seagreen: [46, 139, 87],
  seashell: [255, 245, 238],
  sienna: [160, 82, 45],
  silver: [192, 192, 192],
  skyblue: [135, 206, 235],
  slateblue: [106, 90, 205],
  slategray: [112, 128, 144],
  slategrey: [112, 128, 144],
  snow: [255, 250, 250],
  springgreen: [0, 255, 127],
  steelblue: [70, 130, 180],
  tan: [210, 180, 140],
  teal: [0, 128, 128],
  thistle: [216, 191, 216],
  tomato: [255, 99, 71],
  turquoise: [64, 224, 208],
  violet: [238, 130, 238],
  wheat: [245, 222, 179],
  white: [255, 255, 255],
  whitesmoke: [245, 245, 245],
  yellow: [255, 255, 0],
  yellowgreen: [154, 205, 50]
};
function V(n, e, t) {
  return n + t * (e - n);
}
function oe(n, e, t) {
  return n.map((r, i) => V(r, e[i], t));
}
function Fn(n) {
  return n === "rgb" || n === "hcl" || n === "lab";
}
class b {
  /**
   * @param r Red component premultiplied by `alpha` 0..1
   * @param g Green component premultiplied by `alpha` 0..1
   * @param b Blue component premultiplied by `alpha` 0..1
   * @param [alpha=1] Alpha component 0..1
   * @param [premultiplied=true] Whether the `r`, `g` and `b` values have already
   * been multiplied by alpha. If `true` nothing happens if `false` then they will
   * be multiplied automatically.
   */
  constructor(e, t, r, i = 1, s = !0) {
    this.r = e, this.g = t, this.b = r, this.a = i, s || (this.r *= i, this.g *= i, this.b *= i, i || this.overwriteGetter("rgb", [e, t, r, i]));
  }
  /**
   * Parses CSS color strings and converts colors to sRGB color space if needed.
   * Officially supported color formats:
   * - keyword, e.g. 'aquamarine' or 'steelblue'
   * - hex (with 3, 4, 6 or 8 digits), e.g. '#f0f' or '#e9bebea9'
   * - rgb and rgba, e.g. 'rgb(0,240,120)' or 'rgba(0%,94%,47%,0.1)' or 'rgb(0 240 120 / .3)'
   * - hsl and hsla, e.g. 'hsl(0,0%,83%)' or 'hsla(0,0%,83%,.5)' or 'hsl(0 0% 83% / 20%)'
   *
   * @param input CSS color string to parse.
   * @returns A `Color` instance, or `undefined` if the input is not a valid color string.
   */
  static parse(e) {
    if (e instanceof b)
      return e;
    if (typeof e != "string")
      return;
    const t = Nn(e);
    if (t)
      return new b(...t, !1);
  }
  /**
   * Used in color interpolation and by 'to-rgba' expression.
   *
   * @returns Gien color, with reversed alpha blending, in sRGB color space.
   */
  get rgb() {
    const { r: e, g: t, b: r, a: i } = this, s = i || 1 / 0;
    return this.overwriteGetter("rgb", [e / s, t / s, r / s, i]);
  }
  /**
   * Used in color interpolation.
   *
   * @returns Gien color, with reversed alpha blending, in HCL color space.
   */
  get hcl() {
    return this.overwriteGetter("hcl", xn(this.rgb));
  }
  /**
   * Used in color interpolation.
   *
   * @returns Gien color, with reversed alpha blending, in LAB color space.
   */
  get lab() {
    return this.overwriteGetter("lab", Gt(this.rgb));
  }
  /**
   * Lazy getter pattern. When getter is called for the first time lazy value
   * is calculated and then overwrites getter function in given object instance.
   *
   * @example:
   * const redColor = Color.parse('red');
   * let x = redColor.hcl; // this will invoke `get hcl()`, which will calculate
   * // the value of red in HCL space and invoke this `overwriteGetter` function
   * // which in turn will set a field with a key 'hcl' in the `redColor` object.
   * // In other words it will override `get hcl()` from its `Color` prototype
   * // with its own property: hcl = [calculated red value in hcl].
   * let y = redColor.hcl; // next call will no longer invoke getter but simply
   * // return the previously calculated value
   * x === y; // true - `x` is exactly the same object as `y`
   *
   * @param getterKey Getter key
   * @param lazyValue Lazily calculated value to be memoized by current instance
   * @private
   */
  overwriteGetter(e, t) {
    return Object.defineProperty(this, e, { value: t }), t;
  }
  /**
   * Used by 'to-string' expression.
   *
   * @returns Serialized color in format `rgba(r,g,b,a)`
   * where r,g,b are numbers within 0..255 and alpha is number within 1..0
   *
   * @example
   * var purple = new Color.parse('purple');
   * purple.toString; // = "rgba(128,0,128,1)"
   * var translucentGreen = new Color.parse('rgba(26, 207, 26, .73)');
   * translucentGreen.toString(); // = "rgba(26,207,26,0.73)"
   */
  toString() {
    const [e, t, r, i] = this.rgb;
    return `rgba(${[e, t, r].map((s) => Math.round(s * 255)).join(",")},${i})`;
  }
  static interpolate(e, t, r, i = "rgb") {
    switch (i) {
      case "rgb": {
        const [s, o, a, l] = oe(e.rgb, t.rgb, r);
        return new b(s, o, a, l, !1);
      }
      case "hcl": {
        const [s, o, a, l] = e.hcl, [u, c, f, y] = t.hcl;
        let p, d;
        if (!isNaN(s) && !isNaN(u)) {
          let B = u - s;
          u > s && B > 180 ? B -= 360 : u < s && s - u > 180 && (B += 360), p = s + r * B;
        } else isNaN(s) ? isNaN(u) ? p = NaN : (p = u, (a === 1 || a === 0) && (d = c)) : (p = s, (f === 1 || f === 0) && (d = o));
        const [w, M, I, A] = Pn([
          p,
          d ?? V(o, c, r),
          V(a, f, r),
          V(l, y, r)
        ]);
        return new b(w, M, I, A, !1);
      }
      case "lab": {
        const [s, o, a, l] = Qt(oe(e.lab, t.lab, r));
        return new b(s, o, a, l, !1);
      }
    }
  }
}
b.black = new b(0, 0, 0, 1);
b.white = new b(1, 1, 1, 1);
b.transparent = new b(0, 0, 0, 0);
b.red = new b(1, 0, 0, 1);
class st {
  constructor(e, t, r) {
    e ? this.sensitivity = t ? "variant" : "case" : this.sensitivity = t ? "accent" : "base", this.locale = r, this.collator = new Intl.Collator(this.locale ? this.locale : [], { sensitivity: this.sensitivity, usage: "search" });
  }
  compare(e, t) {
    return this.collator.compare(e, t);
  }
  resolvedLocale() {
    return new Intl.Collator(this.locale ? this.locale : []).resolvedOptions().locale;
  }
}
class Ze {
  constructor(e, t, r, i, s) {
    this.text = e, this.image = t, this.scale = r, this.fontStack = i, this.textColor = s;
  }
}
class z {
  constructor(e) {
    this.sections = e;
  }
  static fromString(e) {
    return new z([new Ze(e, null, null, null, null)]);
  }
  isEmpty() {
    return this.sections.length === 0 ? !0 : !this.sections.some((e) => e.text.length !== 0 || e.image && e.image.name.length !== 0);
  }
  static factory(e) {
    return e instanceof z ? e : z.fromString(e);
  }
  toString() {
    return this.sections.length === 0 ? "" : this.sections.map((e) => e.text).join("");
  }
}
class D {
  constructor(e) {
    this.values = e.slice();
  }
  /**
   * Numeric padding values
   * @param input A padding value
   * @returns A `Padding` instance, or `undefined` if the input is not a valid padding value.
   */
  static parse(e) {
    if (e instanceof D)
      return e;
    if (typeof e == "number")
      return new D([e, e, e, e]);
    if (Array.isArray(e) && !(e.length < 1 || e.length > 4)) {
      for (const t of e)
        if (typeof t != "number")
          return;
      switch (e.length) {
        case 1:
          e = [e[0], e[0], e[0], e[0]];
          break;
        case 2:
          e = [e[0], e[1], e[0], e[1]];
          break;
        case 3:
          e = [e[0], e[1], e[2], e[1]];
          break;
      }
      return new D(e);
    }
  }
  toString() {
    return JSON.stringify(this.values);
  }
  static interpolate(e, t, r) {
    return new D(oe(e.values, t.values, r));
  }
}
class E {
  constructor(e) {
    this.name = "ExpressionEvaluationError", this.message = e;
  }
  toJSON() {
    return this.message;
  }
}
const jn = /* @__PURE__ */ new Set(["center", "left", "right", "top", "bottom", "top-left", "top-right", "bottom-left", "bottom-right"]);
class P {
  constructor(e) {
    this.values = e.slice();
  }
  static parse(e) {
    if (e instanceof P)
      return e;
    if (!(!Array.isArray(e) || e.length < 1 || e.length % 2 !== 0)) {
      for (let t = 0; t < e.length; t += 2) {
        const r = e[t], i = e[t + 1];
        if (typeof r != "string" || !jn.has(r) || !Array.isArray(i) || i.length !== 2 || typeof i[0] != "number" || typeof i[1] != "number")
          return;
      }
      return new P(e);
    }
  }
  toString() {
    return JSON.stringify(this.values);
  }
  static interpolate(e, t, r) {
    const i = e.values, s = t.values;
    if (i.length !== s.length)
      throw new E(`Cannot interpolate values of different length. from: ${e.toString()}, to: ${t.toString()}`);
    const o = [];
    for (let a = 0; a < i.length; a += 2) {
      if (i[a] !== s[a])
        throw new E(`Cannot interpolate values containing mismatched anchors. from[${a}]: ${i[a]}, to[${a}]: ${s[a]}`);
      o.push(i[a]);
      const [l, u] = i[a + 1], [c, f] = s[a + 1];
      o.push([V(l, c, r), V(u, f, r)]);
    }
    return new P(o);
  }
}
class q {
  constructor(e) {
    this.name = e.name, this.available = e.available;
  }
  toString() {
    return this.name;
  }
  static fromString(e) {
    return e ? new q({ name: e, available: !1 }) : null;
  }
}
class x {
  constructor(e, t, r) {
    this.from = e, this.to = t, this.transition = r;
  }
  static interpolate(e, t, r) {
    return new x(e, t, r);
  }
  static parse(e) {
    if (e instanceof x)
      return e;
    if (Array.isArray(e) && e.length === 3 && typeof e[0] == "string" && typeof e[1] == "string" && typeof e[2] == "number")
      return new x(e[0], e[1], e[2]);
    if (typeof e == "object" && typeof e.from == "string" && typeof e.to == "string" && typeof e.transition == "number")
      return new x(e.from, e.to, e.transition);
    if (typeof e == "string")
      return new x(e, e, 1);
  }
}
function Yt(n, e, t, r) {
  return typeof n == "number" && n >= 0 && n <= 255 && typeof e == "number" && e >= 0 && e <= 255 && typeof t == "number" && t >= 0 && t <= 255 ? typeof r > "u" || typeof r == "number" && r >= 0 && r <= 1 ? null : `Invalid rgba value [${[n, e, t, r].join(", ")}]: 'a' must be between 0 and 1.` : `Invalid rgba value [${(typeof r == "number" ? [n, e, t, r] : [n, e, t]).join(", ")}]: 'r', 'g', and 'b' must be between 0 and 255.`;
}
function ae(n) {
  if (n === null || typeof n == "string" || typeof n == "boolean" || typeof n == "number" || n instanceof x || n instanceof b || n instanceof st || n instanceof z || n instanceof D || n instanceof P || n instanceof q)
    return !0;
  if (Array.isArray(n)) {
    for (const e of n)
      if (!ae(e))
        return !1;
    return !0;
  } else if (typeof n == "object") {
    for (const e in n)
      if (!ae(n[e]))
        return !1;
    return !0;
  } else
    return !1;
}
function T(n) {
  if (n === null)
    return Ie;
  if (typeof n == "string")
    return v;
  if (typeof n == "boolean")
    return g;
  if (typeof n == "number")
    return h;
  if (n instanceof b)
    return j;
  if (n instanceof x)
    return Ae;
  if (n instanceof st)
    return De;
  if (n instanceof z)
    return $e;
  if (n instanceof D)
    return xe;
  if (n instanceof P)
    return Pe;
  if (n instanceof q)
    return ce;
  if (Array.isArray(n)) {
    const e = n.length;
    let t;
    for (const r of n) {
      const i = T(r);
      if (!t)
        t = i;
      else {
        if (t === i)
          continue;
        t = m;
        break;
      }
    }
    return $(t || m, e);
  } else
    return Y;
}
function ie(n) {
  const e = typeof n;
  return n === null ? "" : e === "string" || e === "number" || e === "boolean" ? String(n) : n instanceof b || n instanceof x || n instanceof z || n instanceof D || n instanceof P || n instanceof q ? n.toString() : JSON.stringify(n);
}
class ee {
  constructor(e, t) {
    this.type = e, this.value = t;
  }
  static parse(e, t) {
    if (e.length !== 2)
      return t.error(`'literal' expression requires exactly one argument, but found ${e.length - 1} instead.`);
    if (!ae(e[1]))
      return t.error("invalid value");
    const r = e[1];
    let i = T(r);
    const s = t.expectedType;
    return i.kind === "array" && i.N === 0 && s && s.kind === "array" && (typeof s.N != "number" || s.N === 0) && (i = s), new ee(i, r);
  }
  evaluate() {
    return this.value;
  }
  eachChild() {
  }
  outputDefined() {
    return !0;
  }
}
const me = {
  string: v,
  number: h,
  boolean: g,
  object: Y
};
class N {
  constructor(e, t) {
    this.type = e, this.args = t;
  }
  static parse(e, t) {
    if (e.length < 2)
      return t.error("Expected at least one argument.");
    let r = 1, i;
    const s = e[0];
    if (s === "array") {
      let a;
      if (e.length > 2) {
        const u = e[1];
        if (typeof u != "string" || !(u in me) || u === "object")
          return t.error('The item type argument of "array" must be one of string, number, boolean', 1);
        a = me[u], r++;
      } else
        a = m;
      let l;
      if (e.length > 3) {
        if (e[2] !== null && (typeof e[2] != "number" || e[2] < 0 || e[2] !== Math.floor(e[2])))
          return t.error('The length argument to "array" must be a positive integer literal', 2);
        l = e[2], r++;
      }
      i = $(a, l);
    } else {
      if (!me[s])
        throw new Error(`Types doesn't contain name = ${s}`);
      i = me[s];
    }
    const o = [];
    for (; r < e.length; r++) {
      const a = t.parse(e[r], r, m);
      if (!a)
        return null;
      o.push(a);
    }
    return new N(i, o);
  }
  evaluate(e) {
    for (let t = 0; t < this.args.length; t++) {
      const r = this.args[t].evaluate(e);
      if (se(this.type, T(r))) {
        if (t === this.args.length - 1)
          throw new E(`Expected value to be of type ${C(this.type)}, but found ${C(T(r))} instead.`);
      } else return r;
    }
    throw new Error();
  }
  eachChild(e) {
    this.args.forEach(e);
  }
  outputDefined() {
    return this.args.every((e) => e.outputDefined());
  }
}
const At = {
  "to-boolean": g,
  "to-color": j,
  "to-number": h,
  "to-string": v
};
class H {
  constructor(e, t) {
    this.type = e, this.args = t;
  }
  static parse(e, t) {
    if (e.length < 2)
      return t.error("Expected at least one argument.");
    const r = e[0];
    if (!At[r])
      throw new Error(`Can't parse ${r} as it is not part of the known types`);
    if ((r === "to-boolean" || r === "to-string") && e.length !== 2)
      return t.error("Expected one argument.");
    const i = At[r], s = [];
    for (let o = 1; o < e.length; o++) {
      const a = t.parse(e[o], o, m);
      if (!a)
        return null;
      s.push(a);
    }
    return new H(i, s);
  }
  evaluate(e) {
    switch (this.type.kind) {
      case "boolean":
        return !!this.args[0].evaluate(e);
      case "color": {
        let t, r;
        for (const i of this.args) {
          if (t = i.evaluate(e), r = null, t instanceof b)
            return t;
          if (typeof t == "string") {
            const s = e.parseColor(t);
            if (s)
              return s;
          } else if (Array.isArray(t) && (t.length < 3 || t.length > 4 ? r = `Invalid rgba value ${JSON.stringify(t)}: expected an array containing either three or four numeric values.` : r = Yt(t[0], t[1], t[2], t[3]), !r))
            return new b(t[0] / 255, t[1] / 255, t[2] / 255, t[3]);
        }
        throw new E(r || `Could not parse color from value '${typeof t == "string" ? t : JSON.stringify(t)}'`);
      }
      case "padding": {
        let t;
        for (const r of this.args) {
          t = r.evaluate(e);
          const i = D.parse(t);
          if (i)
            return i;
        }
        throw new E(`Could not parse padding from value '${typeof t == "string" ? t : JSON.stringify(t)}'`);
      }
      case "variableAnchorOffsetCollection": {
        let t;
        for (const r of this.args) {
          t = r.evaluate(e);
          const i = P.parse(t);
          if (i)
            return i;
        }
        throw new E(`Could not parse variableAnchorOffsetCollection from value '${typeof t == "string" ? t : JSON.stringify(t)}'`);
      }
      case "number": {
        let t = null;
        for (const r of this.args) {
          if (t = r.evaluate(e), t === null)
            return 0;
          const i = Number(t);
          if (!isNaN(i))
            return i;
        }
        throw new E(`Could not convert ${JSON.stringify(t)} to number.`);
      }
      case "formatted":
        return z.fromString(ie(this.args[0].evaluate(e)));
      case "resolvedImage":
        return q.fromString(ie(this.args[0].evaluate(e)));
      case "projectionDefinition":
        return this.args[0].evaluate(e);
      default:
        return ie(this.args[0].evaluate(e));
    }
  }
  eachChild(e) {
    this.args.forEach(e);
  }
  outputDefined() {
    return this.args.every((e) => e.outputDefined());
  }
}
function zn(n, e) {
  if (n.length <= 1)
    return [n];
  const r = [];
  let i, s;
  for (const o of n) {
    const a = Kt(o);
    a !== 0 && (o.area = Math.abs(a), s === void 0 && (s = a < 0), s === a < 0 ? (i && r.push(i), i = [o]) : i.push(o));
  }
  return i && r.push(i), r;
}
function Kt(n) {
  let e = 0;
  for (let t = 0, r = n.length, i = r - 1, s, o; t < r; i = t++)
    s = n[t], o = n[i], e += (o.x - s.x) * (s.y + o.y);
  return e;
}
function On(n) {
  const e = n.length;
  for (let t = 0, r; t < e; t++) {
    const i = Kt(n[t]);
    if (i !== 0) {
      if (r === void 0)
        r = i < 0;
      else if (r === i < 0)
        return !0;
    }
  }
  return !1;
}
const Dt = ["Unknown", "Point", "LineString", "Polygon"], Bn = {
  Unknown: "Unknown",
  Point: "Point",
  MultiPoint: "Point",
  LineString: "LineString",
  MultiLineString: "LineString",
  Polygon: "Polygon",
  MultiPolygon: "Polygon"
};
class en {
  constructor() {
    this.globals = null, this.feature = null, this.featureState = null, this.formattedSection = null, this._parseColorCache = {}, this.availableImages = null, this.canonical = null;
  }
  id() {
    return this.feature && "id" in this.feature ? this.feature.id : null;
  }
  geometryDollarType() {
    return this.feature ? typeof this.feature.type == "number" ? Dt[this.feature.type] : Bn[this.feature.type] : null;
  }
  geometryType() {
    let e = this.feature.type;
    if (typeof e != "number" || (e = Dt[this.feature.type], e === "Unknown"))
      return e;
    const t = this.geometry();
    return t.length === 1 ? e : e !== "Polygon" ? `Multi${e}` : On(t) ? "MultiPolygon" : "Polygon";
  }
  geometry() {
    return this.feature && "geometry" in this.feature ? this.feature.geometry : null;
  }
  canonicalID() {
    return this.canonical;
  }
  properties() {
    return this.feature && this.feature.properties || {};
  }
  parseColor(e) {
    let t = this._parseColorCache[e];
    return t || (t = this._parseColorCache[e] = b.parse(e)), t;
  }
}
class Se {
  constructor(e, t, r = [], i, s = new rt(), o = []) {
    this.registry = e, this.path = r, this.key = r.map((a) => `[${a}]`).join(""), this.scope = s, this.errors = o, this.expectedType = i, this._isConstant = t;
  }
  /**
   * @param expr the JSON expression to parse
   * @param index the optional argument index if this expression is an argument of a parent expression that's being parsed
   * @param options
   * @param options.omitTypeAnnotations set true to omit inferred type annotations.  Caller beware: with this option set, the parsed expression's type will NOT satisfy `expectedType` if it would normally be wrapped in an inferred annotation.
   * @private
   */
  parse(e, t, r, i, s = {}) {
    return t ? this.concat(t, r, i)._parse(e, s) : this._parse(e, s);
  }
  _parse(e, t) {
    (e === null || typeof e == "string" || typeof e == "boolean" || typeof e == "number") && (e = ["literal", e]);
    function r(i, s, o) {
      return o === "assert" ? new N(s, [i]) : o === "coerce" ? new H(s, [i]) : i;
    }
    if (Array.isArray(e)) {
      if (e.length === 0)
        return this.error('Expected an array with at least one element. If you wanted a literal array, use ["literal", []].');
      const i = e[0];
      if (typeof i != "string")
        return this.error(`Expression name must be a string, but found ${typeof i} instead. If you wanted a literal array, use ["literal", [...]].`, 0), null;
      const s = this.registry[i];
      if (s) {
        let o = s.parse(e, this);
        if (!o)
          return null;
        if (this.expectedType) {
          const a = this.expectedType, l = o.type;
          if ((a.kind === "string" || a.kind === "number" || a.kind === "boolean" || a.kind === "object" || a.kind === "array") && l.kind === "value")
            o = r(o, a, t.typeAnnotation || "assert");
          else if (a.kind === "projectionDefinition" && (l.kind === "string" || l.kind === "array"))
            o = r(o, a, t.typeAnnotation || "coerce");
          else if ((a.kind === "color" || a.kind === "formatted" || a.kind === "resolvedImage") && (l.kind === "value" || l.kind === "string"))
            o = r(o, a, t.typeAnnotation || "coerce");
          else if (a.kind === "padding" && (l.kind === "value" || l.kind === "number" || l.kind === "array"))
            o = r(o, a, t.typeAnnotation || "coerce");
          else if (a.kind === "variableAnchorOffsetCollection" && (l.kind === "value" || l.kind === "array"))
            o = r(o, a, t.typeAnnotation || "coerce");
          else if (this.checkSubtype(a, l))
            return null;
        }
        if (!(o instanceof ee) && o.type.kind !== "resolvedImage" && this._isConstant(o)) {
          const a = new en();
          try {
            o = new ee(o.type, o.evaluate(a));
          } catch (l) {
            return this.error(l.message), null;
          }
        }
        return o;
      }
      return this.error(`Unknown expression "${i}". If you wanted a literal array, use ["literal", [...]].`, 0);
    } else return typeof e > "u" ? this.error("'undefined' value invalid. Use null instead.") : typeof e == "object" ? this.error('Bare objects invalid. Use ["literal", {...}] instead.') : this.error(`Expected an array, but found ${typeof e} instead.`);
  }
  /**
   * Returns a copy of this context suitable for parsing the subexpression at
   * index `index`, optionally appending to 'let' binding map.
   *
   * Note that `errors` property, intended for collecting errors while
   * parsing, is copied by reference rather than cloned.
   * @private
   */
  concat(e, t, r) {
    const i = typeof e == "number" ? this.path.concat(e) : this.path, s = r ? this.scope.concat(r) : this.scope;
    return new Se(this.registry, this._isConstant, i, t || null, s, this.errors);
  }
  /**
   * Push a parsing (or type checking) error into the `this.errors`
   * @param error The message
   * @param keys Optionally specify the source of the error at a child
   * of the current expression at `this.key`.
   * @private
   */
  error(e, ...t) {
    const r = `${this.key}${t.map((i) => `[${i}]`).join("")}`;
    this.errors.push(new F(r, e));
  }
  /**
   * Returns null if `t` is a subtype of `expected`; otherwise returns an
   * error message and also pushes it to `this.errors`.
   * @param expected The expected type
   * @param t The actual type
   * @returns null if `t` is a subtype of `expected`; otherwise returns an error message
   */
  checkSubtype(e, t) {
    const r = se(e, t);
    return r && this.error(r), r;
  }
}
class Ne {
  constructor(e, t) {
    this.type = t.type, this.bindings = [].concat(e), this.result = t;
  }
  evaluate(e) {
    return this.result.evaluate(e);
  }
  eachChild(e) {
    for (const t of this.bindings)
      e(t[1]);
    e(this.result);
  }
  static parse(e, t) {
    if (e.length < 4)
      return t.error(`Expected at least 3 arguments, but found ${e.length - 1} instead.`);
    const r = [];
    for (let s = 1; s < e.length - 1; s += 2) {
      const o = e[s];
      if (typeof o != "string")
        return t.error(`Expected string, but found ${typeof o} instead.`, s);
      if (/[^a-zA-Z0-9_]/.test(o))
        return t.error("Variable names must contain only alphanumeric characters or '_'.", s);
      const a = t.parse(e[s + 1], s + 1);
      if (!a)
        return null;
      r.push([o, a]);
    }
    const i = t.parse(e[e.length - 1], e.length - 1, t.expectedType, r);
    return i ? new Ne(r, i) : null;
  }
  outputDefined() {
    return this.result.outputDefined();
  }
}
class Le {
  constructor(e, t) {
    this.type = t.type, this.name = e, this.boundExpression = t;
  }
  static parse(e, t) {
    if (e.length !== 2 || typeof e[1] != "string")
      return t.error("'var' expression requires exactly one string literal argument.");
    const r = e[1];
    return t.scope.has(r) ? new Le(r, t.scope.get(r)) : t.error(`Unknown variable "${r}". Make sure "${r}" has been bound in an enclosing "let" expression before using it.`, 1);
  }
  evaluate(e) {
    return this.boundExpression.evaluate(e);
  }
  eachChild() {
  }
  outputDefined() {
    return !1;
  }
}
class ot {
  constructor(e, t, r) {
    this.type = e, this.index = t, this.input = r;
  }
  static parse(e, t) {
    if (e.length !== 3)
      return t.error(`Expected 2 arguments, but found ${e.length - 1} instead.`);
    const r = t.parse(e[1], 1, h), i = t.parse(e[2], 2, $(t.expectedType || m));
    if (!r || !i)
      return null;
    const s = i.type;
    return new ot(s.itemType, r, i);
  }
  evaluate(e) {
    const t = this.index.evaluate(e), r = this.input.evaluate(e);
    if (t < 0)
      throw new E(`Array index out of bounds: ${t} < 0.`);
    if (t >= r.length)
      throw new E(`Array index out of bounds: ${t} > ${r.length - 1}.`);
    if (t !== Math.floor(t))
      throw new E(`Array index must be an integer, but found ${t} instead.`);
    return r[t];
  }
  eachChild(e) {
    e(this.index), e(this.input);
  }
  outputDefined() {
    return !1;
  }
}
class at {
  constructor(e, t) {
    this.type = g, this.needle = e, this.haystack = t;
  }
  static parse(e, t) {
    if (e.length !== 3)
      return t.error(`Expected 2 arguments, but found ${e.length - 1} instead.`);
    const r = t.parse(e[1], 1, m), i = t.parse(e[2], 2, m);
    return !r || !i ? null : it(r.type, [g, v, h, Ie, m]) ? new at(r, i) : t.error(`Expected first argument to be of type boolean, string, number or null, but found ${C(r.type)} instead`);
  }
  evaluate(e) {
    const t = this.needle.evaluate(e), r = this.haystack.evaluate(e);
    if (!r)
      return !1;
    if (!W(t, ["boolean", "string", "number", "null"]))
      throw new E(`Expected first argument to be of type boolean, string, number or null, but found ${C(T(t))} instead.`);
    if (!W(r, ["string", "array"]))
      throw new E(`Expected second argument to be of type array or string, but found ${C(T(r))} instead.`);
    return r.indexOf(t) >= 0;
  }
  eachChild(e) {
    e(this.needle), e(this.haystack);
  }
  outputDefined() {
    return !0;
  }
}
class we {
  constructor(e, t, r) {
    this.type = h, this.needle = e, this.haystack = t, this.fromIndex = r;
  }
  static parse(e, t) {
    if (e.length <= 2 || e.length >= 5)
      return t.error(`Expected 3 or 4 arguments, but found ${e.length - 1} instead.`);
    const r = t.parse(e[1], 1, m), i = t.parse(e[2], 2, m);
    if (!r || !i)
      return null;
    if (!it(r.type, [g, v, h, Ie, m]))
      return t.error(`Expected first argument to be of type boolean, string, number or null, but found ${C(r.type)} instead`);
    if (e.length === 4) {
      const s = t.parse(e[3], 3, h);
      return s ? new we(r, i, s) : null;
    } else
      return new we(r, i);
  }
  evaluate(e) {
    const t = this.needle.evaluate(e), r = this.haystack.evaluate(e);
    if (!W(t, ["boolean", "string", "number", "null"]))
      throw new E(`Expected first argument to be of type boolean, string, number or null, but found ${C(T(t))} instead.`);
    let i;
    if (this.fromIndex && (i = this.fromIndex.evaluate(e)), W(r, ["string"])) {
      const s = r.indexOf(t, i);
      return s === -1 ? -1 : [...r.slice(0, s)].length;
    } else {
      if (W(r, ["array"]))
        return r.indexOf(t, i);
      throw new E(`Expected second argument to be of type array or string, but found ${C(T(r))} instead.`);
    }
  }
  eachChild(e) {
    e(this.needle), e(this.haystack), this.fromIndex && e(this.fromIndex);
  }
  outputDefined() {
    return !1;
  }
}
class lt {
  constructor(e, t, r, i, s, o) {
    this.inputType = e, this.type = t, this.input = r, this.cases = i, this.outputs = s, this.otherwise = o;
  }
  static parse(e, t) {
    if (e.length < 5)
      return t.error(`Expected at least 4 arguments, but found only ${e.length - 1}.`);
    if (e.length % 2 !== 1)
      return t.error("Expected an even number of arguments.");
    let r, i;
    t.expectedType && t.expectedType.kind !== "value" && (i = t.expectedType);
    const s = {}, o = [];
    for (let u = 2; u < e.length - 1; u += 2) {
      let c = e[u];
      const f = e[u + 1];
      Array.isArray(c) || (c = [c]);
      const y = t.concat(u);
      if (c.length === 0)
        return y.error("Expected at least one branch label.");
      for (const d of c) {
        if (typeof d != "number" && typeof d != "string")
          return y.error("Branch labels must be numbers or strings.");
        if (typeof d == "number" && Math.abs(d) > Number.MAX_SAFE_INTEGER)
          return y.error(`Branch labels must be integers no larger than ${Number.MAX_SAFE_INTEGER}.`);
        if (typeof d == "number" && Math.floor(d) !== d)
          return y.error("Numeric branch labels must be integer values.");
        if (!r)
          r = T(d);
        else if (y.checkSubtype(r, T(d)))
          return null;
        if (typeof s[String(d)] < "u")
          return y.error("Branch labels must be unique.");
        s[String(d)] = o.length;
      }
      const p = t.parse(f, u, i);
      if (!p)
        return null;
      i = i || p.type, o.push(p);
    }
    const a = t.parse(e[1], 1, m);
    if (!a)
      return null;
    const l = t.parse(e[e.length - 1], e.length - 1, i);
    return !l || a.type.kind !== "value" && t.concat(1).checkSubtype(r, a.type) ? null : new lt(r, i, a, s, o, l);
  }
  evaluate(e) {
    const t = this.input.evaluate(e);
    return (T(t) === this.inputType && this.outputs[this.cases[t]] || this.otherwise).evaluate(e);
  }
  eachChild(e) {
    e(this.input), this.outputs.forEach(e), e(this.otherwise);
  }
  outputDefined() {
    return this.outputs.every((e) => e.outputDefined()) && this.otherwise.outputDefined();
  }
}
class ut {
  constructor(e, t, r) {
    this.type = e, this.branches = t, this.otherwise = r;
  }
  static parse(e, t) {
    if (e.length < 4)
      return t.error(`Expected at least 3 arguments, but found only ${e.length - 1}.`);
    if (e.length % 2 !== 0)
      return t.error("Expected an odd number of arguments.");
    let r;
    t.expectedType && t.expectedType.kind !== "value" && (r = t.expectedType);
    const i = [];
    for (let o = 1; o < e.length - 1; o += 2) {
      const a = t.parse(e[o], o, g);
      if (!a)
        return null;
      const l = t.parse(e[o + 1], o + 1, r);
      if (!l)
        return null;
      i.push([a, l]), r = r || l.type;
    }
    const s = t.parse(e[e.length - 1], e.length - 1, r);
    if (!s)
      return null;
    if (!r)
      throw new Error("Can't infer output type");
    return new ut(r, i, s);
  }
  evaluate(e) {
    for (const [t, r] of this.branches)
      if (t.evaluate(e))
        return r.evaluate(e);
    return this.otherwise.evaluate(e);
  }
  eachChild(e) {
    for (const [t, r] of this.branches)
      e(t), e(r);
    e(this.otherwise);
  }
  outputDefined() {
    return this.branches.every(([e, t]) => t.outputDefined()) && this.otherwise.outputDefined();
  }
}
class ke {
  constructor(e, t, r, i) {
    this.type = e, this.input = t, this.beginIndex = r, this.endIndex = i;
  }
  static parse(e, t) {
    if (e.length <= 2 || e.length >= 5)
      return t.error(`Expected 3 or 4 arguments, but found ${e.length - 1} instead.`);
    const r = t.parse(e[1], 1, m), i = t.parse(e[2], 2, h);
    if (!r || !i)
      return null;
    if (!it(r.type, [$(m), v, m]))
      return t.error(`Expected first argument to be of type array or string, but found ${C(r.type)} instead`);
    if (e.length === 4) {
      const s = t.parse(e[3], 3, h);
      return s ? new ke(r.type, r, i, s) : null;
    } else
      return new ke(r.type, r, i);
  }
  evaluate(e) {
    const t = this.input.evaluate(e), r = this.beginIndex.evaluate(e);
    let i;
    if (this.endIndex && (i = this.endIndex.evaluate(e)), W(t, ["string"]))
      return [...t].slice(r, i).join("");
    if (W(t, ["array"]))
      return t.slice(r, i);
    throw new E(`Expected first argument to be of type array or string, but found ${C(T(t))} instead.`);
  }
  eachChild(e) {
    e(this.input), e(this.beginIndex), this.endIndex && e(this.endIndex);
  }
  outputDefined() {
    return !1;
  }
}
function Fe(n, e) {
  const t = n.length - 1;
  let r = 0, i = t, s = 0, o, a;
  for (; r <= i; )
    if (s = Math.floor((r + i) / 2), o = n[s], a = n[s + 1], o <= e) {
      if (s === t || e < a)
        return s;
      r = s + 1;
    } else if (o > e)
      i = s - 1;
    else
      throw new E("Input is not a number.");
  return 0;
}
class je {
  constructor(e, t, r) {
    this.type = e, this.input = t, this.labels = [], this.outputs = [];
    for (const [i, s] of r)
      this.labels.push(i), this.outputs.push(s);
  }
  static parse(e, t) {
    if (e.length - 1 < 4)
      return t.error(`Expected at least 4 arguments, but found only ${e.length - 1}.`);
    if ((e.length - 1) % 2 !== 0)
      return t.error("Expected an even number of arguments.");
    const r = t.parse(e[1], 1, h);
    if (!r)
      return null;
    const i = [];
    let s = null;
    t.expectedType && t.expectedType.kind !== "value" && (s = t.expectedType);
    for (let o = 1; o < e.length; o += 2) {
      const a = o === 1 ? -1 / 0 : e[o], l = e[o + 1], u = o, c = o + 1;
      if (typeof a != "number")
        return t.error('Input/output pairs for "step" expressions must be defined using literal numeric values (not computed expressions) for the input values.', u);
      if (i.length && i[i.length - 1][0] >= a)
        return t.error('Input/output pairs for "step" expressions must be arranged with input values in strictly ascending order.', u);
      const f = t.parse(l, c, s);
      if (!f)
        return null;
      s = s || f.type, i.push([a, f]);
    }
    return new je(s, r, i);
  }
  evaluate(e) {
    const t = this.labels, r = this.outputs;
    if (t.length === 1)
      return r[0].evaluate(e);
    const i = this.input.evaluate(e);
    if (i <= t[0])
      return r[0].evaluate(e);
    const s = t.length;
    if (i >= t[s - 1])
      return r[s - 1].evaluate(e);
    const o = Fe(t, i);
    return r[o].evaluate(e);
  }
  eachChild(e) {
    e(this.input);
    for (const t of this.outputs)
      e(t);
  }
  outputDefined() {
    return this.outputs.every((e) => e.outputDefined());
  }
}
function Rn(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var _e, $t;
function qn() {
  if ($t) return _e;
  $t = 1, _e = n;
  function n(e, t, r, i) {
    this.cx = 3 * e, this.bx = 3 * (r - e) - this.cx, this.ax = 1 - this.cx - this.bx, this.cy = 3 * t, this.by = 3 * (i - t) - this.cy, this.ay = 1 - this.cy - this.by, this.p1x = e, this.p1y = t, this.p2x = r, this.p2y = i;
  }
  return n.prototype = {
    sampleCurveX: function(e) {
      return ((this.ax * e + this.bx) * e + this.cx) * e;
    },
    sampleCurveY: function(e) {
      return ((this.ay * e + this.by) * e + this.cy) * e;
    },
    sampleCurveDerivativeX: function(e) {
      return (3 * this.ax * e + 2 * this.bx) * e + this.cx;
    },
    solveCurveX: function(e, t) {
      if (t === void 0 && (t = 1e-6), e < 0) return 0;
      if (e > 1) return 1;
      for (var r = e, i = 0; i < 8; i++) {
        var s = this.sampleCurveX(r) - e;
        if (Math.abs(s) < t) return r;
        var o = this.sampleCurveDerivativeX(r);
        if (Math.abs(o) < 1e-6) break;
        r = r - s / o;
      }
      var a = 0, l = 1;
      for (r = e, i = 0; i < 20 && (s = this.sampleCurveX(r), !(Math.abs(s - e) < t)); i++)
        e > s ? a = r : l = r, r = (l - a) * 0.5 + a;
      return r;
    },
    solve: function(e, t) {
      return this.sampleCurveY(this.solveCurveX(e, t));
    }
  }, _e;
}
var Hn = qn(), Vn = /* @__PURE__ */ Rn(Hn);
class S {
  constructor(e, t, r, i, s) {
    this.type = e, this.operator = t, this.interpolation = r, this.input = i, this.labels = [], this.outputs = [];
    for (const [o, a] of s)
      this.labels.push(o), this.outputs.push(a);
  }
  static interpolationFactor(e, t, r, i) {
    let s = 0;
    if (e.name === "exponential")
      s = Ue(t, e.base, r, i);
    else if (e.name === "linear")
      s = Ue(t, 1, r, i);
    else if (e.name === "cubic-bezier") {
      const o = e.controlPoints;
      s = new Vn(o[0], o[1], o[2], o[3]).solve(Ue(t, 1, r, i));
    }
    return s;
  }
  static parse(e, t) {
    let [r, i, s, ...o] = e;
    if (!Array.isArray(i) || i.length === 0)
      return t.error("Expected an interpolation type expression.", 1);
    if (i[0] === "linear")
      i = { name: "linear" };
    else if (i[0] === "exponential") {
      const u = i[1];
      if (typeof u != "number")
        return t.error("Exponential interpolation requires a numeric base.", 1, 1);
      i = {
        name: "exponential",
        base: u
      };
    } else if (i[0] === "cubic-bezier") {
      const u = i.slice(1);
      if (u.length !== 4 || u.some((c) => typeof c != "number" || c < 0 || c > 1))
        return t.error("Cubic bezier interpolation requires four numeric arguments with values between 0 and 1.", 1);
      i = {
        name: "cubic-bezier",
        controlPoints: u
      };
    } else
      return t.error(`Unknown interpolation type ${String(i[0])}`, 1, 0);
    if (e.length - 1 < 4)
      return t.error(`Expected at least 4 arguments, but found only ${e.length - 1}.`);
    if ((e.length - 1) % 2 !== 0)
      return t.error("Expected an even number of arguments.");
    if (s = t.parse(s, 2, h), !s)
      return null;
    const a = [];
    let l = null;
    r === "interpolate-hcl" || r === "interpolate-lab" ? l = j : t.expectedType && t.expectedType.kind !== "value" && (l = t.expectedType);
    for (let u = 0; u < o.length; u += 2) {
      const c = o[u], f = o[u + 1], y = u + 3, p = u + 4;
      if (typeof c != "number")
        return t.error('Input/output pairs for "interpolate" expressions must be defined using literal numeric values (not computed expressions) for the input values.', y);
      if (a.length && a[a.length - 1][0] >= c)
        return t.error('Input/output pairs for "interpolate" expressions must be arranged with input values in strictly ascending order.', y);
      const d = t.parse(f, p, l);
      if (!d)
        return null;
      l = l || d.type, a.push([c, d]);
    }
    return !J(l, h) && !J(l, Ae) && !J(l, j) && !J(l, xe) && !J(l, Pe) && !J(l, $(h)) ? t.error(`Type ${C(l)} is not interpolatable.`) : new S(l, r, i, s, a);
  }
  evaluate(e) {
    const t = this.labels, r = this.outputs;
    if (t.length === 1)
      return r[0].evaluate(e);
    const i = this.input.evaluate(e);
    if (i <= t[0])
      return r[0].evaluate(e);
    const s = t.length;
    if (i >= t[s - 1])
      return r[s - 1].evaluate(e);
    const o = Fe(t, i), a = t[o], l = t[o + 1], u = S.interpolationFactor(this.interpolation, i, a, l), c = r[o].evaluate(e), f = r[o + 1].evaluate(e);
    switch (this.operator) {
      case "interpolate":
        switch (this.type.kind) {
          case "number":
            return V(c, f, u);
          case "color":
            return b.interpolate(c, f, u);
          case "padding":
            return D.interpolate(c, f, u);
          case "variableAnchorOffsetCollection":
            return P.interpolate(c, f, u);
          case "array":
            return oe(c, f, u);
          case "projectionDefinition":
            return x.interpolate(c, f, u);
        }
      case "interpolate-hcl":
        return b.interpolate(c, f, u, "hcl");
      case "interpolate-lab":
        return b.interpolate(c, f, u, "lab");
    }
  }
  eachChild(e) {
    e(this.input);
    for (const t of this.outputs)
      e(t);
  }
  outputDefined() {
    return this.outputs.every((e) => e.outputDefined());
  }
}
function Ue(n, e, t, r) {
  const i = r - t, s = n - t;
  return i === 0 ? 0 : e === 1 ? s / i : (Math.pow(e, s) - 1) / (Math.pow(e, i) - 1);
}
const _n = {
  color: b.interpolate,
  number: V,
  padding: D.interpolate,
  variableAnchorOffsetCollection: P.interpolate,
  array: oe
};
class le {
  constructor(e, t) {
    this.type = e, this.args = t;
  }
  static parse(e, t) {
    if (e.length < 2)
      return t.error("Expected at least one argument.");
    let r = null;
    const i = t.expectedType;
    i && i.kind !== "value" && (r = i);
    const s = [];
    for (const a of e.slice(1)) {
      const l = t.parse(a, 1 + s.length, r, void 0, { typeAnnotation: "omit" });
      if (!l)
        return null;
      r = r || l.type, s.push(l);
    }
    if (!r)
      throw new Error("No output type");
    return i && s.some((a) => se(i, a.type)) ? new le(m, s) : new le(r, s);
  }
  evaluate(e) {
    let t = null, r = 0, i;
    for (const s of this.args)
      if (r++, t = s.evaluate(e), t && t instanceof q && !t.available && (i || (i = t.name), t = null, r === this.args.length && (t = i)), t !== null)
        break;
    return t;
  }
  eachChild(e) {
    this.args.forEach(e);
  }
  outputDefined() {
    return this.args.every((e) => e.outputDefined());
  }
}
function xt(n, e) {
  return n === "==" || n === "!=" ? e.kind === "boolean" || e.kind === "string" || e.kind === "number" || e.kind === "null" || e.kind === "value" : e.kind === "string" || e.kind === "number" || e.kind === "value";
}
function Un(n, e, t) {
  return e === t;
}
function Wn(n, e, t) {
  return e !== t;
}
function Xn(n, e, t) {
  return e < t;
}
function Zn(n, e, t) {
  return e > t;
}
function Jn(n, e, t) {
  return e <= t;
}
function Gn(n, e, t) {
  return e >= t;
}
function tn(n, e, t, r) {
  return r.compare(e, t) === 0;
}
function Qn(n, e, t, r) {
  return !tn(n, e, t, r);
}
function Yn(n, e, t, r) {
  return r.compare(e, t) < 0;
}
function Kn(n, e, t, r) {
  return r.compare(e, t) > 0;
}
function er(n, e, t, r) {
  return r.compare(e, t) <= 0;
}
function tr(n, e, t, r) {
  return r.compare(e, t) >= 0;
}
function te(n, e, t) {
  const r = n !== "==" && n !== "!=";
  return class nn {
    constructor(s, o, a) {
      this.type = g, this.lhs = s, this.rhs = o, this.collator = a, this.hasUntypedArgument = s.type.kind === "value" || o.type.kind === "value";
    }
    static parse(s, o) {
      if (s.length !== 3 && s.length !== 4)
        return o.error("Expected two or three arguments.");
      const a = s[0];
      let l = o.parse(s[1], 1, m);
      if (!l)
        return null;
      if (!xt(a, l.type))
        return o.concat(1).error(`"${a}" comparisons are not supported for type '${C(l.type)}'.`);
      let u = o.parse(s[2], 2, m);
      if (!u)
        return null;
      if (!xt(a, u.type))
        return o.concat(2).error(`"${a}" comparisons are not supported for type '${C(u.type)}'.`);
      if (l.type.kind !== u.type.kind && l.type.kind !== "value" && u.type.kind !== "value")
        return o.error(`Cannot compare types '${C(l.type)}' and '${C(u.type)}'.`);
      r && (l.type.kind === "value" && u.type.kind !== "value" ? l = new N(u.type, [l]) : l.type.kind !== "value" && u.type.kind === "value" && (u = new N(l.type, [u])));
      let c = null;
      if (s.length === 4) {
        if (l.type.kind !== "string" && u.type.kind !== "string" && l.type.kind !== "value" && u.type.kind !== "value")
          return o.error("Cannot use collator to compare non-string types.");
        if (c = o.parse(s[3], 3, De), !c)
          return null;
      }
      return new nn(l, u, c);
    }
    evaluate(s) {
      const o = this.lhs.evaluate(s), a = this.rhs.evaluate(s);
      if (r && this.hasUntypedArgument) {
        const l = T(o), u = T(a);
        if (l.kind !== u.kind || !(l.kind === "string" || l.kind === "number"))
          throw new E(`Expected arguments for "${n}" to be (string, string) or (number, number), but found (${l.kind}, ${u.kind}) instead.`);
      }
      if (this.collator && !r && this.hasUntypedArgument) {
        const l = T(o), u = T(a);
        if (l.kind !== "string" || u.kind !== "string")
          return e(s, o, a);
      }
      return this.collator ? t(s, o, a, this.collator.evaluate(s)) : e(s, o, a);
    }
    eachChild(s) {
      s(this.lhs), s(this.rhs), this.collator && s(this.collator);
    }
    outputDefined() {
      return !0;
    }
  };
}
const nr = te("==", Un, tn), rr = te("!=", Wn, Qn), ir = te("<", Xn, Yn), sr = te(">", Zn, Kn), or = te("<=", Jn, er), ar = te(">=", Gn, tr);
class ze {
  constructor(e, t, r) {
    this.type = De, this.locale = r, this.caseSensitive = e, this.diacriticSensitive = t;
  }
  static parse(e, t) {
    if (e.length !== 2)
      return t.error("Expected one argument.");
    const r = e[1];
    if (typeof r != "object" || Array.isArray(r))
      return t.error("Collator options argument must be an object.");
    const i = t.parse(r["case-sensitive"] === void 0 ? !1 : r["case-sensitive"], 1, g);
    if (!i)
      return null;
    const s = t.parse(r["diacritic-sensitive"] === void 0 ? !1 : r["diacritic-sensitive"], 1, g);
    if (!s)
      return null;
    let o = null;
    return r.locale && (o = t.parse(r.locale, 1, v), !o) ? null : new ze(i, s, o);
  }
  evaluate(e) {
    return new st(this.caseSensitive.evaluate(e), this.diacriticSensitive.evaluate(e), this.locale ? this.locale.evaluate(e) : null);
  }
  eachChild(e) {
    e(this.caseSensitive), e(this.diacriticSensitive), this.locale && e(this.locale);
  }
  outputDefined() {
    return !1;
  }
}
class ct {
  constructor(e, t, r, i, s) {
    this.type = v, this.number = e, this.locale = t, this.currency = r, this.minFractionDigits = i, this.maxFractionDigits = s;
  }
  static parse(e, t) {
    if (e.length !== 3)
      return t.error("Expected two arguments.");
    const r = t.parse(e[1], 1, h);
    if (!r)
      return null;
    const i = e[2];
    if (typeof i != "object" || Array.isArray(i))
      return t.error("NumberFormat options argument must be an object.");
    let s = null;
    if (i.locale && (s = t.parse(i.locale, 1, v), !s))
      return null;
    let o = null;
    if (i.currency && (o = t.parse(i.currency, 1, v), !o))
      return null;
    let a = null;
    if (i["min-fraction-digits"] && (a = t.parse(i["min-fraction-digits"], 1, h), !a))
      return null;
    let l = null;
    return i["max-fraction-digits"] && (l = t.parse(i["max-fraction-digits"], 1, h), !l) ? null : new ct(r, s, o, a, l);
  }
  evaluate(e) {
    return new Intl.NumberFormat(this.locale ? this.locale.evaluate(e) : [], {
      style: this.currency ? "currency" : "decimal",
      currency: this.currency ? this.currency.evaluate(e) : void 0,
      minimumFractionDigits: this.minFractionDigits ? this.minFractionDigits.evaluate(e) : void 0,
      maximumFractionDigits: this.maxFractionDigits ? this.maxFractionDigits.evaluate(e) : void 0
    }).format(this.number.evaluate(e));
  }
  eachChild(e) {
    e(this.number), this.locale && e(this.locale), this.currency && e(this.currency), this.minFractionDigits && e(this.minFractionDigits), this.maxFractionDigits && e(this.maxFractionDigits);
  }
  outputDefined() {
    return !1;
  }
}
class ft {
  constructor(e) {
    this.type = $e, this.sections = e;
  }
  static parse(e, t) {
    if (e.length < 2)
      return t.error("Expected at least one argument.");
    const r = e[1];
    if (!Array.isArray(r) && typeof r == "object")
      return t.error("First argument must be an image or text section.");
    const i = [];
    let s = !1;
    for (let o = 1; o <= e.length - 1; ++o) {
      const a = e[o];
      if (s && typeof a == "object" && !Array.isArray(a)) {
        s = !1;
        let l = null;
        if (a["font-scale"] && (l = t.parse(a["font-scale"], 1, h), !l))
          return null;
        let u = null;
        if (a["text-font"] && (u = t.parse(a["text-font"], 1, $(v)), !u))
          return null;
        let c = null;
        if (a["text-color"] && (c = t.parse(a["text-color"], 1, j), !c))
          return null;
        const f = i[i.length - 1];
        f.scale = l, f.font = u, f.textColor = c;
      } else {
        const l = t.parse(e[o], 1, m);
        if (!l)
          return null;
        const u = l.type.kind;
        if (u !== "string" && u !== "value" && u !== "null" && u !== "resolvedImage")
          return t.error("Formatted text type must be 'string', 'value', 'image' or 'null'.");
        s = !0, i.push({ content: l, scale: null, font: null, textColor: null });
      }
    }
    return new ft(i);
  }
  evaluate(e) {
    const t = (r) => {
      const i = r.content.evaluate(e);
      return T(i) === ce ? new Ze("", i, null, null, null) : new Ze(ie(i), null, r.scale ? r.scale.evaluate(e) : null, r.font ? r.font.evaluate(e).join(",") : null, r.textColor ? r.textColor.evaluate(e) : null);
    };
    return new z(this.sections.map(t));
  }
  eachChild(e) {
    for (const t of this.sections)
      e(t.content), t.scale && e(t.scale), t.font && e(t.font), t.textColor && e(t.textColor);
  }
  outputDefined() {
    return !1;
  }
}
class ht {
  constructor(e) {
    this.type = ce, this.input = e;
  }
  static parse(e, t) {
    if (e.length !== 2)
      return t.error("Expected two arguments.");
    const r = t.parse(e[1], 1, v);
    return r ? new ht(r) : t.error("No image name provided.");
  }
  evaluate(e) {
    const t = this.input.evaluate(e), r = q.fromString(t);
    return r && e.availableImages && (r.available = e.availableImages.indexOf(t) > -1), r;
  }
  eachChild(e) {
    e(this.input);
  }
  outputDefined() {
    return !1;
  }
}
class pt {
  constructor(e) {
    this.type = h, this.input = e;
  }
  static parse(e, t) {
    if (e.length !== 2)
      return t.error(`Expected 1 argument, but found ${e.length - 1} instead.`);
    const r = t.parse(e[1], 1);
    return r ? r.type.kind !== "array" && r.type.kind !== "string" && r.type.kind !== "value" ? t.error(`Expected argument of type string or array, but found ${C(r.type)} instead.`) : new pt(r) : null;
  }
  evaluate(e) {
    const t = this.input.evaluate(e);
    if (typeof t == "string")
      return [...t].length;
    if (Array.isArray(t))
      return t.length;
    throw new E(`Expected value to be of type string or array, but found ${C(T(t))} instead.`);
  }
  eachChild(e) {
    e(this.input);
  }
  outputDefined() {
    return !1;
  }
}
const O = 8192;
function lr(n, e) {
  const t = ur(n[0]), r = fr(n[1]), i = Math.pow(2, e.z);
  return [Math.round(t * i * O), Math.round(r * i * O)];
}
function dt(n, e) {
  const t = Math.pow(2, e.z), r = (n[0] / O + e.x) / t, i = (n[1] / O + e.y) / t;
  return [cr(r), hr(i)];
}
function ur(n) {
  return (180 + n) / 360;
}
function cr(n) {
  return n * 360 - 180;
}
function fr(n) {
  return (180 - 180 / Math.PI * Math.log(Math.tan(Math.PI / 4 + n * Math.PI / 360))) / 360;
}
function hr(n) {
  return 360 / Math.PI * Math.atan(Math.exp((180 - n * 360) * Math.PI / 180)) - 90;
}
function fe(n, e) {
  n[0] = Math.min(n[0], e[0]), n[1] = Math.min(n[1], e[1]), n[2] = Math.max(n[2], e[0]), n[3] = Math.max(n[3], e[1]);
}
function ue(n, e) {
  return !(n[0] <= e[0] || n[2] >= e[2] || n[1] <= e[1] || n[3] >= e[3]);
}
function pr(n, e, t) {
  return e[1] > n[1] != t[1] > n[1] && n[0] < (t[0] - e[0]) * (n[1] - e[1]) / (t[1] - e[1]) + e[0];
}
function dr(n, e, t) {
  const r = n[0] - e[0], i = n[1] - e[1], s = n[0] - t[0], o = n[1] - t[1];
  return r * o - s * i === 0 && r * s <= 0 && i * o <= 0;
}
function Oe(n, e, t, r) {
  const i = [e[0] - n[0], e[1] - n[1]], s = [r[0] - t[0], r[1] - t[1]];
  return vr(s, i) === 0 ? !1 : !!(Pt(n, e, t, r) && Pt(t, r, n, e));
}
function yr(n, e, t) {
  for (const r of t)
    for (let i = 0; i < r.length - 1; ++i)
      if (Oe(n, e, r[i], r[i + 1]))
        return !0;
  return !1;
}
function ne(n, e, t = !1) {
  let r = !1;
  for (const i of e)
    for (let s = 0; s < i.length - 1; s++) {
      if (dr(n, i[s], i[s + 1]))
        return t;
      pr(n, i[s], i[s + 1]) && (r = !r);
    }
  return r;
}
function gr(n, e) {
  for (const t of e)
    if (ne(n, t))
      return !0;
  return !1;
}
function rn(n, e) {
  for (const t of n)
    if (!ne(t, e))
      return !1;
  for (let t = 0; t < n.length - 1; ++t)
    if (yr(n[t], n[t + 1], e))
      return !1;
  return !0;
}
function mr(n, e) {
  for (const t of e)
    if (rn(n, t))
      return !0;
  return !1;
}
function vr(n, e) {
  return n[0] * e[1] - n[1] * e[0];
}
function Pt(n, e, t, r) {
  const i = n[0] - t[0], s = n[1] - t[1], o = e[0] - t[0], a = e[1] - t[1], l = r[0] - t[0], u = r[1] - t[1], c = i * u - l * s, f = o * u - l * a;
  return c > 0 && f < 0 || c < 0 && f > 0;
}
function yt(n, e, t) {
  const r = [];
  for (let i = 0; i < n.length; i++) {
    const s = [];
    for (let o = 0; o < n[i].length; o++) {
      const a = lr(n[i][o], t);
      fe(e, a), s.push(a);
    }
    r.push(s);
  }
  return r;
}
function sn(n, e, t) {
  const r = [];
  for (let i = 0; i < n.length; i++) {
    const s = yt(n[i], e, t);
    r.push(s);
  }
  return r;
}
function on(n, e, t, r) {
  if (n[0] < t[0] || n[0] > t[2]) {
    const i = r * 0.5;
    let s = n[0] - t[0] > i ? -r : t[0] - n[0] > i ? r : 0;
    s === 0 && (s = n[0] - t[2] > i ? -r : t[2] - n[0] > i ? r : 0), n[0] += s;
  }
  fe(e, n);
}
function br(n) {
  n[0] = n[1] = 1 / 0, n[2] = n[3] = -1 / 0;
}
function St(n, e, t, r) {
  const i = Math.pow(2, r.z) * O, s = [r.x * O, r.y * O], o = [];
  for (const a of n)
    for (const l of a) {
      const u = [l.x + s[0], l.y + s[1]];
      on(u, e, t, i), o.push(u);
    }
  return o;
}
function Nt(n, e, t, r) {
  const i = Math.pow(2, r.z) * O, s = [r.x * O, r.y * O], o = [];
  for (const a of n) {
    const l = [];
    for (const u of a) {
      const c = [u.x + s[0], u.y + s[1]];
      fe(e, c), l.push(c);
    }
    o.push(l);
  }
  if (e[2] - e[0] <= i / 2) {
    br(e);
    for (const a of o)
      for (const l of a)
        on(l, e, t, i);
  }
  return o;
}
function wr(n, e) {
  const t = [1 / 0, 1 / 0, -1 / 0, -1 / 0], r = [1 / 0, 1 / 0, -1 / 0, -1 / 0], i = n.canonicalID();
  if (e.type === "Polygon") {
    const s = yt(e.coordinates, r, i), o = St(n.geometry(), t, r, i);
    if (!ue(t, r))
      return !1;
    for (const a of o)
      if (!ne(a, s))
        return !1;
  }
  if (e.type === "MultiPolygon") {
    const s = sn(e.coordinates, r, i), o = St(n.geometry(), t, r, i);
    if (!ue(t, r))
      return !1;
    for (const a of o)
      if (!gr(a, s))
        return !1;
  }
  return !0;
}
function kr(n, e) {
  const t = [1 / 0, 1 / 0, -1 / 0, -1 / 0], r = [1 / 0, 1 / 0, -1 / 0, -1 / 0], i = n.canonicalID();
  if (e.type === "Polygon") {
    const s = yt(e.coordinates, r, i), o = Nt(n.geometry(), t, r, i);
    if (!ue(t, r))
      return !1;
    for (const a of o)
      if (!rn(a, s))
        return !1;
  }
  if (e.type === "MultiPolygon") {
    const s = sn(e.coordinates, r, i), o = Nt(n.geometry(), t, r, i);
    if (!ue(t, r))
      return !1;
    for (const a of o)
      if (!mr(a, s))
        return !1;
  }
  return !0;
}
class X {
  constructor(e, t) {
    this.type = g, this.geojson = e, this.geometries = t;
  }
  static parse(e, t) {
    if (e.length !== 2)
      return t.error(`'within' expression requires exactly one argument, but found ${e.length - 1} instead.`);
    if (ae(e[1])) {
      const r = e[1];
      if (r.type === "FeatureCollection") {
        const i = [];
        for (const s of r.features) {
          const { type: o, coordinates: a } = s.geometry;
          o === "Polygon" && i.push(a), o === "MultiPolygon" && i.push(...a);
        }
        if (i.length) {
          const s = {
            type: "MultiPolygon",
            coordinates: i
          };
          return new X(r, s);
        }
      } else if (r.type === "Feature") {
        const i = r.geometry.type;
        if (i === "Polygon" || i === "MultiPolygon")
          return new X(r, r.geometry);
      } else if (r.type === "Polygon" || r.type === "MultiPolygon")
        return new X(r, r);
    }
    return t.error("'within' expression requires valid geojson object that contains polygon geometry type.");
  }
  evaluate(e) {
    if (e.geometry() != null && e.canonicalID() != null) {
      if (e.geometryDollarType() === "Point")
        return wr(e, this.geometries);
      if (e.geometryDollarType() === "LineString")
        return kr(e, this.geometries);
    }
    return !1;
  }
  eachChild() {
  }
  outputDefined() {
    return !0;
  }
}
class an {
  constructor(e = [], t = (r, i) => r < i ? -1 : r > i ? 1 : 0) {
    if (this.data = e, this.length = this.data.length, this.compare = t, this.length > 0)
      for (let r = (this.length >> 1) - 1; r >= 0; r--) this._down(r);
  }
  push(e) {
    this.data.push(e), this._up(this.length++);
  }
  pop() {
    if (this.length === 0) return;
    const e = this.data[0], t = this.data.pop();
    return --this.length > 0 && (this.data[0] = t, this._down(0)), e;
  }
  peek() {
    return this.data[0];
  }
  _up(e) {
    const { data: t, compare: r } = this, i = t[e];
    for (; e > 0; ) {
      const s = e - 1 >> 1, o = t[s];
      if (r(i, o) >= 0) break;
      t[e] = o, e = s;
    }
    t[e] = i;
  }
  _down(e) {
    const { data: t, compare: r } = this, i = this.length >> 1, s = t[e];
    for (; e < i; ) {
      let o = (e << 1) + 1;
      const a = o + 1;
      if (a < this.length && r(t[a], t[o]) < 0 && (o = a), r(t[o], s) >= 0) break;
      t[e] = t[o], e = o;
    }
    t[e] = s;
  }
}
const Cr = 6378.137, Lt = 1 / 298.257223563, Ft = Lt * (2 - Lt), jt = Math.PI / 180;
class gt {
  constructor(e) {
    const t = jt * Cr * 1e3, r = Math.cos(e * jt), i = 1 / (1 - Ft * (1 - r * r)), s = Math.sqrt(i);
    this.kx = t * s * r, this.ky = t * s * i * (1 - Ft);
  }
  /**
   * Given two points of the form [longitude, latitude], returns the distance.
   *
   * @param a - point [longitude, latitude]
   * @param b - point [longitude, latitude]
   * @returns distance
   * @example
   * const distance = ruler.distance([30.5, 50.5], [30.51, 50.49]);
   * //=distance
   */
  distance(e, t) {
    const r = this.wrap(e[0] - t[0]) * this.kx, i = (e[1] - t[1]) * this.ky;
    return Math.sqrt(r * r + i * i);
  }
  /**
   * Returns an object of the form {point, index, t}, where point is closest point on the line
   * from the given point, index is the start index of the segment with the closest point,
   * and t is a parameter from 0 to 1 that indicates where the closest point is on that segment.
   *
   * @param line - an array of points that form the line
   * @param p - point [longitude, latitude]
   * @returns the nearest point, its index in the array and the proportion along the line
   * @example
   * const point = ruler.pointOnLine(line, [-67.04, 50.5]).point;
   * //=point
   */
  pointOnLine(e, t) {
    let r = 1 / 0, i, s, o, a;
    for (let l = 0; l < e.length - 1; l++) {
      let u = e[l][0], c = e[l][1], f = this.wrap(e[l + 1][0] - u) * this.kx, y = (e[l + 1][1] - c) * this.ky, p = 0;
      (f !== 0 || y !== 0) && (p = (this.wrap(t[0] - u) * this.kx * f + (t[1] - c) * this.ky * y) / (f * f + y * y), p > 1 ? (u = e[l + 1][0], c = e[l + 1][1]) : p > 0 && (u += f / this.kx * p, c += y / this.ky * p)), f = this.wrap(t[0] - u) * this.kx, y = (t[1] - c) * this.ky;
      const d = f * f + y * y;
      d < r && (r = d, i = u, s = c, o = l, a = p);
    }
    return {
      point: [i, s],
      index: o,
      t: Math.max(0, Math.min(1, a))
    };
  }
  wrap(e) {
    for (; e < -180; )
      e += 360;
    for (; e > 180; )
      e -= 360;
    return e;
  }
}
const Je = 100, Ge = 50;
function ln(n, e) {
  return e[0] - n[0];
}
function Ce(n) {
  return n[1] - n[0] + 1;
}
function R(n, e) {
  return n[1] >= n[0] && n[1] < e;
}
function Qe(n, e) {
  if (n[0] > n[1])
    return [null, null];
  const t = Ce(n);
  if (e) {
    if (t === 2)
      return [n, null];
    const i = Math.floor(t / 2);
    return [
      [n[0], n[0] + i],
      [n[0] + i, n[1]]
    ];
  }
  if (t === 1)
    return [n, null];
  const r = Math.floor(t / 2) - 1;
  return [
    [n[0], n[0] + r],
    [n[0] + r + 1, n[1]]
  ];
}
function Ye(n, e) {
  if (!R(e, n.length))
    return [1 / 0, 1 / 0, -1 / 0, -1 / 0];
  const t = [1 / 0, 1 / 0, -1 / 0, -1 / 0];
  for (let r = e[0]; r <= e[1]; ++r)
    fe(t, n[r]);
  return t;
}
function Ke(n) {
  const e = [1 / 0, 1 / 0, -1 / 0, -1 / 0];
  for (const t of n)
    for (const r of t)
      fe(e, r);
  return e;
}
function zt(n) {
  return n[0] !== -1 / 0 && n[1] !== -1 / 0 && n[2] !== 1 / 0 && n[3] !== 1 / 0;
}
function mt(n, e, t) {
  if (!zt(n) || !zt(e))
    return NaN;
  let r = 0, i = 0;
  return n[2] < e[0] && (r = e[0] - n[2]), n[0] > e[2] && (r = n[0] - e[2]), n[1] > e[3] && (i = n[1] - e[3]), n[3] < e[1] && (i = e[1] - n[3]), t.distance([0, 0], [r, i]);
}
function U(n, e, t) {
  const r = t.pointOnLine(e, n);
  return t.distance(n, r.point);
}
function vt(n, e, t, r, i) {
  const s = Math.min(U(n, [t, r], i), U(e, [t, r], i)), o = Math.min(U(t, [n, e], i), U(r, [n, e], i));
  return Math.min(s, o);
}
function Er(n, e, t, r, i) {
  if (!(R(e, n.length) && R(r, t.length)))
    return 1 / 0;
  let o = 1 / 0;
  for (let a = e[0]; a < e[1]; ++a) {
    const l = n[a], u = n[a + 1];
    for (let c = r[0]; c < r[1]; ++c) {
      const f = t[c], y = t[c + 1];
      if (Oe(l, u, f, y))
        return 0;
      o = Math.min(o, vt(l, u, f, y, i));
    }
  }
  return o;
}
function Mr(n, e, t, r, i) {
  if (!(R(e, n.length) && R(r, t.length)))
    return NaN;
  let o = 1 / 0;
  for (let a = e[0]; a <= e[1]; ++a)
    for (let l = r[0]; l <= r[1]; ++l)
      if (o = Math.min(o, i.distance(n[a], t[l])), o === 0)
        return o;
  return o;
}
function Tr(n, e, t) {
  if (ne(n, e, !0))
    return 0;
  let r = 1 / 0;
  for (const i of e) {
    const s = i[0], o = i[i.length - 1];
    if (s !== o && (r = Math.min(r, U(n, [o, s], t)), r === 0))
      return r;
    const a = t.pointOnLine(i, n);
    if (r = Math.min(r, t.distance(n, a.point)), r === 0)
      return r;
  }
  return r;
}
function Ir(n, e, t, r) {
  if (!R(e, n.length))
    return NaN;
  for (let s = e[0]; s <= e[1]; ++s)
    if (ne(n[s], t, !0))
      return 0;
  let i = 1 / 0;
  for (let s = e[0]; s < e[1]; ++s) {
    const o = n[s], a = n[s + 1];
    for (const l of t)
      for (let u = 0, c = l.length, f = c - 1; u < c; f = u++) {
        const y = l[f], p = l[u];
        if (Oe(o, a, y, p))
          return 0;
        i = Math.min(i, vt(o, a, y, p, r));
      }
  }
  return i;
}
function Ot(n, e) {
  for (const t of n)
    for (const r of t)
      if (ne(r, e, !0))
        return !0;
  return !1;
}
function Ar(n, e, t, r = 1 / 0) {
  const i = Ke(n), s = Ke(e);
  if (r !== 1 / 0 && mt(i, s, t) >= r)
    return r;
  if (ue(i, s)) {
    if (Ot(n, e))
      return 0;
  } else if (Ot(e, n))
    return 0;
  let o = 1 / 0;
  for (const a of n)
    for (let l = 0, u = a.length, c = u - 1; l < u; c = l++) {
      const f = a[c], y = a[l];
      for (const p of e)
        for (let d = 0, w = p.length, M = w - 1; d < w; M = d++) {
          const I = p[M], A = p[d];
          if (Oe(f, y, I, A))
            return 0;
          o = Math.min(o, vt(f, y, I, A, t));
        }
    }
  return o;
}
function Bt(n, e, t, r, i, s) {
  if (!s)
    return;
  const o = mt(Ye(r, s), i, t);
  o < e && n.push([o, s, [0, 0]]);
}
function ve(n, e, t, r, i, s, o) {
  if (!s || !o)
    return;
  const a = mt(Ye(r, s), Ye(i, o), t);
  a < e && n.push([a, s, o]);
}
function Ee(n, e, t, r, i = 1 / 0) {
  let s = Math.min(r.distance(n[0], t[0][0]), i);
  if (s === 0)
    return s;
  const o = new an([[0, [0, n.length - 1], [0, 0]]], ln), a = Ke(t);
  for (; o.length > 0; ) {
    const l = o.pop();
    if (l[0] >= s)
      continue;
    const u = l[1], c = e ? Ge : Je;
    if (Ce(u) <= c) {
      if (!R(u, n.length))
        return NaN;
      if (e) {
        const f = Ir(n, u, t, r);
        if (isNaN(f) || f === 0)
          return f;
        s = Math.min(s, f);
      } else
        for (let f = u[0]; f <= u[1]; ++f) {
          const y = Tr(n[f], t, r);
          if (s = Math.min(s, y), s === 0)
            return 0;
        }
    } else {
      const f = Qe(u, e);
      Bt(o, s, r, n, a, f[0]), Bt(o, s, r, n, a, f[1]);
    }
  }
  return s;
}
function Me(n, e, t, r, i, s = 1 / 0) {
  let o = Math.min(s, i.distance(n[0], t[0]));
  if (o === 0)
    return o;
  const a = new an([[0, [0, n.length - 1], [0, t.length - 1]]], ln);
  for (; a.length > 0; ) {
    const l = a.pop();
    if (l[0] >= o)
      continue;
    const u = l[1], c = l[2], f = e ? Ge : Je, y = r ? Ge : Je;
    if (Ce(u) <= f && Ce(c) <= y) {
      if (!R(u, n.length) && R(c, t.length))
        return NaN;
      let p;
      if (e && r)
        p = Er(n, u, t, c, i), o = Math.min(o, p);
      else if (e && !r) {
        const d = n.slice(u[0], u[1] + 1);
        for (let w = c[0]; w <= c[1]; ++w)
          if (p = U(t[w], d, i), o = Math.min(o, p), o === 0)
            return o;
      } else if (!e && r) {
        const d = t.slice(c[0], c[1] + 1);
        for (let w = u[0]; w <= u[1]; ++w)
          if (p = U(n[w], d, i), o = Math.min(o, p), o === 0)
            return o;
      } else
        p = Mr(n, u, t, c, i), o = Math.min(o, p);
    } else {
      const p = Qe(u, e), d = Qe(c, r);
      ve(a, o, i, n, t, p[0], d[0]), ve(a, o, i, n, t, p[0], d[1]), ve(a, o, i, n, t, p[1], d[0]), ve(a, o, i, n, t, p[1], d[1]);
    }
  }
  return o;
}
function Dr(n, e) {
  const t = n.geometry(), r = t.flat().map((o) => dt([o.x, o.y], n.canonical));
  if (t.length === 0)
    return NaN;
  const i = new gt(r[0][1]);
  let s = 1 / 0;
  for (const o of e) {
    switch (o.type) {
      case "Point":
        s = Math.min(s, Me(r, !1, [o.coordinates], !1, i, s));
        break;
      case "LineString":
        s = Math.min(s, Me(r, !1, o.coordinates, !0, i, s));
        break;
      case "Polygon":
        s = Math.min(s, Ee(r, !1, o.coordinates, i, s));
        break;
    }
    if (s === 0)
      return s;
  }
  return s;
}
function $r(n, e) {
  const t = n.geometry(), r = t.flat().map((o) => dt([o.x, o.y], n.canonical));
  if (t.length === 0)
    return NaN;
  const i = new gt(r[0][1]);
  let s = 1 / 0;
  for (const o of e) {
    switch (o.type) {
      case "Point":
        s = Math.min(s, Me(r, !0, [o.coordinates], !1, i, s));
        break;
      case "LineString":
        s = Math.min(s, Me(r, !0, o.coordinates, !0, i, s));
        break;
      case "Polygon":
        s = Math.min(s, Ee(r, !0, o.coordinates, i, s));
        break;
    }
    if (s === 0)
      return s;
  }
  return s;
}
function xr(n, e) {
  const t = n.geometry();
  if (t.length === 0 || t[0].length === 0)
    return NaN;
  const r = zn(t).map((o) => o.map((a) => a.map((l) => dt([l.x, l.y], n.canonical)))), i = new gt(r[0][0][0][1]);
  let s = 1 / 0;
  for (const o of e)
    for (const a of r) {
      switch (o.type) {
        case "Point":
          s = Math.min(s, Ee([o.coordinates], !1, a, i, s));
          break;
        case "LineString":
          s = Math.min(s, Ee(o.coordinates, !0, a, i, s));
          break;
        case "Polygon":
          s = Math.min(s, Ar(a, o.coordinates, i, s));
          break;
      }
      if (s === 0)
        return s;
    }
  return s;
}
function We(n) {
  return n.type === "MultiPolygon" ? n.coordinates.map((e) => ({
    type: "Polygon",
    coordinates: e
  })) : n.type === "MultiLineString" ? n.coordinates.map((e) => ({
    type: "LineString",
    coordinates: e
  })) : n.type === "MultiPoint" ? n.coordinates.map((e) => ({
    type: "Point",
    coordinates: e
  })) : [n];
}
class Z {
  constructor(e, t) {
    this.type = h, this.geojson = e, this.geometries = t;
  }
  static parse(e, t) {
    if (e.length !== 2)
      return t.error(`'distance' expression requires exactly one argument, but found ${e.length - 1} instead.`);
    if (ae(e[1])) {
      const r = e[1];
      if (r.type === "FeatureCollection")
        return new Z(r, r.features.map((i) => We(i.geometry)).flat());
      if (r.type === "Feature")
        return new Z(r, We(r.geometry));
      if ("type" in r && "coordinates" in r)
        return new Z(r, We(r));
    }
    return t.error("'distance' expression requires valid geojson object that contains polygon geometry type.");
  }
  evaluate(e) {
    if (e.geometry() != null && e.canonicalID() != null) {
      if (e.geometryType() === "Point")
        return Dr(e, this.geometries);
      if (e.geometryType() === "LineString")
        return $r(e, this.geometries);
      if (e.geometryType() === "Polygon")
        return xr(e, this.geometries);
    }
    return NaN;
  }
  eachChild() {
  }
  outputDefined() {
    return !0;
  }
}
const bt = {
  // special forms
  "==": nr,
  "!=": rr,
  ">": sr,
  "<": ir,
  ">=": ar,
  "<=": or,
  array: N,
  at: ot,
  boolean: N,
  case: ut,
  coalesce: le,
  collator: ze,
  format: ft,
  image: ht,
  in: at,
  "index-of": we,
  interpolate: S,
  "interpolate-hcl": S,
  "interpolate-lab": S,
  length: pt,
  let: Ne,
  literal: ee,
  match: lt,
  number: N,
  "number-format": ct,
  object: N,
  slice: ke,
  step: je,
  string: N,
  "to-boolean": H,
  "to-color": H,
  "to-number": H,
  "to-string": H,
  var: Le,
  within: X,
  distance: Z
};
class L {
  constructor(e, t, r, i) {
    this.name = e, this.type = t, this._evaluate = r, this.args = i;
  }
  evaluate(e) {
    return this._evaluate(e, this.args);
  }
  eachChild(e) {
    this.args.forEach(e);
  }
  outputDefined() {
    return !1;
  }
  static parse(e, t) {
    const r = e[0], i = L.definitions[r];
    if (!i)
      return t.error(`Unknown expression "${r}". If you wanted a literal array, use ["literal", [...]].`, 0);
    const s = Array.isArray(i) ? i[0] : i.type, o = Array.isArray(i) ? [[i[1], i[2]]] : i.overloads, a = o.filter(([u]) => !Array.isArray(u) || // varags
    u.length === e.length - 1);
    let l = null;
    for (const [u, c] of a) {
      l = new Se(t.registry, Te, t.path, null, t.scope);
      const f = [];
      let y = !1;
      for (let p = 1; p < e.length; p++) {
        const d = e[p], w = Array.isArray(u) ? u[p - 1] : u.type, M = l.parse(d, 1 + f.length, w);
        if (!M) {
          y = !0;
          break;
        }
        f.push(M);
      }
      if (!y) {
        if (Array.isArray(u) && u.length !== f.length) {
          l.error(`Expected ${u.length} arguments, but found ${f.length} instead.`);
          continue;
        }
        for (let p = 0; p < f.length; p++) {
          const d = Array.isArray(u) ? u[p] : u.type, w = f[p];
          l.concat(p + 1).checkSubtype(d, w.type);
        }
        if (l.errors.length === 0)
          return new L(r, s, c, f);
      }
    }
    if (a.length === 1)
      t.errors.push(...l.errors);
    else {
      const c = (a.length ? a : o).map(([y]) => Sr(y)).join(" | "), f = [];
      for (let y = 1; y < e.length; y++) {
        const p = t.parse(e[y], 1 + f.length);
        if (!p)
          return null;
        f.push(C(p.type));
      }
      t.error(`Expected arguments of type ${c}, but found (${f.join(", ")}) instead.`);
    }
    return null;
  }
  static register(e, t) {
    L.definitions = t;
    for (const r in t)
      e[r] = L;
  }
}
function Rt(n, [e, t, r, i]) {
  e = e.evaluate(n), t = t.evaluate(n), r = r.evaluate(n);
  const s = i ? i.evaluate(n) : 1, o = Yt(e, t, r, s);
  if (o)
    throw new E(o);
  return new b(e / 255, t / 255, r / 255, s, !1);
}
function qt(n, e) {
  return n in e;
}
function Xe(n, e) {
  const t = e[n];
  return typeof t > "u" ? null : t;
}
function Pr(n, e, t, r) {
  for (; t <= r; ) {
    const i = t + r >> 1;
    if (e[i] === n)
      return !0;
    e[i] > n ? r = i - 1 : t = i + 1;
  }
  return !1;
}
function _(n) {
  return { type: n };
}
L.register(bt, {
  error: [
    Tn,
    [v],
    (n, [e]) => {
      throw new E(e.evaluate(n));
    }
  ],
  typeof: [
    v,
    [m],
    (n, [e]) => C(T(e.evaluate(n)))
  ],
  "to-rgba": [
    $(h, 4),
    [j],
    (n, [e]) => {
      const [t, r, i, s] = e.evaluate(n).rgb;
      return [t * 255, r * 255, i * 255, s];
    }
  ],
  rgb: [
    j,
    [h, h, h],
    Rt
  ],
  rgba: [
    j,
    [h, h, h, h],
    Rt
  ],
  has: {
    type: g,
    overloads: [
      [
        [v],
        (n, [e]) => qt(e.evaluate(n), n.properties())
      ],
      [
        [v, Y],
        (n, [e, t]) => qt(e.evaluate(n), t.evaluate(n))
      ]
    ]
  },
  get: {
    type: m,
    overloads: [
      [
        [v],
        (n, [e]) => Xe(e.evaluate(n), n.properties())
      ],
      [
        [v, Y],
        (n, [e, t]) => Xe(e.evaluate(n), t.evaluate(n))
      ]
    ]
  },
  "feature-state": [
    m,
    [v],
    (n, [e]) => Xe(e.evaluate(n), n.featureState || {})
  ],
  properties: [
    Y,
    [],
    (n) => n.properties()
  ],
  "geometry-type": [
    v,
    [],
    (n) => n.geometryType()
  ],
  id: [
    m,
    [],
    (n) => n.id()
  ],
  zoom: [
    h,
    [],
    (n) => n.globals.zoom
  ],
  "heatmap-density": [
    h,
    [],
    (n) => n.globals.heatmapDensity || 0
  ],
  "line-progress": [
    h,
    [],
    (n) => n.globals.lineProgress || 0
  ],
  accumulated: [
    m,
    [],
    (n) => n.globals.accumulated === void 0 ? null : n.globals.accumulated
  ],
  "+": [
    h,
    _(h),
    (n, e) => {
      let t = 0;
      for (const r of e)
        t += r.evaluate(n);
      return t;
    }
  ],
  "*": [
    h,
    _(h),
    (n, e) => {
      let t = 1;
      for (const r of e)
        t *= r.evaluate(n);
      return t;
    }
  ],
  "-": {
    type: h,
    overloads: [
      [
        [h, h],
        (n, [e, t]) => e.evaluate(n) - t.evaluate(n)
      ],
      [
        [h],
        (n, [e]) => -e.evaluate(n)
      ]
    ]
  },
  "/": [
    h,
    [h, h],
    (n, [e, t]) => e.evaluate(n) / t.evaluate(n)
  ],
  "%": [
    h,
    [h, h],
    (n, [e, t]) => e.evaluate(n) % t.evaluate(n)
  ],
  ln2: [
    h,
    [],
    () => Math.LN2
  ],
  pi: [
    h,
    [],
    () => Math.PI
  ],
  e: [
    h,
    [],
    () => Math.E
  ],
  "^": [
    h,
    [h, h],
    (n, [e, t]) => Math.pow(e.evaluate(n), t.evaluate(n))
  ],
  sqrt: [
    h,
    [h],
    (n, [e]) => Math.sqrt(e.evaluate(n))
  ],
  log10: [
    h,
    [h],
    (n, [e]) => Math.log(e.evaluate(n)) / Math.LN10
  ],
  ln: [
    h,
    [h],
    (n, [e]) => Math.log(e.evaluate(n))
  ],
  log2: [
    h,
    [h],
    (n, [e]) => Math.log(e.evaluate(n)) / Math.LN2
  ],
  sin: [
    h,
    [h],
    (n, [e]) => Math.sin(e.evaluate(n))
  ],
  cos: [
    h,
    [h],
    (n, [e]) => Math.cos(e.evaluate(n))
  ],
  tan: [
    h,
    [h],
    (n, [e]) => Math.tan(e.evaluate(n))
  ],
  asin: [
    h,
    [h],
    (n, [e]) => Math.asin(e.evaluate(n))
  ],
  acos: [
    h,
    [h],
    (n, [e]) => Math.acos(e.evaluate(n))
  ],
  atan: [
    h,
    [h],
    (n, [e]) => Math.atan(e.evaluate(n))
  ],
  min: [
    h,
    _(h),
    (n, e) => Math.min(...e.map((t) => t.evaluate(n)))
  ],
  max: [
    h,
    _(h),
    (n, e) => Math.max(...e.map((t) => t.evaluate(n)))
  ],
  abs: [
    h,
    [h],
    (n, [e]) => Math.abs(e.evaluate(n))
  ],
  round: [
    h,
    [h],
    (n, [e]) => {
      const t = e.evaluate(n);
      return t < 0 ? -Math.round(-t) : Math.round(t);
    }
  ],
  floor: [
    h,
    [h],
    (n, [e]) => Math.floor(e.evaluate(n))
  ],
  ceil: [
    h,
    [h],
    (n, [e]) => Math.ceil(e.evaluate(n))
  ],
  "filter-==": [
    g,
    [v, m],
    (n, [e, t]) => n.properties()[e.value] === t.value
  ],
  "filter-id-==": [
    g,
    [m],
    (n, [e]) => n.id() === e.value
  ],
  "filter-type-==": [
    g,
    [v],
    (n, [e]) => n.geometryDollarType() === e.value
  ],
  "filter-<": [
    g,
    [v, m],
    (n, [e, t]) => {
      const r = n.properties()[e.value], i = t.value;
      return typeof r == typeof i && r < i;
    }
  ],
  "filter-id-<": [
    g,
    [m],
    (n, [e]) => {
      const t = n.id(), r = e.value;
      return typeof t == typeof r && t < r;
    }
  ],
  "filter->": [
    g,
    [v, m],
    (n, [e, t]) => {
      const r = n.properties()[e.value], i = t.value;
      return typeof r == typeof i && r > i;
    }
  ],
  "filter-id->": [
    g,
    [m],
    (n, [e]) => {
      const t = n.id(), r = e.value;
      return typeof t == typeof r && t > r;
    }
  ],
  "filter-<=": [
    g,
    [v, m],
    (n, [e, t]) => {
      const r = n.properties()[e.value], i = t.value;
      return typeof r == typeof i && r <= i;
    }
  ],
  "filter-id-<=": [
    g,
    [m],
    (n, [e]) => {
      const t = n.id(), r = e.value;
      return typeof t == typeof r && t <= r;
    }
  ],
  "filter->=": [
    g,
    [v, m],
    (n, [e, t]) => {
      const r = n.properties()[e.value], i = t.value;
      return typeof r == typeof i && r >= i;
    }
  ],
  "filter-id->=": [
    g,
    [m],
    (n, [e]) => {
      const t = n.id(), r = e.value;
      return typeof t == typeof r && t >= r;
    }
  ],
  "filter-has": [
    g,
    [m],
    (n, [e]) => e.value in n.properties()
  ],
  "filter-has-id": [
    g,
    [],
    (n) => n.id() !== null && n.id() !== void 0
  ],
  "filter-type-in": [
    g,
    [$(v)],
    (n, [e]) => e.value.indexOf(n.geometryDollarType()) >= 0
  ],
  "filter-id-in": [
    g,
    [$(m)],
    (n, [e]) => e.value.indexOf(n.id()) >= 0
  ],
  "filter-in-small": [
    g,
    [v, $(m)],
    // assumes v is an array literal
    (n, [e, t]) => t.value.indexOf(n.properties()[e.value]) >= 0
  ],
  "filter-in-large": [
    g,
    [v, $(m)],
    // assumes v is a array literal with values sorted in ascending order and of a single type
    (n, [e, t]) => Pr(n.properties()[e.value], t.value, 0, t.value.length - 1)
  ],
  all: {
    type: g,
    overloads: [
      [
        [g, g],
        (n, [e, t]) => e.evaluate(n) && t.evaluate(n)
      ],
      [
        _(g),
        (n, e) => {
          for (const t of e)
            if (!t.evaluate(n))
              return !1;
          return !0;
        }
      ]
    ]
  },
  any: {
    type: g,
    overloads: [
      [
        [g, g],
        (n, [e, t]) => e.evaluate(n) || t.evaluate(n)
      ],
      [
        _(g),
        (n, e) => {
          for (const t of e)
            if (t.evaluate(n))
              return !0;
          return !1;
        }
      ]
    ]
  },
  "!": [
    g,
    [g],
    (n, [e]) => !e.evaluate(n)
  ],
  "is-supported-script": [
    g,
    [v],
    // At parse time this will always return true, so we need to exclude this expression with isGlobalPropertyConstant
    (n, [e]) => {
      const t = n.globals && n.globals.isSupportedScript;
      return t ? t(e.evaluate(n)) : !0;
    }
  ],
  upcase: [
    v,
    [v],
    (n, [e]) => e.evaluate(n).toUpperCase()
  ],
  downcase: [
    v,
    [v],
    (n, [e]) => e.evaluate(n).toLowerCase()
  ],
  concat: [
    v,
    _(m),
    (n, e) => e.map((t) => ie(t.evaluate(n))).join("")
  ],
  "resolved-locale": [
    v,
    [De],
    (n, [e]) => e.evaluate(n).resolvedLocale()
  ]
});
function Sr(n) {
  return Array.isArray(n) ? `(${n.map(C).join(", ")})` : `(${C(n.type)}...)`;
}
function Te(n) {
  if (n instanceof Le)
    return Te(n.boundExpression);
  if (n instanceof L && n.name === "error")
    return !1;
  if (n instanceof ze)
    return !1;
  if (n instanceof X)
    return !1;
  if (n instanceof Z)
    return !1;
  const e = n instanceof H || n instanceof N;
  let t = !0;
  return n.eachChild((r) => {
    e ? t = t && Te(r) : t = t && r instanceof ee;
  }), t ? wt(n) && Ct(n, ["zoom", "heatmap-density", "line-progress", "accumulated", "is-supported-script"]) : !1;
}
function wt(n) {
  if (n instanceof L) {
    if (n.name === "get" && n.args.length === 1)
      return !1;
    if (n.name === "feature-state")
      return !1;
    if (n.name === "has" && n.args.length === 1)
      return !1;
    if (n.name === "properties" || n.name === "geometry-type" || n.name === "id")
      return !1;
    if (/^filter-/.test(n.name))
      return !1;
  }
  if (n instanceof X || n instanceof Z)
    return !1;
  let e = !0;
  return n.eachChild((t) => {
    e && !wt(t) && (e = !1);
  }), e;
}
function kt(n) {
  if (n instanceof L && n.name === "feature-state")
    return !1;
  let e = !0;
  return n.eachChild((t) => {
    e && !kt(t) && (e = !1);
  }), e;
}
function Ct(n, e) {
  if (n instanceof L && e.indexOf(n.name) >= 0)
    return !1;
  let t = !0;
  return n.eachChild((r) => {
    t && !Ct(r, e) && (t = !1);
  }), t;
}
function et(n) {
  return { result: "success", value: n };
}
function Q(n) {
  return { result: "error", value: n };
}
function Nr(n) {
  return n["property-type"] === "data-driven" || n["property-type"] === "cross-faded-data-driven";
}
function Lr(n) {
  return !!n.expression && n.expression.parameters.indexOf("zoom") > -1;
}
function un(n) {
  return !!n.expression && n.expression.interpolated;
}
function Et(n) {
  return n instanceof Number ? "number" : n instanceof String ? "string" : n instanceof Boolean ? "boolean" : Array.isArray(n) ? "array" : n === null ? "null" : typeof n;
}
function cn(n) {
  return typeof n == "object" && n !== null && !Array.isArray(n);
}
function Fr(n) {
  return n;
}
function fn(n, e) {
  const t = e.type === "color", r = n.stops && typeof n.stops[0][0] == "object", i = r || n.property !== void 0, s = r || !i, o = n.type || (un(e) ? "exponential" : "interval");
  if (t || e.type === "padding") {
    const c = t ? b.parse : D.parse;
    n = Vt({}, n), n.stops && (n.stops = n.stops.map((f) => [f[0], c(f[1])])), n.default ? n.default = c(n.default) : n.default = c(e.default);
  }
  if (n.colorSpace && !Fn(n.colorSpace))
    throw new Error(`Unknown color space: "${n.colorSpace}"`);
  let a, l, u;
  if (o === "exponential")
    a = Ht;
  else if (o === "interval")
    a = zr;
  else if (o === "categorical") {
    a = jr, l = /* @__PURE__ */ Object.create(null);
    for (const c of n.stops)
      l[c[0]] = c[1];
    u = typeof n.stops[0][0];
  } else if (o === "identity")
    a = Or;
  else
    throw new Error(`Unknown function type "${o}"`);
  if (r) {
    const c = {}, f = [];
    for (let d = 0; d < n.stops.length; d++) {
      const w = n.stops[d], M = w[0].zoom;
      c[M] === void 0 && (c[M] = {
        zoom: M,
        type: n.type,
        property: n.property,
        default: n.default,
        stops: []
      }, f.push(M)), c[M].stops.push([w[0].value, w[1]]);
    }
    const y = [];
    for (const d of f)
      y.push([c[d].zoom, fn(c[d], e)]);
    const p = { name: "linear" };
    return {
      kind: "composite",
      interpolationType: p,
      interpolationFactor: S.interpolationFactor.bind(void 0, p),
      zoomStops: y.map((d) => d[0]),
      evaluate({ zoom: d }, w) {
        return Ht({
          stops: y,
          base: n.base
        }, e, d).evaluate(d, w);
      }
    };
  } else if (s) {
    const c = o === "exponential" ? { name: "exponential", base: n.base !== void 0 ? n.base : 1 } : null;
    return {
      kind: "camera",
      interpolationType: c,
      interpolationFactor: S.interpolationFactor.bind(void 0, c),
      zoomStops: n.stops.map((f) => f[0]),
      evaluate: ({ zoom: f }) => a(n, e, f, l, u)
    };
  } else
    return {
      kind: "source",
      evaluate(c, f) {
        const y = f && f.properties ? f.properties[n.property] : void 0;
        return y === void 0 ? he(n.default, e.default) : a(n, e, y, l, u);
      }
    };
}
function he(n, e, t) {
  if (n !== void 0)
    return n;
  if (e !== void 0)
    return e;
  if (t !== void 0)
    return t;
}
function jr(n, e, t, r, i) {
  const s = typeof t === i ? r[t] : void 0;
  return he(s, n.default, e.default);
}
function zr(n, e, t) {
  if (Et(t) !== "number")
    return he(n.default, e.default);
  const r = n.stops.length;
  if (r === 1 || t <= n.stops[0][0])
    return n.stops[0][1];
  if (t >= n.stops[r - 1][0])
    return n.stops[r - 1][1];
  const i = Fe(n.stops.map((s) => s[0]), t);
  return n.stops[i][1];
}
function Ht(n, e, t) {
  const r = n.base !== void 0 ? n.base : 1;
  if (Et(t) !== "number")
    return he(n.default, e.default);
  const i = n.stops.length;
  if (i === 1 || t <= n.stops[0][0])
    return n.stops[0][1];
  if (t >= n.stops[i - 1][0])
    return n.stops[i - 1][1];
  const s = Fe(n.stops.map((c) => c[0]), t), o = Br(t, r, n.stops[s][0], n.stops[s + 1][0]), a = n.stops[s][1], l = n.stops[s + 1][1], u = _n[e.type] || Fr;
  return typeof a.evaluate == "function" ? {
    evaluate(...c) {
      const f = a.evaluate.apply(void 0, c), y = l.evaluate.apply(void 0, c);
      if (!(f === void 0 || y === void 0))
        return u(f, y, o, n.colorSpace);
    }
  } : u(a, l, o, n.colorSpace);
}
function Or(n, e, t) {
  switch (e.type) {
    case "color":
      t = b.parse(t);
      break;
    case "formatted":
      t = z.fromString(t.toString());
      break;
    case "resolvedImage":
      t = q.fromString(t.toString());
      break;
    case "padding":
      t = D.parse(t);
      break;
    default:
      Et(t) !== e.type && (e.type !== "enum" || !e.values[t]) && (t = void 0);
  }
  return he(t, n.default, e.default);
}
function Br(n, e, t, r) {
  const i = r - t, s = n - t;
  return i === 0 ? 0 : e === 1 ? s / i : (Math.pow(e, s) - 1) / (Math.pow(e, i) - 1);
}
class hn {
  constructor(e, t) {
    this.expression = e, this._warningHistory = {}, this._evaluator = new en(), this._defaultValue = t ? Vr(t) : null, this._enumValues = t && t.type === "enum" ? t.values : null;
  }
  evaluateWithoutErrorHandling(e, t, r, i, s, o) {
    return this._evaluator.globals = e, this._evaluator.feature = t, this._evaluator.featureState = r, this._evaluator.canonical = i, this._evaluator.availableImages = s || null, this._evaluator.formattedSection = o, this.expression.evaluate(this._evaluator);
  }
  evaluate(e, t, r, i, s, o) {
    this._evaluator.globals = e, this._evaluator.feature = t || null, this._evaluator.featureState = r || null, this._evaluator.canonical = i, this._evaluator.availableImages = s || null, this._evaluator.formattedSection = o || null;
    try {
      const a = this.expression.evaluate(this._evaluator);
      if (a == null || typeof a == "number" && a !== a)
        return this._defaultValue;
      if (this._enumValues && !(a in this._enumValues))
        throw new E(`Expected value to be one of ${Object.keys(this._enumValues).map((l) => JSON.stringify(l)).join(", ")}, but found ${JSON.stringify(a)} instead.`);
      return a;
    } catch (a) {
      return this._warningHistory[a.message] || (this._warningHistory[a.message] = !0, typeof console < "u" && console.warn(a.message)), this._defaultValue;
    }
  }
}
function pn(n) {
  return Array.isArray(n) && n.length > 0 && typeof n[0] == "string" && n[0] in bt;
}
function dn(n, e) {
  const t = new Se(bt, Te, [], e ? Hr(e) : void 0), r = t.parse(n, void 0, void 0, void 0, e && e.type === "string" ? { typeAnnotation: "coerce" } : void 0);
  return r ? et(new hn(r, e)) : Q(t.errors);
}
class tt {
  constructor(e, t) {
    this.kind = e, this._styleExpression = t, this.isStateDependent = e !== "constant" && !kt(t.expression);
  }
  evaluateWithoutErrorHandling(e, t, r, i, s, o) {
    return this._styleExpression.evaluateWithoutErrorHandling(e, t, r, i, s, o);
  }
  evaluate(e, t, r, i, s, o) {
    return this._styleExpression.evaluate(e, t, r, i, s, o);
  }
}
class nt {
  constructor(e, t, r, i) {
    this.kind = e, this.zoomStops = r, this._styleExpression = t, this.isStateDependent = e !== "camera" && !kt(t.expression), this.interpolationType = i;
  }
  evaluateWithoutErrorHandling(e, t, r, i, s, o) {
    return this._styleExpression.evaluateWithoutErrorHandling(e, t, r, i, s, o);
  }
  evaluate(e, t, r, i, s, o) {
    return this._styleExpression.evaluate(e, t, r, i, s, o);
  }
  interpolationFactor(e, t, r) {
    return this.interpolationType ? S.interpolationFactor(this.interpolationType, e, t, r) : 0;
  }
}
function Rr(n) {
  return n._styleExpression !== void 0;
}
function yn(n, e) {
  const t = dn(n, e);
  if (t.result === "error")
    return t;
  const r = t.value.expression, i = wt(r);
  if (!i && !Nr(e))
    return Q([new F("", "data expressions not supported")]);
  const s = Ct(r, ["zoom"]);
  if (!s && !Lr(e))
    return Q([new F("", "zoom expressions not supported")]);
  const o = be(r);
  if (!o && !s)
    return Q([new F("", '"zoom" expression may only be used as input to a top-level "step" or "interpolate" expression.')]);
  if (o instanceof F)
    return Q([o]);
  if (o instanceof S && !un(e))
    return Q([new F("", '"interpolate" expressions cannot be used with this property')]);
  if (!o)
    return et(i ? new tt("constant", t.value) : new tt("source", t.value));
  const a = o instanceof S ? o.interpolation : void 0;
  return et(i ? new nt("camera", t.value, o.labels, a) : new nt("composite", t.value, o.labels, a));
}
class Be {
  constructor(e, t) {
    this._parameters = e, this._specification = t, Vt(this, fn(this._parameters, this._specification));
  }
  static deserialize(e) {
    return new Be(e._parameters, e._specification);
  }
  static serialize(e) {
    return {
      _parameters: e._parameters,
      _specification: e._specification
    };
  }
}
function qr(n, e) {
  if (cn(n))
    return new Be(n, e);
  if (pn(n)) {
    const t = yn(n, e);
    if (t.result === "error")
      throw new Error(t.value.map((r) => `${r.key}: ${r.message}`).join(", "));
    return t.value;
  } else {
    let t = n;
    return e.type === "color" && typeof n == "string" ? t = b.parse(n) : e.type === "padding" && (typeof n == "number" || Array.isArray(n)) ? t = D.parse(n) : e.type === "variableAnchorOffsetCollection" && Array.isArray(n) ? t = P.parse(n) : e.type === "projectionDefinition" && typeof n == "string" && (t = x.parse(n)), {
      kind: "constant",
      evaluate: () => t
    };
  }
}
function be(n) {
  let e = null;
  if (n instanceof Ne)
    e = be(n.result);
  else if (n instanceof le) {
    for (const t of n.args)
      if (e = be(t), e)
        break;
  } else (n instanceof je || n instanceof S) && n.input instanceof L && n.input.name === "zoom" && (e = n);
  return e instanceof F || n.eachChild((t) => {
    const r = be(t);
    r instanceof F ? e = r : !e && r ? e = new F("", '"zoom" expression may only be used as input to a top-level "step" or "interpolate" expression.') : e && r && e !== r && (e = new F("", 'Only one zoom-based "step" or "interpolate" subexpression may be used in an expression.'));
  }), e;
}
function Hr(n) {
  const e = {
    color: j,
    string: v,
    number: h,
    enum: v,
    boolean: g,
    formatted: $e,
    padding: xe,
    projectionDefinition: Ae,
    resolvedImage: ce,
    variableAnchorOffsetCollection: Pe
  };
  return n.type === "array" ? $(e[n.value] || m, n.length) : e[n.type];
}
function Vr(n) {
  return n.type === "color" && cn(n.default) ? new b(0, 0, 0, 0) : n.type === "color" ? b.parse(n.default) || null : n.type === "padding" ? D.parse(n.default) || null : n.type === "variableAnchorOffsetCollection" ? P.parse(n.default) || null : n.type === "projectionDefinition" ? x.parse(n.default) || null : n.default === void 0 ? null : n.default;
}
function gn(n) {
  if (n === !0 || n === !1)
    return !0;
  if (!Array.isArray(n) || n.length === 0)
    return !1;
  switch (n[0]) {
    case "has":
      return n.length >= 2 && n[1] !== "$id" && n[1] !== "$type";
    case "in":
      return n.length >= 3 && (typeof n[1] != "string" || Array.isArray(n[2]));
    case "!in":
    case "!has":
    case "none":
      return !1;
    case "==":
    case "!=":
    case ">":
    case ">=":
    case "<":
    case "<=":
      return n.length !== 3 || Array.isArray(n[1]) || Array.isArray(n[2]);
    case "any":
    case "all":
      for (const e of n.slice(1))
        if (!gn(e) && typeof e != "boolean")
          return !1;
      return !0;
    default:
      return !0;
  }
}
const _r = {
  StyleExpression: hn,
  StylePropertyFunction: Be,
  ZoomConstantExpression: tt,
  ZoomDependentExpression: nt,
  createExpression: dn,
  createPropertyExpression: yn,
  isExpression: pn,
  isExpressionFilter: gn,
  isZoomExpression: Rr,
  normalizePropertyExpression: qr
};
class Xr {
  constructor(e, t) {
    k(this, "map");
    k(this, "options");
    k(this, "colorSteps");
    k(this, "container");
    k(this, "outContainer");
    k(this, "titleDiv");
    k(this, "unitDiv");
    k(this, "legendItems", []);
    k(this, "propertySpec");
    e ? this.propertySpec = e : this.propertySpec = {
      "fill-color": {
        default: [
          "step",
          ["get", "speed"],
          "#ff3f00",
          // Default color for speed < 0.10
          0.1,
          "#ff7e00",
          0.15,
          "#ffbe00",
          0.2,
          "#fffd00",
          0.25,
          "#c0ff00",
          0.3,
          "#81ff00",
          0.35,
          "#41ff00",
          0.4,
          "#02ff00",
          0.45,
          "#00ff3d",
          0.5,
          "#00ff7c",
          0.55,
          "#00ffbc",
          0.6,
          "#00fffb",
          0.65,
          "#00c2ff",
          0.7,
          "#0083ff",
          0.75,
          "#0043ff",
          0.8,
          "#0004ff",
          0.85,
          "#3b00ff",
          0.9,
          "#7a00ff",
          0.95,
          "#ba00ff",
          0.98,
          "#f900ff",
          1,
          "#f900ff"
        ],
        doc: "The color of each pixel of this layer",
        expression: {
          interpolated: !0,
          parameters: ["zoom", "feature"]
        },
        "property-type": "data-driven"
      },
      "fill-opacity": {
        type: "number",
        default: 0.5,
        minimum: 0,
        maximum: 1,
        transition: !0,
        expression: {
          interpolated: !0,
          parameters: ["zoom"]
        },
        "property-type": "data-constant"
      }
    }, this.options = {
      position: "top-left",
      width: "62px",
      // Default width
      max: 30,
      // Default max
      ...t
      // Override with user-provided options
    }, this.colorSteps = this.getColorSteps();
    const { outContainer: r, innerContainer: i } = this.createContainer();
    this.outContainer = r, this.container = i, this.titleDiv = this.createTitleDiv(this.options.title), this.unitDiv = this.createUnitDiv(this.options.unit), this.container.appendChild(this.titleDiv), this.container.appendChild(this.unitDiv), this.initializeLegendItems(), this.update();
  }
  getWidth() {
    return this.options.width || "62px";
  }
  createContainer() {
    const e = document.createElement("div");
    e.classList.add("maplibregl-ctrl"), e.style.display = "flex", e.style.flexDirection = "column", e.style.alignItems = "center", e.style.backgroundColor = "transparent";
    const t = document.createElement("div");
    return t.classList.add("map-colorbar-group"), t.style.width = this.getWidth(), t.style.height = "calc(min((100% - 29px), 272px))", t.style.backgroundColor = "rgba(0, 36, 71, 0.8)", t.style.display = "flex", t.style.flexDirection = "column", t.style.borderRadius = "10px", e.appendChild(t), { outContainer: e, innerContainer: t };
  }
  createTitleDiv(e) {
    const t = document.createElement("div");
    return t.innerHTML = e, t.style.marginTop = "6px", t.style.marginBottom = "8px", t.style.display = "flex", t.style.justifyContent = "center", t.style.textAlign = "center", t.style.fontSize = "11px", t.style.lineHeight = "14px", t.style.color = "white", t.style.width = this.getWidth(), t;
  }
  createUnitDiv(e) {
    const t = document.createElement("div");
    return t.classList.add("map_colorbar_unit"), t.innerHTML = `(${e})`, t.style.marginTop = "8px", t.style.width = this.getWidth(), t.style.display = "flex", t.style.justifyContent = "center", t.style.color = "white", t.style.fontSize = "12px", t.style.textAlign = "center", t;
  }
  createColorBox(e) {
    const t = document.createElement("div");
    return t.classList.add("map_colorbar_color_box"), t.style.width = "12px", t.style.backgroundColor = e, t;
  }
  createLabel(e) {
    const t = document.createElement("div");
    return t.classList.add("map_colorbar_label"), t.style.marginLeft = "2px", t.style.marginRight = "1px", t.style.color = "white", t.style.fontSize = "10px", t.textContent = "", t;
  }
  initializeLegendItems() {
    this.colorSteps.forEach(({ speed: e, color: t }) => {
      const r = document.createElement("div");
      r.classList.add("map_colorbar_item"), r.style.display = "flex", r.style.alignItems = "center", r.style.marginBottom = "0px", r.style.marginLeft = "10px";
      const i = this.createColorBox(t), s = this.createLabel({ speed: e, color: t });
      r.appendChild(i), r.appendChild(s), this.legendItems.push(r), this.container.insertBefore(r, this.unitDiv);
    });
  }
  calculateHeights() {
    const e = this.container.getBoundingClientRect().height, t = 32, r = 4 * this.colorSteps.length, i = e - this.titleDiv.offsetHeight - t - r, s = Math.max(Math.floor(i / this.colorSteps.length), 12), o = Math.ceil(this.colorSteps.length / (i / 20));
    return { stepHeight: s, showInterval: o };
  }
  update() {
    const { stepHeight: e, showInterval: t } = this.calculateHeights();
    this.legendItems.forEach((r, i) => {
      const s = r.querySelector(".map_colorbar_color_box"), o = r.querySelector(".map_colorbar_label");
      r.style.height = `${e}px`, s.style.height = `${e}px`, i === 0 || i === this.colorSteps.length - 1 || i % t === 0 ? o.textContent = `${this.colorSteps[i].speed.toFixed(2)}` : o.textContent = "";
    });
  }
  onAdd(e) {
    return this.map = e, e.getContainer().appendChild(this.outContainer), this.map.once("styledata", () => {
      this.refresh();
    }), this.outContainer;
  }
  onRemove() {
    var e, t;
    (e = this.container.parentNode) == null || e.removeChild(this.container), (t = this.outContainer.parentNode) == null || t.removeChild(this.container), this.map = void 0;
  }
  refresh() {
  }
  getDefaultPosition() {
    return "top-left";
  }
  /**
   * Parses the "fill-color" property and extracts speed-to-color mappings.
   * @returns An array of speed thresholds and their corresponding colors.
   */
  getColorSteps() {
    var l;
    const e = this.propertySpec["fill-color"];
    if (!e)
      throw new Error("Missing 'fill-color' specification.");
    const t = e.default || e;
    if (t[0] !== "step")
      throw new Error("Only 'step' expressions are supported.");
    const i = [], [, , s, ...o] = t, a = ((l = this.options) == null ? void 0 : l.max) || 30;
    i.push({ speed: 0, color: s });
    for (let u = 0; u < o.length; u += 2) {
      const f = o[u] * a, y = o[u + 1];
      i.push({ speed: f, color: y });
    }
    return i.sort((u, c) => c.speed - u.speed);
  }
  /**
   * Sets a property using a Mapbox style expression.
   * @param prop The property name.
   * @param value The Mapbox style expression.
   */
  setProperty(e, t) {
    const r = this.propertySpec[e];
    if (!r)
      throw new Error(`Property "${e}" is not defined in the specification.`);
    const i = _r.createPropertyExpression(t, r);
    if (i.result === "success")
      switch (i.value.kind) {
        case "camera":
        case "composite":
          console.log(`Camera/composite expression set for property "${e}"`);
          break;
        default:
          console.log(`Property "${e}" set with value`, i.value);
          break;
      }
    else
      throw new Error(`Invalid expression for property "${e}": ${i.value}`);
  }
}
export {
  Xr as ColorBar,
  Wr as TemporalControl
};
//# sourceMappingURL=index.js.map
