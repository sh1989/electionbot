const BigNumber = require('bignumber.js');
const scraper = require('table-scraper');
const sampleSize = 7;

function calcAvg(val, sampleSize) {
  return val.dividedBy(sampleSize).round().toString();
}

function getPollingData() {
  return scraper.get('http://britainelects.com/polling/westminster/')
    .then(tableData => {
      var pollTable = tableData[0];
      var conAvg = new BigNumber(0);
      var labAvg = new BigNumber(0);
      var ldemAvg = new BigNumber(0);
      var ukipAvg = new BigNumber(0);
      var grnAvg = new BigNumber(0);

      for (var i = 0; i < sampleSize; i++) {
        conAvg = conAvg.plus(new BigNumber(pollTable[i]['Con']));
        labAvg = labAvg.plus(new BigNumber(pollTable[i]['Lab']));
        ldemAvg = ldemAvg.plus(new BigNumber(pollTable[i]['LDem']));
        ukipAvg = ukipAvg.plus(new BigNumber(pollTable[i]['UKIP']));
        grnAvg = grnAvg.plus(new BigNumber(pollTable[i]['Grn']));
      }

      var r = {
        data: {
          con: calcAvg(conAvg, sampleSize),
          lab: calcAvg(labAvg, sampleSize),
          lib: calcAvg(ldemAvg, sampleSize),
          ukip: calcAvg(ukipAvg, sampleSize),
          green: calcAvg(grnAvg, sampleSize)
        },
        meta: {
          sample: sampleSize
        }
      };
      console.log('== Got Result');
      return r;
    });
}

module.exports = getPollingData;
