const Scraper = require('./scraper');
const formatRow = require('./formatRow');

function getMessage() {
  return getData()
    .then(response => (
      `Average of last ${response.meta.sample} polls:\n` +
      `${formatRow(response, 'snp', ':snp:')}\n` +
      `${formatRow(response, 'con', ':conservative:')}\n` +
      `${formatRow(response, 'lab', ':labour:')}\n` +
      `${formatRow(response, 'ld', ':libdems:')}`
    ));
}

function getData() {
  const scraper = new Scraper(7, 'http://britainelects.com/polling/scotland/', 0, ['SNP', 'Lab', 'Con', 'LD']);

  return scraper.scrape();
}

module.exports = {
  getMessage,
  getData
};
