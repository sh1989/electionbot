const data = [[
  { 'Con': 48, 'Lab': 24, 'LDem': 12, 'UKIP': 7, 'Grn': 2 },
  { 'Con': 46, 'Lab': 25, 'LDem': 11, 'UKIP': 8, 'Grn': 3 },
  { 'Con': 44, 'Lab': 26, 'LDem': 10, 'UKIP': 11, 'Grn': 4 },
  { 'Con': 44, 'Lab': 23, 'LDem': 12, 'UKIP': 10, 'Grn': 4 },
  { 'Con': 46, 'Lab': 25, 'LDem': 11, 'UKIP': 9, 'Grn': 4 },
  { 'Con': 38, 'Lab': 29, 'LDem': 7, 'UKIP': 14, 'Grn': 5 },
  { 'Con': 42, 'Lab': 25, 'LDem': 11, 'UKIP': 11, 'Grn': 3 },
  { 'Con': 43, 'Lab': 25, 'LDem': 11, 'UKIP': 11, 'Grn': 4 },
  { 'Con': 43, 'Lab': 25, 'LDem': 11, 'UKIP': 10, 'Grn': 2 },
]];

function tableScraper(url) {
  return new Promise((resolve, reject) => {
    resolve(data);
  });
}

module.exports = {
  get: tableScraper
};
