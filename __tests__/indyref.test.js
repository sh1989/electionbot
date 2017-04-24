jest.mock('table-scraper');
const indyref = require('../services/indyref');
const tableScraper = require('table-scraper');

beforeAll(() => {
  tableScraper.setMock([[], [
    { 'Yes': 43, 'No': 45 },
    { 'Yes': 43, 'No': 52 },
    { 'Yes': 43, 'No': 48 },
    { 'Yes': 42, 'No': 53 },
    { 'Yes': 37, 'No': 48 },
    { 'Yes': 43, 'No': 48 },
    { 'Yes': 47, 'No': 46 },
    { 'Yes': 41, 'No': 44 },
    { 'Yes': 44, 'No': 51 },
  ]]);
});

test('parses polling table', () => {
  return indyref.getData()
    .then(result => {
      expect(result).toEqual({
        data: {
          yes: "43",
          no: "49"
        },
        diff: {
          yes: "0",
          no: "0"
        },
        meta: {
          sample: 7
        }
      });
    });
});

test('formats message', () => {
  return indyref.getMessage()
    .then(result => {
      expect(result).toEqual(
        'Average of last 7 polls:\n' +
        ':flag-sco: 43%\n' +
        ':flag-gb: 49%'
      );
    });
});
