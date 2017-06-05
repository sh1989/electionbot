'use strict';

const BigNumber = require('bignumber.js');
const scraper = require('table-scraper');
const moment = require('moment');

class Scraper {
  constructor(sampleSize, url, tableKey, columnKeys) {
    this.sampleSize = sampleSize;
    this.url = url;
    this.tableKey = tableKey;
    this.columnKeys = columnKeys;
  }

  scrape() {
    return scraper.get(this.url)
      .then(table => this.interpret(table[this.tableKey]));
  }

  interpret(data, keys) {
    const seed = {};
    this.columnKeys.forEach(k => {
      seed[k.toLowerCase()] = new BigNumber(0);
    });

    const sampledData = data
      .slice(0, this.sampleSize + 1)
      .map(v => {
        var r = {};
        this.columnKeys.forEach(k => {
          r[k.toLowerCase()] = this.toNumber(v[k]);
        });
        return r;
      });

    const pollOfPolls = sampledData
      .slice(0, this.sampleSize)
      .reduce(this.accumulate, seed);

    const prevPollOfPolls = sampledData
      .slice(1, this.sampleSize + 1)
      .reduce(this.accumulate, seed);

      const pollingRange = this.pollRange(data);

    return {
      data: this.calculateCurrent(pollOfPolls),
      diff: this.calculateDiff(pollOfPolls, prevPollOfPolls),
      meta: {
        sample: this.sampleSize,
        from: pollingRange.from,
        to: pollingRange.to
      }
    };
  }

  toNumber(val) {
    try {
      return new BigNumber(val);
    } catch (e) {
      return new BigNumber(0);
    }
  }

  average(val) {
      return val.dividedBy(this.sampleSize).round().toString();
  }

  accumulate(acc, val) {
    var newObj = {};
    Object.keys(acc).forEach(key => {
      newObj[key] = acc[key].plus(val[key]);
    });
    return newObj;
  }

  calculateCurrent(data) {
    var newObj = {};
    Object.keys(data).forEach(key => {
      newObj[key] = this.average(data[key], this.sampleSize);
    });
    return newObj;
  }

  calculateDiff(curr, prev) {
    var newObj = {};
    Object.keys(curr).forEach(key => {
      newObj[key] = this.average(curr[key].minus(prev[key]), this.sampleSize);
    });
    return newObj;
  }

  sortByDateDesc(lhs, rhs) {
    return lhs < rhs ? 1 : lhs > rhs ? -1 : 0;
  }

  pollRange(data) {
    const dates = data
      .slice(0, this.sampleSize)
      .map(d => new moment(d['Fieldwork'], 'DD MMM YY'))
      .sort(this.sortByDateDesc);
    return {
      to: dates[0].format('DD MMM YY'),
      from: dates[this.sampleSize - 1].format('DD MMM YY')
    };
  }
}

module.exports = Scraper;
