# Spain: Rent vs Buy by Province

Hey! After building the [mortgage simulator](https://dmcataneo.github.io/spain-mortgage-simulator/) I wanted to answer the question people ask first: is it even worth buying where I live? The honest answer changes a lot from one province to the next, so this uses official data for each one.

You and a twin start with the same cash. The buyer puts it into a home with a mortgage. The renter rents the same kind of home and invests that cash. Every month, whoever pays less than the other invests the difference. The chart shows what each of you would have if you sold or stopped renting after each year, and the break-even is the first year the buyer is ahead.

It's a small experiment, not financial advice. The assumptions (growth, returns, costs) are yours to change, and the answer moves a lot when you do.

It runs in the browser. There is nothing to install: open `index.html`, or serve the folder with any static file server.

[Open the live app](https://dmcataneo.github.io/spain-rent-vs-buy/). No login needed.

## Run locally

```bash
# Option 1: open index.html in a browser
# Option 2: serve the folder
python3 -m http.server 8000     # then visit http://localhost:8000
```

## What you can do

- Pick any of 48 provinces and cities and see the home price, the rent, the mortgage payment, the cash up front, the price-to-rent ratio and the break-even year.
- Change the down payment, rate, term, price growth, rent growth, return on invested cash, buying and selling costs, upkeep, property tax, size of the home and how long you stay.
- Switch between 2024 prices (the same year as the rent data) and the newest appraisal quarter.
- Compare all provinces at once under the same settings. Sort by price-to-rent, break-even or how far ahead the buyer is, and click a row to open it. Copy a link to the exact setup: the settings are stored in the URL.

## Data

Both datasets are official and public. `data.js` holds one row per province. Retrieved on 2026-11-06.

| What | Source | Year |
| --- | --- | --- |
| Average monthly rent, average size of rented homes, number of leases | Agencia Tributaria, *Estadística de viviendas declaradas en IRPF*, table "Rentabilidad y precios de alquiler como vivienda habitual por Comunidad autónoma y provincia", main-home rentals. [Table](https://sede.agenciatributaria.gob.es/AEAT/Contenidos_Comunes/La_Agencia_Tributaria/Estadisticas/Publicaciones/sites/irpfvivienda/2024/jrubikf7c94f9e535209891c203f079b6cfb8c8974d8231.html) | Tax year 2024 |
| Average appraised value per m2, all ages | Ministerio de Vivienda y Agenda Urbana, *Estadística de Valor Tasado de Vivienda*, read through the ISTAC open data copy (dataset `E20007A_000002`). [Ministry page](https://www.mivau.gob.es/el-ministerio/observatorios-y-estadisticas/estadisticas/valor-tasado-vivienda), [CSV](https://datos.canarias.es/api/estadisticas/statistical-resources/v1.0/datasets/ISTAC/E20007A_000002/1.27.csv) | 2024 (mean of the four quarters) and 2026 Q2 |

For provinces that are also a whole region (Asturias, Illes Balears, Cantabria, Madrid, Murcia, La Rioja), the province value is the region value. Ceuta and Melilla are included.

## Limits

- **Four provinces are missing.** The tax statistic does not cover Araba/Álava, Bizkaia, Gipuzkoa or Navarra, so they are not in the app. No national or regional average is used in their place.
- **Rent is declared leases.** It includes older contracts and usually sits below what a new listing asks, so renting looks cheaper here than it may be for someone signing today.
- **Prices are appraisals,** not sale prices.
- **One average per province.** A province is not a town or a neighbourhood.
- **Rent is 2024, prices can be 2026.** That is why 2024 prices are the default.
- Buying costs and taxes vary by region, so they are a single input. No subsidies, no tax relief, no rent control, no vacancy, no variable mortgage rates.

## How it works

Monthly, for up to 40 years: the buyer pays the mortgage, upkeep and property tax; the renter pays rent. Rent and home value grow at the rates you set. Whoever pays less invests the difference at the return you set, and the renter also invests the up-front cash (down payment plus buying costs). Net worth for the buyer is the home value less selling costs, less the remaining loan, plus any invested surplus. Break-even is the first year the buyer's net worth is at least the renter's.

## Tests

```bash
node --test core.test.js
```

The tests check that the mortgage is paid off exactly at the end of the term, that the dataset has 48 distinct rows and names the four missing provinces, that every row has positive rent, size and price, that price-to-rent is higher in Madrid than in Soria, that higher price growth never delays break-even and a higher rate never brings it forward, the year-0 net worth of each side, and that every province gives finite results. Node 18 or newer, no dependencies.
