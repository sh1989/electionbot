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
      var libAvg = new BigNumber(0);
      var ukipAvg = new BigNumber(0);
      var greenAvg = new BigNumber(0);

      for (var i = 0; i < sampleSize; i++) {
        conAvg = conAvg.plus(new BigNumber(pollTable[i]['Con']));
        labAvg = labAvg.plus(new BigNumber(pollTable[i]['Lab']));
        libAvg = libAvg.plus(new BigNumber(pollTable[i]['LDem']));
        ukipAvg = ukipAvg.plus(new BigNumber(pollTable[i]['UKIP']));
        greenAvg = greenAvg.plus(new BigNumber(pollTable[i]['Grn']));
      }

      var conChange = conAvg.minus(
          conAvg
            .minus(new BigNumber(pollTable[0]['Con']))
            .plus(new BigNumber(pollTable[sampleSize]['Con']))
          );
      var labChange = labAvg.minus(
          labAvg
            .minus(new BigNumber(pollTable[0]['Lab']))
            .plus(new BigNumber(pollTable[sampleSize]['Lab']))
          );
      var libChange = libAvg.minus(
          libAvg
            .minus(new BigNumber(pollTable[0]['LDem']))
            .plus(new BigNumber(pollTable[sampleSize]['LDem']))
          );
      var ukipChange = ukipAvg.minus(
          ukipAvg
            .minus(new BigNumber(pollTable[0]['UKIP']))
            .plus(new BigNumber(pollTable[sampleSize]['UKIP']))
          );
      var greenChange = greenAvg.minus(
          greenAvg
            .minus(new BigNumber(pollTable[0]['Grn']))
            .plus(new BigNumber(pollTable[sampleSize]['Grn']))
          );

      console.log('== Got Result');
      return {
        data: {
          con: calcAvg(conAvg, sampleSize),
          lab: calcAvg(labAvg, sampleSize),
          lib: calcAvg(libAvg, sampleSize),
          ukip: calcAvg(ukipAvg, sampleSize),
          green: calcAvg(greenAvg, sampleSize)
        },
        diff: {
          con: calcAvg(conChange, sampleSize),
          lab: calcAvg(labChange, sampleSize),
          lib: calcAvg(libChange, sampleSize),
          ukip: calcAvg(ukipChange, sampleSize),
          green: calcAvg(greenChange, sampleSize)
        },
        meta: {
          sample: sampleSize
        }
      };
    });
}

module.exports = getPollingData;
