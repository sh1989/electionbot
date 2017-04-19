const getPollingData = require('./polling');

return new Promise(r => {
  return getPollingData()
    .then(result => {
      console.log(JSON.stringify(result));
      r();
    })
  });
