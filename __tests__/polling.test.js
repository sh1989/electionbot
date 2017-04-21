jest.mock('table-scraper');
const getPollingData = require('../polling');

test('parses polling table', () => {
  return getPollingData()
    .then(result => {
      expect(result).toEqual({
        data: {
          con: "44",
          lab: "25",
          lib: "11",
          ukip: "10",
          green: "4"
        },
        diff: {
          con: "1",
          lab: "0",
          lib: "0",
          ukip: "-1",
          green: "0"
        },
        meta: {
          sample: 7
        }
      });
    });
});
