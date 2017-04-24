const Scraper = require('./scraper');

function getMessage() {
  return getData()
    .then(response => (
      `Average of last ${response.meta.sample} polls:\n` +
      `:flag-sco: ${response.data.yes}%${formatChange(response.diff.yes)}\n` +
      `:flag-gb: ${response.data.no}%${formatChange(response.diff.no)}\``
    ));
}

function getData() {
  const scraper = new Scraper(7, 'http://britainelects.com/polling/scotland/', 1, ['Yes', 'No']);

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
