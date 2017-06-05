const Scraper = require('./scraper');
const formatRow = require('./formatRow');

function getMessage() {
  return getData()
    .then(response => (
      `Average of last ${response.meta.sample} polls (${response.meta.from} - ${response.meta.to}):\n` +
      `${formatRow(response, 'yes', ':flag-sco:')}\n` +
      `${formatRow(response, 'no', ':flag-gb:')}`
    ));
}

function getData() {
  const scraper = new Scraper(7, 'http://britainelects.com/polling/scotland/', 1, ['Yes', 'No']);

  return scraper.scrape();
}

module.exports = {
  getMessage,
  getData
};
