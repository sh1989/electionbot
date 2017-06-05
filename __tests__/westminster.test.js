jest.mock('table-scraper');
const westminster = require('../services/westminster');
const tableScraper = require('table-scraper');

beforeAll(() => {
  tableScraper.setMock([[
    { 'Fieldwork end date': '07 Jun 17', 'Con': 48, 'Lab': 24, 'LDem': 12, 'UKIP': 7, 'Grn': 2 },
    { 'Fieldwork end date': '06 Jun 17', 'Con': 46, 'Lab': 25, 'LDem': 11, 'UKIP': 8, 'Grn': 3 },
    { 'Fieldwork end date': '05 Jun 17', 'Con': 44, 'Lab': 26, 'LDem': 10, 'UKIP': 11, 'Grn': 4 },
    { 'Fieldwork end date': '04 Jun 17', 'Con': 44, 'Lab': 23, 'LDem': 12, 'UKIP': 10, 'Grn': 4 },
    { 'Fieldwork end date': '03 Jun 17', 'Con': 46, 'Lab': 25, 'LDem': 11, 'UKIP': 9, 'Grn': 4 },
    { 'Fieldwork end date': '02 Jun 17', 'Con': 38, 'Lab': 29, 'LDem': 7, 'UKIP': 14, 'Grn': 5 },
    { 'Fieldwork end date': '1 Jun 17', 'Con': 42, 'Lab': 25, 'LDem': 11, 'UKIP': 11, 'Grn': 3 },
    { 'Fieldwork end date': '31 May 17', 'Con': 43, 'Lab': 25, 'LDem': 11, 'UKIP': 11, 'Grn': 4 },
    { 'Fieldwork end date': '30 May 17', 'Con': 43, 'Lab': 25, 'LDem': 11, 'UKIP': 10, 'Grn': 2 },
  ]]);
});

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
          sample: 7,
          from: '01 Jun 17',
          to: '07 Jun 17'
        }
      });
    });
});

test('formats message', () => {
  return westminster.getMessage()
    .then(result => {
      expect(result).toEqual(
        'Average of last 7 polls (01 Jun 17 - 07 Jun 17):\n' +
        ':conservative: 44%\t:small_red_triangle: 1\n' +
        ':labour: 25%\n' +
        ':libdems: 11%\n' +
        ':ukip: 10%\t:small_red_triangle_down: 1\n' +
        ':green: 4%'
      );
    });
});
