const Scraper = require('./scraper');

function getMessage() {
  return getData()
    .then(response => (
      `Average of last ${response.meta.sample} polls:\n` +
      `:snp: ${response.data.snp}%${formatChange(response.diff.snp)}\n` +
      `:conservative: ${response.data.con}%${formatChange(response.diff.con)}\n` +
      `:labour: ${response.data.lab}%${formatChange(response.diff.lab)}\n` +
      `:libdems: ${response.data.ld}%${formatChange(response.diff.ld)}`
    ));
}

function getData() {
  const scraper = new Scraper(7, 'http://britainelects.com/polling/scotland/', 0, ['SNP', 'Lab', 'Con', 'LD']);

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
