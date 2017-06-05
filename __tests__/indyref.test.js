jest.mock('table-scraper');
const indyref = require('../services/indyref');
const tableScraper = require('table-scraper');

beforeAll(() => {
  tableScraper.setMock([[], [
    { 'Fieldwork': '03 Jun 17', 'Yes': 43, 'No': 45 },
    { 'Fieldwork': '02 Jun 17', 'Yes': 43, 'No': 52 },
    { 'Fieldwork': '1 Jun 17', 'Yes': 43, 'No': 48 },
    { 'Fieldwork': '31 May 17', 'Yes': 42, 'No': 53 },
    { 'Fieldwork': '29 May 17', 'Yes': 37, 'No': 48 },
    { 'Fieldwork': '30 May 17', 'Yes': 43, 'No': 48 },
    { 'Fieldwork': '28 May 17', 'Yes': 47, 'No': 46 },
    { 'Fieldwork': '27 May 17', 'Yes': 41, 'No': 44 },
    { 'Fieldwork': '26 May 17', 'Yes': 44, 'No': 51 },
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
          sample: 7,
          from: '28 May 17',
          to: '03 Jun 17'
        }
      });
    });
});

test('formats message', () => {
  return indyref.getMessage()
    .then(result => {
      expect(result).toEqual(
        'Average of last 7 polls (28 May 17 - 03 Jun 17):\n' +
        ':flag-sco: 43%\n' +
        ':flag-gb: 49%'
      );
    });
});
