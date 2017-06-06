const BigNumber = require('bignumber.js');
const scraper = require('table-scraper');

function getMessage() {
  return getData()
    .then(response => (
      `Current Westminster seat prediction:\n` +
      `${formatRow(response[0], ':conservative:')}\n` +
      `${formatRow(response[1], ':labour:')}\n` +
      `${formatRow(response[2], ':snp:')}\n` +
      `${formatRow(response[3], ':libdems:')}\n` +
      `${formatRow(response[4], ':plaid:')}\n` +
      `${formatRow(response[5], ':green:')}\n` +
      `${formatRow(response[6], ':ukip:')}\n` +
      `${formatRow(response[7], ':white_medium_square:')}`
    ));
}

function getData() {
  return scraper.get('http://britainelects.com/nowcast/')
    .then(tables => interpret(tables[0]));
}

function interpret(table) {
  return table
    .map(row => ({
        key: row['-'],
        party: row['Party'],
        seats: toNumber(row['Seats']),
        seatChange: toNumber(row['+/-']),
        vote: toNumber(row['Vote %']),
        voteChange: toNumber(row['% +/-'])
    }));
}

function toNumber(val) {
  try {
    return new BigNumber(val);
  } catch (e) {
    return new BigNumber(0);
  }
}

function formatRow(result, emoji) {
  const change = result.seatChange;
  if (change > 0) {
    return `${emoji} ${result.seats}\t:small_red_triangle: ${change}`;
  } else if (change < 0) {
    return `${emoji} ${result.seats}\t:small_red_triangle_down: ${change * -1}`;
  }

  return `${emoji} ${change}`;
}

module.exports = {
  getMessage,
  getData
};
