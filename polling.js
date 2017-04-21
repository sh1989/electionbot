const BigNumber = require('bignumber.js');
const scraper = require('table-scraper');
const sampleSize = 7;
const seed = {
  con: new BigNumber(0),
  lab: new BigNumber(0),
  lib: new BigNumber(0),
  ukip: new BigNumber(0),
  green: new BigNumber(0)
};

function getPollingData() {
  return scraper.get('http://britainelects.com/polling/westminster/')
    .then(tableData => {
      // Normalize the first sampleSize + 1 rows
      var pollTable = tableData[0]
        .slice(0, sampleSize + 1)
        .map(v => ({
          con: new BigNumber(v['Con']),
          lab: new BigNumber(v['Lab']),
          lib: new BigNumber(v['LDem']),
          ukip: new BigNumber(v['UKIP']),
          green: new BigNumber(v['Grn'])
        }));

      var pollOfPolls = pollTable
        .slice(0, sampleSize)
        .reduce(accumulate, seed);

      var prevPollOfPolls = pollTable
        .slice(1, sampleSize + 1)
        .reduce(accumulate, seed);

      return {
        data: calculatCurrent(pollOfPolls),
        diff: calculateDiff(pollOfPolls, prevPollOfPolls),
        meta: {
          sample: sampleSize
        }
      };
    });
}

function average(val, sampleSize) {
  return val.dividedBy(sampleSize).round().toString();
}

function accumulate(acc, val) {
  var newObj = {};
  Object.keys(acc).forEach(key => {
    newObj[key] = acc[key].plus(val[key]);
  });
  return newObj;
}

function calculatCurrent(data) {
  var newObj = {};
  Object.keys(data).forEach(key => {
    newObj[key] = average(data[key], sampleSize);
  });
  return newObj;
}

function calculateDiff(curr, prev) {
  var newObj = {};
  Object.keys(curr).forEach(key => {
    newObj[key] = average(curr[key].minus(prev[key]), sampleSize);
  });
  return newObj;
}

module.exports = getPollingData;
