/* Rent vs Buy core: month-by-month net worth of a buyer and a renter who start with the same cash.
   Works in the browser (window.RentBuyCore) and in Node (module.exports), so the app and the tests share this file. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.RentBuyCore = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var DEFAULTS = {
    downPct: 20,        // % of the price paid up front
    buyCostsPct: 10,    // taxes, notary, registry and agency, % of the price (varies by region)
    rate: 3.0,          // mortgage interest, % per year
    years: 30,          // mortgage term
    appreciation: 2.0,  // home price growth, % per year
    rentGrowth: 3.0,    // rent growth, % per year
    upkeepPct: 1.2,     // maintenance, community fees and insurance, % of the home value per year
    propTaxPct: 0.4,    // property tax (IBI), % of the home value per year
    investReturn: 3.5,  // return on cash the renter (or the buyer, when owning is cheaper) invests, % per year
    sellCostsPct: 3,    // cost of selling, % of the sale price
    horizon: 10,        // years you stay
    sizeFactor: 100,    // size of the home as % of the average rented home in the province
    priceYear: '2024'   // '2024' matches the rent data year, 'latest' uses the newest appraisal quarter
  };

  function params(over) {
    var p = {}, k;
    for (k in DEFAULTS) p[k] = DEFAULTS[k];
    for (k in (over || {})) p[k] = over[k];
    return p;
  }

  function payment(loan, annualRatePct, years) {
    var n = years * 12, r = annualRatePct / 100 / 12;
    if (loan <= 0) return 0;
    if (r === 0) return loan / n;
    return loan * r / (1 - Math.pow(1 + r, -n));
  }

  /* Home facts for one province under the current settings. */
  function home(prov, p) {
    var m2 = prov.m2 * p.sizeFactor / 100;
    var pm2 = p.priceYear === 'latest' ? prov.price_m2_latest : prov.price_m2_2024;
    var price = pm2 * m2;
    var rentYear = prov.rent_month * p.sizeFactor / 100 * 12;   // average actual rent of the average rented home, scaled with size
    return { m2: m2, pricePerM2: pm2, price: price, rentMonth: rentYear / 12, rentYear: rentYear, priceToRent: rentYear > 0 ? price / rentYear : Infinity, grossYield: price > 0 ? 100 * rentYear / price : 0 };
  }

  /* Run the comparison. Returns yearly points of net worth for both sides and the break-even year. */
  function compare(prov, over) {
    var p = params(over), h = home(prov, p);
    var price = h.price, down = price * p.downPct / 100, costs = price * p.buyCostsPct / 100;
    var loan = price - down, pay = payment(loan, p.rate, p.years);
    var rm = Math.pow(1 + p.investReturn / 100, 1 / 12) - 1;
    var ra = Math.pow(1 + p.appreciation / 100, 1 / 12) - 1;
    var rg = Math.pow(1 + p.rentGrowth / 100, 1 / 12) - 1;
    var mr = p.rate / 100 / 12;
    var maxMonths = 40 * 12;
    var balance = loan, value = price, rent = h.rentMonth;
    var renterPot = down + costs, buyerPot = 0;     // both start with the same cash; the buyer spends it on the home
    var points = [], breakEven = null, paid = 0, i;
    points.push({ year: 0, value: price, balance: loan, rent: rent });
    points[0].buyerNet = value * (1 - p.sellCostsPct / 100) - balance + buyerPot;
    points[0].renterNet = renterPot;
    for (i = 1; i <= maxMonths; i++) {
      var interest = balance * mr, owed = i <= p.years * 12 ? pay : 0;
      var principal = owed > 0 ? Math.min(balance, owed - interest) : 0;
      if (owed === 0) interest = 0;
      balance = Math.max(0, balance - principal);
      var buyerOut = owed + (value * (p.upkeepPct + p.propTaxPct) / 100) / 12;
      var renterOut = rent;
      // whoever pays less invests the difference
      if (buyerOut > renterOut) renterPot += buyerOut - renterOut; else buyerPot += renterOut - buyerOut;
      renterPot *= 1 + rm; buyerPot *= 1 + rm;
      value *= 1 + ra; rent *= 1 + rg;
      if (i % 12 === 0) {
        var y = i / 12;
        var bn = value * (1 - p.sellCostsPct / 100) - balance + buyerPot;
        points.push({ year: y, buyerNet: bn, renterNet: renterPot, value: value, balance: balance, rent: rent });
        if (breakEven === null && bn >= renterPot) breakEven = y;
      }
    }
    var at = points[Math.min(p.horizon, 40)];
    return {
      prov: prov, params: p, home: h, down: down, costs: costs, loan: loan, payment: pay, upfront: down + costs,
      firstYearOwnerCost: pay * 12 + price * (p.upkeepPct + p.propTaxPct) / 100,
      points: points, breakEven: breakEven, atHorizon: at, buyerAhead: at.buyerNet - at.renterNet
    };
  }

  function compareAll(provinces, over) { return provinces.map(function (pr) { return compare(pr, over); }); }

  return { DEFAULTS: DEFAULTS, params: params, payment: payment, home: home, compare: compare, compareAll: compareAll };
});
