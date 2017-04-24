jest.mock('table-scraper');
const scotland = require('../services/scotland');
const tableScraper = require('table-scraper');

beforeAll(() => {
  tableScraper.setMock([[
    { 'SNP': 44, 'Con': 33, 'Lab': 13, 'LD': 5 },
    { 'SNP': 43, 'Con': 28, 'Lab': 18, 'LD': 9 },
    { 'SNP': 47, 'Con': 28, 'Lab': 14, 'LD': 4 },
    { 'SNP': 47, 'Con': 27, 'Lab': 15, 'LD': 4 },
    { 'SNP': 49, 'Con': 20, 'Lab': 17, 'LD': 8 },
    { 'SNP': 47, 'Con': 24, 'Lab': 16, 'LD': 5 },
    { 'SNP': 52, 'Con': 16, 'Lab': 21, 'LD': 7 },
    { 'SNP': 51, 'Con': 17, 'Lab': 21, 'LD': 7 },
    { 'SNP': 50, 'Con': 14, 'Lab': 24, 'LD': 7 },
  ]]);
});

test('parses polling table', () => {
  return scotland.getData()
    .then(result => {
      expect(result).toEqual({
        data: {
          snp: "47",
          con: "25",
          lab: "16",
          ld: "6"
        },
        diff: {
          snp: "-1",
          con: "2",
          lab: "-1",
          ld: "0"
        },
        meta: {
          sample: 7
        }
      });
    });
});

test('formats message', () => {
  return scotland.getMessage()
    .then(result => {
      expect(result).toEqual(
        'Average of last 7 polls:\n' +
        ':snp: 47%\t:small_red_triangle_down: 1\n' +
        ':conservative: 25%\t:small_red_triangle: 2\n' +
        ':labour: 16%\t:small_red_triangle_down: 1\n' +
        ':libdems: 6%'
      );
    });
});
