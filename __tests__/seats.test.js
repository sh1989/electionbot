jest.mock('table-scraper');
const seats = require('../services/seats');
const tableScraper = require('table-scraper');

beforeAll(() => {
  tableScraper.setMock([[], [
    { 'Party': 'Conservative', 'Seats': 355, '+/-': 25, 'Vote %': '44.3', '% +/-': '6.5' },
    { 'Party': 'Labour', 'Seats': 215, '+/-': -17, 'Vote %': '35.1', '% +/-': '3.9' },
    { 'Party': 'Scottish National', 'Seats': 47, '+/-': -9, 'Vote %': '-', '% +/-': '-' },
    { 'Party': 'Liberal Democrat', 'Seats': 10, '+/-': 2, 'Vote %': '8.3', '% +/-': '0.2' },
    { 'Party': 'Plaid Cymru', 'Seats': 3, '+/-': 0, 'Vote %': '-', '% +/-': '-' },
    { 'Party': 'Green', 'Seats': 1, '+/-': 0, 'Vote %': '2.0', '% +/-': '-1.8' },
    { 'Party': 'UKIP', 'Seats': 0, '+/-': -1, 'Vote %': '4.5', '% +/-': '-8.4' },
    { 'Party': 'Independents / Other', 'Seats': 19, '+/-': 0, 'Vote %': '5.8', '% +/-': '-0.4' }
  ]]);
});

test('parses seats table', () => {
  return seats.getData()
    .then(result => {
      expect(result).toEqual([
        {
          key: 'Con',
          party: 'Conservative',
          seats: 355,
          seatChange: 25,
          vote: 44.3,
          voteChange: 6.5
        },
        {
          key: 'Lab',
          party: 'Labour',
          seats: 215,
          seatChange: -17,
          vote: 35.1,
          voteChange: 3.9
        },
        {
          key: 'SNP',
          party: 'Scottish National',
          seats: 47,
          seatChange: -9,
          vote: 0,
          voteChange: 0
        },
        {
          key: 'LDem',
          party: 'Liberal Democrat',
          seats: 10,
          seatChange: 2,
          vote: 8.3,
          voteChange: 0.2
        },
        {
          key: 'PC',
          party: 'Plaid Cymru',
          seats: 3,
          seatChange: 0,
          vote: 0,
          voteChange: 0
        },
        {
          key: 'Grn',
          party: 'Green',
          seats: 1,
          seatChange: 0,
          vote: 2,
          voteChange: -1.8
        },
        {
          key: 'UKIP',
          party: 'UKIP',
          seats: 0,
          seatChange: -1,
          vote: 4.5,
          voteChange: -8.4
        },
        {
          key: 'Oth',
          party: 'Independents / Other',
          seats: 19,
          seatChange: 0,
          vote: 5.8,
          voteChange: -0.4
        }
      ]);
    });
});

test('formats message', () => {
  return seats.getMessage()
    .then(result => {
      expect(result).toEqual(
        'Current Westminster seat prediction:\n' +
        ':conservative: 355\t:small_red_triangle: 25\n' +
        ':labour: 215\t:small_red_triangle_down: 17\n' +
        ':snp: 47\t:small_red_triangle_down: 9\n' +
        ':libdems: 10\t:small_red_triangle: 10\n' +
        ':plaid: 3\n' +
        ':green: 1'
        ':ukip: 0\t:small_red_triangle_down: 1\n' +
        ':white_medium_square: 19'
      );
    });
});
