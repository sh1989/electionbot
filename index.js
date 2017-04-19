var token = process.env.BOT_API_KEY;
var name = process.env.BOT_NAME;

var Bot = require('./electionbot');

const bot = new Bot({
  token,
  name
});
