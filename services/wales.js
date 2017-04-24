const Scraper = require('./scraper');
const formatRow = require('./formatRow');

function getMessage() {
  return getData()
    .then(response => (
      `Average of last ${response.meta.sample} polls:\n` +
      `${formatRow(response, 'con', ':conservative:')}\n` +
      `${formatRow(response, 'lab', ':labour:')}\n` +
      `${formatRow(response, 'pc', ':plaid:')}\n` +
      `${formatRow(response, 'ld', ':libdems:')}\n` +
      `${formatRow(response, 'ukip', ':ukip:')}\n` +
      `${formatRow(response, 'grn', ':green:')}`
    ));
}

function getData() {
  const scraper = new Scraper(7, 'http://britainelects.com/polling/wales/', 0, ['Con', 'Lab', 'PC', 'LD', 'UKIP', 'Grn']);

  return scraper.scrape();
}

module.exports = {
  getMessage,
  getData
};
