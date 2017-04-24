jest.mock('table-scraper');
const westminster = require('../services/westminster');

test('parses polling table', () => {
  return westminster.getData()
    .then(result => {
      expect(result).toEqual({
        data: {
          con: "44",
          lab: "25",
          ldem: "11",
          ukip: "10",
          grn: "4"
        },
        diff: {
          con: "1",
          lab: "0",
          ldem: "0",
          ukip: "-1",
          grn: "0"
        },
        meta: {
          sample: 7
        }
      });
    });
});

test('formats message', () => {
  return westminster.getMessage()
    .then(result => {
      expect(result).toEqual(
        'Average of last 7 polls:\n' +
        ':conservative: 44%\t:small_red_triangle: 1\n' +
        ':labour: 25%\n' +
        ':libdems: 11%\n' +
        ':ukip: 10%\t:small_red_triangle_down: 1\n' +
        ':green: 4%'
      );
    });
});
