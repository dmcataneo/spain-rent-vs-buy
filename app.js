/* Spain Rent vs Buy UI: pick a province, move the knobs, read the break-even. */
(function () {
  'use strict';
  var C = window.RentBuyCore, D = window.SPAIN_DATA;
  var $ = function (id) { return document.getElementById(id); };
  var state = { name: 'Madrid', p: C.params(), sort: 'priceToRent', dir: 1 };

  var KNOBS = [
    { group: 'The home', items: [
      { k: 'sizeFactor', label: 'Size vs the average rented home', min: 50, max: 150, step: 5, fmt: pc, note: '100% is the average size of rented homes in the province.' },
      { k: 'priceYear', type: 'seg', label: 'Price data', opts: [['2024', '2024 average'], ['latest', 'Latest quarter (2026 Q2)']], note: 'The rent data is from 2024. 2024 prices compare like with like.' },
      { k: 'appreciation', label: 'Home price growth per year', min: -2, max: 6, step: 0.5, fmt: pc1, note: '' },
      { k: 'upkeepPct', label: 'Upkeep, community fees, insurance', min: 0, max: 3, step: 0.1, fmt: pc1, note: '% of the home value per year.' },
      { k: 'propTaxPct', label: 'Property tax (IBI)', min: 0, max: 1.2, step: 0.05, fmt: pc2, note: '% of the home value per year.' }
    ] },
    { group: 'The mortgage', items: [
      { k: 'downPct', label: 'Down payment', min: 10, max: 50, step: 1, fmt: pc, note: '% of the price.' },
      { k: 'rate', label: 'Mortgage rate', min: 0.5, max: 8, step: 0.1, fmt: pc1, note: 'Fixed for the whole term.' },
      { k: 'years', label: 'Term (years)', min: 10, max: 40, step: 1, fmt: function (v) { return v + ' years'; }, note: '' },
      { k: 'buyCostsPct', label: 'Buying costs', min: 4, max: 15, step: 0.5, fmt: pc1, note: 'Transfer or VAT tax, stamp duty, notary, registry. Varies by region.' }
    ] },
    { group: 'Rent and money', items: [
      { k: 'rentGrowth', label: 'Rent growth per year', min: 0, max: 8, step: 0.5, fmt: pc1, note: '' },
      { k: 'investReturn', label: 'Return on invested cash', min: 0, max: 8, step: 0.25, fmt: pc2, note: 'After tax. Used for the renter and for whoever pays less each month.' },
      { k: 'sellCostsPct', label: 'Cost of selling', min: 0, max: 8, step: 0.5, fmt: pc1, note: '% of the sale price.' },
      { k: 'horizon', label: 'How long you stay (years)', min: 1, max: 30, step: 1, fmt: function (v) { return v + ' years'; }, note: 'Sets the result shown on the right. The chart always shows 30 years.' }
    ] }
  ];

  function pc(v) { return Math.round(v) + '%'; }
  function pc1(v) { return (Math.round(v * 10) / 10) + '%'; }
  function pc2(v) { return (Math.round(v * 100) / 100) + '%'; }
  function eur(v) { return (v < 0 ? '-' : '') + 'EUR ' + Math.round(Math.abs(v)).toLocaleString('en-US'); }
  function el(tag, attrs, text) { var e = document.createElementNS('http://www.w3.org/2000/svg', tag), k; for (k in attrs) e.setAttribute(k, attrs[k]); if (text != null) e.textContent = text; return e; }
  function prov(name) { return D.provinces.filter(function (x) { return x.name === name; })[0]; }

  function run() {
    var r = C.compare(prov(state.name), state.p);
    drawChart(r); drawKpis(r); drawRank(); writeHash();
    var be = r.breakEven, h = state.p.horizon;
    var v = be === null ? 'With these settings buying does not catch up with renting within 40 years in ' + state.name + '.'
      : 'In ' + state.name + ', buying catches up with renting after about ' + be + (be === 1 ? ' year' : ' years') + '. ';
    if (be !== null) v += be <= h ? 'You plan to stay ' + h + ', so on these assumptions the buyer ends ' + eur(r.buyerAhead) + ' ahead.' : 'You plan to stay ' + h + ', which is before the break-even: the renter ends ' + eur(-r.buyerAhead) + ' ahead.';
    $('verdict').textContent = v;
  }

  function drawChart(r) {
    var svg = $('chart'); svg.textContent = '';
    var W = 720, H = 300, L = 62, R = 10, T = 12, B = 28, pts = r.points.slice(0, 31);
    var all = []; pts.forEach(function (p) { all.push(p.buyerNet, p.renterNet); });
    var max = Math.max.apply(null, all), min = Math.min.apply(null, all.concat([0]));
    var step = Math.pow(10, Math.floor(Math.log10((max - min) / 4 || 1))); var span = (max - min) / 4 / step; step *= span > 5 ? 10 : span > 2 ? 5 : span > 1 ? 2 : 1;
    var top = Math.ceil(max / step) * step, bot = Math.floor(min / step) * step;
    function x(yr) { return L + (W - L - R) * yr / 30; }
    function y(v) { return T + (H - T - B) * (1 - (v - bot) / (top - bot)); }
    for (var v = bot; v <= top + 1e-6; v += step) {
      svg.appendChild(el('line', { x1: L, x2: W - R, y1: y(v), y2: y(v), 'class': 'axis' }));
      svg.appendChild(el('text', { x: L - 6, y: y(v) + 4, 'text-anchor': 'end' }, (v / 1000).toLocaleString('en-US') + 'k'));
    }
    [0, 5, 10, 15, 20, 25, 30].forEach(function (yr) { svg.appendChild(el('text', { x: x(yr), y: H - 8, 'text-anchor': 'middle' }, yr === 0 ? 'now' : yr + 'y')); });
    var h = state.p.horizon;
    svg.appendChild(el('line', { x1: x(h), x2: x(h), y1: T, y2: H - B, stroke: '#a9a7a0', 'stroke-dasharray': '4 4' }));
    svg.appendChild(el('text', { x: x(h) + 4, y: T + 10 }, 'you leave'));
    function path(key, color) { svg.appendChild(el('path', { d: pts.map(function (p, i) { return (i ? 'L' : 'M') + x(p.year) + ' ' + y(p[key]); }).join(' '), fill: 'none', stroke: color, 'stroke-width': 2.6, 'stroke-linejoin': 'round' })); }
    path('renterNet', '#e8590c'); path('buyerNet', '#0f766e');
    if (r.breakEven !== null && r.breakEven <= 30) {
      var p = r.points[r.breakEven];
      svg.appendChild(el('circle', { cx: x(p.year), cy: y(p.buyerNet), r: 5, fill: '#fff', stroke: '#1c2127', 'stroke-width': 2 }));
      svg.appendChild(el('text', { x: x(p.year), y: y(p.buyerNet) - 10, 'text-anchor': 'middle', style: 'fill:#1c2127;font-weight:700' }, 'break-even, year ' + p.year));
    }
  }

  function drawKpis(r) {
    var h = r.home;
    $('kpis').innerHTML =
      kpi('Home price', eur(h.price), Math.round(h.m2) + ' m2 at ' + eur(h.pricePerM2) + '/m2') +
      kpi('Rent per month', eur(h.rentMonth), 'average actual rent, 2024') +
      kpi('Mortgage per month', eur(r.payment), 'plus ' + eur((r.firstYearOwnerCost - r.payment * 12) / 12) + '/month upkeep and IBI') +
      kpi('Cash up front', eur(r.upfront), 'down payment and buying costs') +
      kpi('Price-to-rent', h.priceToRent.toFixed(1), 'years of rent to equal the price') +
      kpi('Rent yield on price', h.grossYield.toFixed(1) + '%', 'a year of rent over the price');
  }
  function kpi(a, b, c) { return '<div class="kpi"><small>' + a + '</small><b>' + b + '</b><span>' + c + '</span></div>'; }

  function drawRank() {
    var all = C.compareAll(D.provinces, state.p).map(function (r) { return { n: r.prov.name, ptr: r.home.priceToRent, be: r.breakEven === null ? 99 : r.breakEven, ahead: r.buyerAhead, rent: r.home.rentMonth, price: r.home.price, y: r.home.grossYield }; });
    var key = { priceToRent: 'ptr', breakEven: 'be', ahead: 'ahead', rent: 'rent', price: 'price', name: 'n' }[state.sort];
    all.sort(function (a, b) { return (typeof a[key] === 'string' ? a[key].localeCompare(b[key]) : a[key] - b[key]) * state.dir; });
    var cols = [['name', 'Province'], ['price', 'Home price'], ['rent', 'Rent / month'], ['priceToRent', 'Price-to-rent'], ['breakEven', 'Break-even'], ['ahead', 'Buyer ahead at ' + state.p.horizon + ' years']];
    var head = '<thead><tr>' + cols.map(function (c) { return '<th data-s="' + c[0] + '">' + c[1] + (state.sort === c[0] ? (state.dir > 0 ? ' ▲' : ' ▼') : '') + '</th>'; }).join('') + '</tr></thead>';
    var body = '<tbody>' + all.map(function (a) {
      return '<tr data-n="' + a.n + '"' + (a.n === state.name ? ' class="me"' : '') + '><td>' + a.n + '</td><td>' + eur(a.price) + '</td><td>' + eur(a.rent) + '</td><td>' + a.ptr.toFixed(1) + '</td><td>' + (a.be === 99 ? 'never' : a.be + ' y') + '</td><td>' + eur(a.ahead) + '</td></tr>';
    }).join('') + '</tbody>';
    $('rank').innerHTML = head + body;
  }
  $('rank').addEventListener('click', function (e) {
    var th = e.target.closest('th'), tr = e.target.closest('tr[data-n]');
    if (th) { var s = th.dataset.s; if (state.sort === s) state.dir *= -1; else { state.sort = s; state.dir = s === 'ahead' ? -1 : 1; } drawRank(); }
    else if (tr) { state.name = tr.dataset.n; $('prov').value = state.name; run(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  });

  function buildKnobs() {
    var box = $('params');
    KNOBS.forEach(function (g) {
      var col = document.createElement('div'); col.innerHTML = '<h2>' + g.group + '</h2>';
      g.items.forEach(function (it) {
        var d = document.createElement('div'); d.className = 'param';
        if (it.type === 'seg') {
          d.innerHTML = '<label>' + it.label + '</label><div class="seg" id="k_' + it.k + '">' + it.opts.map(function (o) { return '<button class="chip" data-v="' + o[0] + '">' + o[1] + '</button>'; }).join('') + '</div><small>' + it.note + '</small>';
          d.querySelector('.seg').addEventListener('click', function (e) { var b = e.target.closest('button'); if (!b) return; state.p[it.k] = b.dataset.v; syncKnobs(); run(); });
        } else {
          d.innerHTML = '<label for="k_' + it.k + '">' + it.label + '<output id="o_' + it.k + '"></output></label><input type="range" id="k_' + it.k + '" min="' + it.min + '" max="' + it.max + '" step="' + it.step + '">' + (it.note ? '<small>' + it.note + '</small>' : '');
          d.querySelector('input').addEventListener('input', function (e) { state.p[it.k] = parseFloat(e.target.value); $('o_' + it.k).textContent = it.fmt(state.p[it.k]); run(); });
        }
        col.appendChild(d);
      });
      box.appendChild(col);
    });
  }
  function syncKnobs() {
    KNOBS.forEach(function (g) { g.items.forEach(function (it) {
      if (it.type === 'seg') { Array.prototype.forEach.call($('k_' + it.k).children, function (b) { var on = b.dataset.v === state.p[it.k]; b.style.fontWeight = on ? '800' : ''; b.style.borderColor = on ? 'var(--accent)' : ''; }); }
      else { $('k_' + it.k).value = state.p[it.k]; $('o_' + it.k).textContent = it.fmt(state.p[it.k]); }
    }); });
  }

  function writeHash() {
    var o = {}, k; for (k in state.p) if (state.p[k] !== C.DEFAULTS[k]) o[k] = state.p[k];
    var s = (Object.keys(o).length || state.name !== 'Madrid') ? '#' + encodeURIComponent(JSON.stringify({ n: state.name, p: o })) : '';
    if (history.replaceState) history.replaceState(null, '', location.pathname + location.search + s);
  }
  function readHash() {
    if (location.hash.length < 3) return;
    try { var o = JSON.parse(decodeURIComponent(location.hash.slice(1))), k;
      if (o.n && prov(o.n)) state.name = o.n;
      for (k in (o.p || {})) if (k in C.DEFAULTS) state.p[k] = k === 'priceYear' ? String(o.p[k]) : +o.p[k];
    } catch (e) { /* ignore a broken link */ }
  }

  $('share').onclick = function () { var b = $('share'), done = function () { b.textContent = 'Link copied'; b.classList.add('ok'); setTimeout(function () { b.textContent = 'Copy link'; b.classList.remove('ok'); }, 1500); }; if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(location.href).then(done, done); else done(); };
  $('reset').onclick = function () { state.p = C.params(); state.name = 'Madrid'; $('prov').value = state.name; syncKnobs(); run(); };

  D.provinces.slice().sort(function (a, b) { return a.name.localeCompare(b.name, 'es'); }).forEach(function (p) { var o = document.createElement('option'); o.value = o.textContent = p.name; $('prov').appendChild(o); });
  $('prov').onchange = function () { state.name = $('prov').value; run(); };
  $('rentUrl').href = D.meta.rentUrl; $('priceUrl').href = D.meta.priceInfoUrl;
  $('missing').textContent = 'Not covered by the rent source: ' + D.meta.missing.join(', ') + '. Rent source: ' + D.meta.rentSource + '. Price source: ' + D.meta.priceSource + '. Retrieved ' + D.meta.retrieved + '.';
  buildKnobs(); readHash(); $('prov').value = state.name; syncKnobs(); run();
})();
