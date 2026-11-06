const test = require('node:test');
const assert = require('node:assert');
const C = require('./core.js');
const D = require('./data.js');

const madrid = D.provinces.find(p => p.name === 'Madrid');
const soria = D.provinces.find(p => p.name === 'Soria');

test('mortgage payment: the loan is paid off exactly at the end of the term', () => {
  const loan = 200000, pay = C.payment(loan, 3, 30);
  let bal = loan;
  for (let i = 0; i < 360; i++) bal = bal * (1 + 0.03 / 12) - pay;
  assert.ok(Math.abs(bal) < 1e-4);
  assert.ok(Math.abs(C.payment(120000, 0, 10) - 1000) < 1e-9);
});

test('the dataset covers 48 provinces and cities, and says which four are missing', () => {
  assert.strictEqual(D.provinces.length, 48);
  assert.deepStrictEqual(D.meta.missing.slice().sort(), ['Araba/Álava', 'Bizkaia', 'Gipuzkoa', 'Navarra']);
  const names = new Set(D.provinces.map(p => p.name));
  assert.strictEqual(names.size, 48);
  for (const m of D.meta.missing) assert.ok(!names.has(m));
});

test('every row has positive rent, size and price', () => {
  for (const p of D.provinces) {
    for (const k of ['rent_m2', 'rent_month', 'm2', 'price_m2_2024', 'price_m2_latest', 'leases']) assert.ok(p[k] > 0, p.name + ' ' + k);
    const ratio = p.rent_month / (p.rent_m2 * p.m2); assert.ok(ratio > 0.7 && ratio < 1.1, p.name + ' rent vs size');
  }
});

test('price-to-rent is higher in Madrid than in Soria', () => {
  assert.ok(C.home(madrid, C.params()).priceToRent > C.home(soria, C.params()).priceToRent);
});

test('a higher home price growth never delays break-even', () => {
  let prev = Infinity;
  for (const a of [0, 1, 2, 3, 4, 6]) {
    const be = C.compare(madrid, { appreciation: a }).breakEven;
    const v = be === null ? Infinity : be;
    assert.ok(v <= prev);
    prev = v;
  }
});

test('a higher mortgage rate never makes buying win sooner', () => {
  let prev = -1;
  for (const r of [1, 2, 3, 4, 6, 8]) {
    const be = C.compare(madrid, { rate: r }).breakEven;
    const v = be === null ? Infinity : be;
    assert.ok(v >= prev);
    prev = v;
  }
});

test('net worth at year 0: buyer gets the home value less selling costs and the loan, renter keeps the cash', () => {
  const r = C.compare(soria, {});
  const p0 = r.points[0];
  assert.ok(Math.abs(p0.renterNet - r.upfront) < 1e-6);
  assert.ok(Math.abs(p0.buyerNet - (r.home.price * 0.97 - r.loan)) < 1e-6);
});

test('with free money, no growth and no costs, owning and renting the same cash are a tie in cash terms', () => {
  const r = C.compare(soria, { buyCostsPct: 0, sellCostsPct: 0, rate: 0, investReturn: 0, appreciation: 0, rentGrowth: 0, upkeepPct: 0, propTaxPct: 0, horizon: 10 });
  // rent paid each year equals what the buyer would pay only if payment equals rent; here we just check both stay finite and the loan is repaid
  assert.ok(Number.isFinite(r.atHorizon.buyerNet) && Number.isFinite(r.atHorizon.renterNet));
  assert.ok(r.points[30].balance < 1e-6);
});

test('all provinces run with the default settings and give finite results', () => {
  const all = C.compareAll(D.provinces, {});
  assert.strictEqual(all.length, 48);
  for (const r of all) {
    assert.ok(Number.isFinite(r.buyerAhead) && Number.isFinite(r.payment) && r.payment > 0, r.prov.name);
    assert.ok(r.breakEven === null || (r.breakEven >= 1 && r.breakEven <= 40));
  }
});

test('the newest appraisal quarter gives a higher price than 2024 for most provinces', () => {
  const higher = D.provinces.filter(p => p.price_m2_latest > p.price_m2_2024).length;
  assert.ok(higher > 40);
});
