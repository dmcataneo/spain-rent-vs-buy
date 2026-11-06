/* Public data, one row per province. Built from the sources in SPAIN_DATA.meta, retrieved 2026-11-06.
   rent_m2: average monthly rent per m2 (EUR). rent_month: average monthly rent (EUR). m2: average size of rented homes.
   leases: rented main homes in the statistic. price_m2_2024: average appraised value per m2 in 2024 (mean of the four quarters).
   price_m2_latest: same, 2026 Q2. */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.SPAIN_DATA = factory();
})(typeof self !== "undefined" ? self : this, function () {
  return {
 "meta": {
  "retrieved": "2026-11-06",
  "rentSource": "Agencia Tributaria (AEAT), Estadística de viviendas declaradas en IRPF, tax year 2024, table \"Rentabilidad y precios de alquiler como vivienda habitual por Comunidad autónoma y provincia\", main-home rentals",
  "rentUrl": "https://sede.agenciatributaria.gob.es/AEAT/Contenidos_Comunes/La_Agencia_Tributaria/Estadisticas/Publicaciones/sites/irpfvivienda/2024/jrubikf7c94f9e535209891c203f079b6cfb8c8974d8231.html",
  "priceSource": "Ministerio de Vivienda y Agenda Urbana (MIVAU), Estadística de Valor Tasado de Vivienda, average appraised value per m2, all ages, by province and quarter (read through the ISTAC open data copy, dataset E20007A_000002)",
  "priceUrl": "https://datos.canarias.es/api/estadisticas/statistical-resources/v1.0/datasets/ISTAC/E20007A_000002/1.27.csv",
  "priceInfoUrl": "https://www.mivau.gob.es/el-ministerio/observatorios-y-estadisticas/estadisticas/valor-tasado-vivienda",
  "missing": [
   "Araba/Álava",
   "Bizkaia",
   "Gipuzkoa",
   "Navarra"
  ],
  "latestQuarter": "2026 Q2",
  "rentYear": 2024
 },
 "provinces": [
  {
   "name": "Almería",
   "code": "ES611",
   "rent_m2": 6.1,
   "rent_month": 487.0,
   "m2": 88.0,
   "leases": 24371.0,
   "yield_ref": 6.1,
   "price_m2_2024": 1243.6,
   "price_m2_latest": 1492.6
  },
  {
   "name": "Cádiz",
   "code": "ES612",
   "rent_m2": 7.7,
   "rent_month": 649.0,
   "m2": 92.0,
   "leases": 35270.0,
   "yield_ref": 5.7,
   "price_m2_2024": 1639.1,
   "price_m2_latest": 2043.0
  },
  {
   "name": "Córdoba",
   "code": "ES613",
   "rent_m2": 6.3,
   "rent_month": 515.0,
   "m2": 90.0,
   "leases": 19644.0,
   "yield_ref": 5.7,
   "price_m2_2024": 1135.0,
   "price_m2_latest": 1307.1
  },
  {
   "name": "Granada",
   "code": "ES614",
   "rent_m2": 6.4,
   "rent_month": 541.0,
   "m2": 93.0,
   "leases": 40182.0,
   "yield_ref": 5.7,
   "price_m2_2024": 1335.0,
   "price_m2_latest": 1673.3
  },
  {
   "name": "Huelva",
   "code": "ES615",
   "rent_m2": 6.1,
   "rent_month": 496.0,
   "m2": 90.0,
   "leases": 10844.0,
   "yield_ref": 6.2,
   "price_m2_2024": 1274.5,
   "price_m2_latest": 1567.2
  },
  {
   "name": "Jaén",
   "code": "ES616",
   "rent_m2": 4.8,
   "rent_month": 427.0,
   "m2": 100.0,
   "leases": 13528.0,
   "yield_ref": 6.1,
   "price_m2_2024": 806.9,
   "price_m2_latest": 912.7
  },
  {
   "name": "Málaga",
   "code": "ES617",
   "rent_m2": 9.6,
   "rent_month": 773.0,
   "m2": 87.0,
   "leases": 73509.0,
   "yield_ref": 5.4,
   "price_m2_2024": 2422.6,
   "price_m2_latest": 3083.5
  },
  {
   "name": "Sevilla",
   "code": "ES618",
   "rent_m2": 8.2,
   "rent_month": 659.0,
   "m2": 88.0,
   "leases": 62099.0,
   "yield_ref": 5.8,
   "price_m2_2024": 1562.0,
   "price_m2_latest": 1889.8
  },
  {
   "name": "Huesca",
   "code": "ES241",
   "rent_m2": 6.0,
   "rent_month": 475.0,
   "m2": 88.0,
   "leases": 14283.0,
   "yield_ref": 6.3,
   "price_m2_2024": 1233.2,
   "price_m2_latest": 1492.9
  },
  {
   "name": "Teruel",
   "code": "ES242",
   "rent_m2": 5.0,
   "rent_month": 420.0,
   "m2": 96.0,
   "leases": 6489.0,
   "yield_ref": 6.3,
   "price_m2_2024": 864.5,
   "price_m2_latest": 1052.3
  },
  {
   "name": "Zaragoza",
   "code": "ES243",
   "rent_m2": 7.5,
   "rent_month": 550.0,
   "m2": 79.0,
   "leases": 67991.0,
   "yield_ref": 6.2,
   "price_m2_2024": 1529.8,
   "price_m2_latest": 1944.3
  },
  {
   "name": "Asturias",
   "code": "ES12",
   "rent_m2": 7.0,
   "rent_month": 501.0,
   "m2": 78.0,
   "leases": 60884.0,
   "yield_ref": 6.4,
   "price_m2_2024": 1418.0,
   "price_m2_latest": 1798.5
  },
  {
   "name": "Illes Balears",
   "code": "ES53",
   "rent_m2": 10.0,
   "rent_month": 869.0,
   "m2": 99.0,
   "leases": 87872.0,
   "yield_ref": 4.8,
   "price_m2_2024": 3167.0,
   "price_m2_latest": 3980.8
  },
  {
   "name": "Las Palmas",
   "code": "ES701",
   "rent_m2": 8.3,
   "rent_month": 618.0,
   "m2": 85.0,
   "leases": 61792.0,
   "yield_ref": 6.0,
   "price_m2_2024": 1858.0,
   "price_m2_latest": 2263.0
  },
  {
   "name": "Santa Cruz de Tenerife",
   "code": "ES702",
   "rent_m2": 8.4,
   "rent_month": 614.0,
   "m2": 83.0,
   "leases": 55072.0,
   "yield_ref": 6.0,
   "price_m2_2024": 1806.4,
   "price_m2_latest": 2296.6
  },
  {
   "name": "Cantabria",
   "code": "ES13",
   "rent_m2": 7.6,
   "rent_month": 573.0,
   "m2": 81.0,
   "leases": 29456.0,
   "yield_ref": 5.4,
   "price_m2_2024": 1654.7,
   "price_m2_latest": 2122.0
  },
  {
   "name": "Ávila",
   "code": "ES411",
   "rent_m2": 5.4,
   "rent_month": 440.0,
   "m2": 89.0,
   "leases": 8056.0,
   "yield_ref": 6.7,
   "price_m2_2024": 939.4,
   "price_m2_latest": 1167.0
  },
  {
   "name": "Burgos",
   "code": "ES412",
   "rent_m2": 6.8,
   "rent_month": 519.0,
   "m2": 82.0,
   "leases": 17165.0,
   "yield_ref": 5.8,
   "price_m2_2024": 1197.9,
   "price_m2_latest": 1500.1
  },
  {
   "name": "León",
   "code": "ES413",
   "rent_m2": 5.4,
   "rent_month": 450.0,
   "m2": 93.0,
   "leases": 22954.0,
   "yield_ref": 6.4,
   "price_m2_2024": 902.3,
   "price_m2_latest": 1086.7
  },
  {
   "name": "Palencia",
   "code": "ES414",
   "rent_m2": 5.6,
   "rent_month": 441.0,
   "m2": 87.0,
   "leases": 7211.0,
   "yield_ref": 6.3,
   "price_m2_2024": 945.8,
   "price_m2_latest": 1127.6
  },
  {
   "name": "Salamanca",
   "code": "ES415",
   "rent_m2": 6.1,
   "rent_month": 512.0,
   "m2": 89.0,
   "leases": 19474.0,
   "yield_ref": 6.0,
   "price_m2_2024": 1217.5,
   "price_m2_latest": 1503.5
  },
  {
   "name": "Segovia",
   "code": "ES416",
   "rent_m2": 6.3,
   "rent_month": 527.0,
   "m2": 92.0,
   "leases": 8993.0,
   "yield_ref": 6.5,
   "price_m2_2024": 1164.7,
   "price_m2_latest": 1530.1
  },
  {
   "name": "Soria",
   "code": "ES417",
   "rent_m2": 6.2,
   "rent_month": 507.0,
   "m2": 90.0,
   "leases": 4486.0,
   "yield_ref": 7.1,
   "price_m2_2024": 962.0,
   "price_m2_latest": 1192.6
  },
  {
   "name": "Valladolid",
   "code": "ES418",
   "rent_m2": 6.7,
   "rent_month": 536.0,
   "m2": 85.0,
   "leases": 30228.0,
   "yield_ref": 5.8,
   "price_m2_2024": 1337.0,
   "price_m2_latest": 1658.4
  },
  {
   "name": "Zamora",
   "code": "ES419",
   "rent_m2": 4.8,
   "rent_month": 407.0,
   "m2": 93.0,
   "leases": 6031.0,
   "yield_ref": 6.1,
   "price_m2_2024": 826.4,
   "price_m2_latest": 1005.7
  },
  {
   "name": "Albacete",
   "code": "ES421",
   "rent_m2": 5.4,
   "rent_month": 491.0,
   "m2": 100.0,
   "leases": 15046.0,
   "yield_ref": 6.2,
   "price_m2_2024": 1011.1,
   "price_m2_latest": 1236.2
  },
  {
   "name": "Ciudad Real",
   "code": "ES422",
   "rent_m2": 5.0,
   "rent_month": 409.0,
   "m2": 93.0,
   "leases": 15172.0,
   "yield_ref": 7.0,
   "price_m2_2024": 721.7,
   "price_m2_latest": 854.2
  },
  {
   "name": "Cuenca",
   "code": "ES423",
   "rent_m2": 5.0,
   "rent_month": 462.0,
   "m2": 103.0,
   "leases": 6346.0,
   "yield_ref": 6.5,
   "price_m2_2024": 788.8,
   "price_m2_latest": 950.3
  },
  {
   "name": "Guadalajara",
   "code": "ES424",
   "rent_m2": 7.0,
   "rent_month": 584.0,
   "m2": 91.0,
   "leases": 15843.0,
   "yield_ref": 6.2,
   "price_m2_2024": 1359.0,
   "price_m2_latest": 1755.3
  },
  {
   "name": "Toledo",
   "code": "ES425",
   "rent_m2": 5.9,
   "rent_month": 508.0,
   "m2": 97.0,
   "leases": 31672.0,
   "yield_ref": 6.7,
   "price_m2_2024": 974.4,
   "price_m2_latest": 1261.3
  },
  {
   "name": "Barcelona",
   "code": "ES511",
   "rent_m2": 11.3,
   "rent_month": 842.0,
   "m2": 83.0,
   "leases": 398407.0,
   "yield_ref": 5.1,
   "price_m2_2024": 2692.8,
   "price_m2_latest": 3204.2
  },
  {
   "name": "Girona",
   "code": "ES512",
   "rent_m2": 7.4,
   "rent_month": 612.0,
   "m2": 99.0,
   "leases": 58315.0,
   "yield_ref": 5.3,
   "price_m2_2024": 1837.3,
   "price_m2_latest": 2162.8
  },
  {
   "name": "Lleida",
   "code": "ES513",
   "rent_m2": 5.8,
   "rent_month": 481.0,
   "m2": 95.0,
   "leases": 28405.0,
   "yield_ref": 7.5,
   "price_m2_2024": 1124.4,
   "price_m2_latest": 1276.5
  },
  {
   "name": "Tarragona",
   "code": "ES514",
   "rent_m2": 7.1,
   "rent_month": 551.0,
   "m2": 86.0,
   "leases": 53534.0,
   "yield_ref": 6.9,
   "price_m2_2024": 1490.2,
   "price_m2_latest": 1817.9
  },
  {
   "name": "Alicante",
   "code": "ES521",
   "rent_m2": 6.9,
   "rent_month": 577.0,
   "m2": 92.0,
   "leases": 90003.0,
   "yield_ref": 6.3,
   "price_m2_2024": 1596.3,
   "price_m2_latest": 2020.7
  },
  {
   "name": "Castellón",
   "code": "ES522",
   "rent_m2": 5.5,
   "rent_month": 464.0,
   "m2": 93.0,
   "leases": 34873.0,
   "yield_ref": 6.7,
   "price_m2_2024": 1168.8,
   "price_m2_latest": 1464.5
  },
  {
   "name": "Valencia",
   "code": "ES523",
   "rent_m2": 7.4,
   "rent_month": 642.0,
   "m2": 93.0,
   "leases": 149119.0,
   "yield_ref": 6.4,
   "price_m2_2024": 1504.3,
   "price_m2_latest": 1980.1
  },
  {
   "name": "Badajoz",
   "code": "ES431",
   "rent_m2": 5.0,
   "rent_month": 437.0,
   "m2": 96.0,
   "leases": 18993.0,
   "yield_ref": 6.0,
   "price_m2_2024": 924.8,
   "price_m2_latest": 1029.0
  },
  {
   "name": "Cáceres",
   "code": "ES432",
   "rent_m2": 4.8,
   "rent_month": 430.0,
   "m2": 99.0,
   "leases": 13254.0,
   "yield_ref": 6.1,
   "price_m2_2024": 862.1,
   "price_m2_latest": 950.5
  },
  {
   "name": "A Coruña",
   "code": "ES111",
   "rent_m2": 6.3,
   "rent_month": 495.0,
   "m2": 88.0,
   "leases": 73604.0,
   "yield_ref": 5.6,
   "price_m2_2024": 1419.9,
   "price_m2_latest": 1749.5
  },
  {
   "name": "Lugo",
   "code": "ES112",
   "rent_m2": 4.5,
   "rent_month": 392.0,
   "m2": 101.0,
   "leases": 14981.0,
   "yield_ref": 5.9,
   "price_m2_2024": 977.5,
   "price_m2_latest": 1173.4
  },
  {
   "name": "Ourense",
   "code": "ES113",
   "rent_m2": 4.9,
   "rent_month": 409.0,
   "m2": 92.0,
   "leases": 15388.0,
   "yield_ref": 5.3,
   "price_m2_2024": 955.2,
   "price_m2_latest": 1070.3
  },
  {
   "name": "Pontevedra",
   "code": "ES114",
   "rent_m2": 6.7,
   "rent_month": 521.0,
   "m2": 90.0,
   "leases": 49209.0,
   "yield_ref": 5.3,
   "price_m2_2024": 1486.6,
   "price_m2_latest": 1825.8
  },
  {
   "name": "Madrid",
   "code": "ES30",
   "rent_m2": 13.1,
   "rent_month": 931.0,
   "m2": 76.0,
   "leases": 503389.0,
   "yield_ref": 5.0,
   "price_m2_2024": 3239.9,
   "price_m2_latest": 4089.6
  },
  {
   "name": "Murcia",
   "code": "ES62",
   "rent_m2": 5.6,
   "rent_month": 490.0,
   "m2": 95.0,
   "leases": 58900.0,
   "yield_ref": 6.3,
   "price_m2_2024": 1106.9,
   "price_m2_latest": 1350.1
  },
  {
   "name": "La Rioja",
   "code": "ES23",
   "rent_m2": 6.1,
   "rent_month": 498.0,
   "m2": 87.0,
   "leases": 16973.0,
   "yield_ref": 6.0,
   "price_m2_2024": 1232.1,
   "price_m2_latest": 1476.8
  },
  {
   "name": "Ceuta",
   "code": "ES630",
   "rent_m2": 9.8,
   "rent_month": 706.0,
   "m2": 79.0,
   "leases": 2674.0,
   "yield_ref": 5.7,
   "price_m2_2024": 1945.0,
   "price_m2_latest": 2214.9
  },
  {
   "name": "Melilla",
   "code": "ES640",
   "rent_m2": 9.1,
   "rent_month": 656.0,
   "m2": 81.0,
   "leases": 3257.0,
   "yield_ref": 5.8,
   "price_m2_2024": 1903.3,
   "price_m2_latest": 2164.5
  }
 ]
};
});
