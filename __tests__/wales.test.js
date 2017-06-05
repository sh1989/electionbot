jest.mock('table-scraper');
const wales = require('../services/wales');
const tableScraper = require('table-scraper');

beforeAll(() => {
  tableScraper.setMock([[
    { 'Fieldwork': '07 Jun 17', 'Con': 40, 'Lab': 30, 'PC': 13, 'LD': 8, 'UKIP': 6, 'Grn': 2 },
    { 'Fieldwork': '6 Jun 17', 'Con': 28, 'Lab': 33, 'PC': 13, 'LD': 9, 'UKIP': 13, 'Grn': 2 },
    { 'Fieldwork': '05 Jun 17', 'Con': 29, 'Lab': 35, 'PC': 13, 'LD': 7, 'UKIP': 14, 'Grn': 2 },
    { 'Fieldwork': '04 Jun 17', 'Con': 23, 'Lab': 34, 'PC': 16, 'LD': 8, 'UKIP': 16, 'Grn': 2 },
    { 'Fieldwork': '03 Jun 17', 'Con': 22, 'Lab': 39, 'PC': 14, 'LD': 6, 'UKIP': 18 , 'Grn': 2},
    { 'Fieldwork': '02 Jun 17', 'Con': 23, 'Lab': 37, 'PC': 13, 'LD': 7, 'UKIP': 17, 'Grn': 2 },
    { 'Fieldwork': '01 Jun 17', 'Con': 22, 'Lab': 38, 'PC': 13, 'LD': 6, 'UKIP': 18, 'Grn': 2 },
    { 'Fieldwork': '31 May 17', 'Con': 25, 'Lab': 36, 'PC': 14, 'LD': 6, 'UKIP': 16, 'Grn': 0 }
  ]]);
});

test('parses polling table', () => {
  return wales.getData()
    .then(result => {
      expect(result).toEqual({
        data: {
          con: "27",
          lab: "35",
          pc: "14",
          ld: "7",
          ukip: "15",
          grn: "2"
        },
        diff: {
          con: "2",
          lab: "-1",
          pc: "0",
          ld: "0",
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
  return wales.getMessage()
    .then(result => {
      expect(result).toEqual(
        'Average of last 7 polls (01 Jun 17 - 07 Jun 17):\n' +
        ':conservative: 27%\t:small_red_triangle: 2\n' +
        ':labour: 35%\t:small_red_triangle_down: 1\n' +
        ':plaid: 14%\n'+
        ':libdems: 7%\n' +
        ':ukip: 15%\t:small_red_triangle_down: 1\n' +
        ':green: 2%'
      );
    });
});
