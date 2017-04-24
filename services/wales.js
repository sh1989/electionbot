const Scraper = require('./scraper');

function getMessage() {
  return getData()
    .then(response => (
      `Average of last ${response.meta.sample} polls:\n` +
      `:conservative: ${response.data.con}%${formatChange(response.diff.con)}\n` +
      `:labour: ${response.data.lab}%${formatChange(response.diff.lab)}\n` +
      `:plaid: ${response.data.pc}%${formatChange(response.diff.pc)}\n` +
      `:libdems: ${response.data.ld}%${formatChange(response.diff.ld)}\n` +
      `:ukip: ${response.data.ukip}%${formatChange(response.diff.ukip)}\n` +
      `:green: ${response.data.grn}%${formatChange(response.diff.grn)}`
    ));
}

function getData() {
  const scraper = new Scraper(7, 'http://britainelects.com/polling/wales/', 0, ['Con', 'Lab', 'PC', 'LD', 'UKIP', 'Grn']);

  return scraper.scrape();
}

function formatChange(val) {
  if (val > 0) {
    return `\t:small_red_triangle: ${val}`;
  } else if (val < 0) {
    return `\t:small_red_triangle_down: ${val * -1}`;
  } else {
    return '';
  }
}

module.exports = {
  getMessage,
  getData
};
