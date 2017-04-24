'use strict';

let mockData;

function setMock(data) {
  mockData = data;
}

function tableScraper(url) {
  return new Promise((resolve, reject) => {
    resolve(mockData);
  });
}

module.exports = {
  get: tableScraper,
  setMock: setMock
};
