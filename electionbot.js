'use strict';

const Bot = require('slackbots');
const getPollingData = require('./polling');

class ElectionBot extends Bot {
  constructor(settings) {
    super(settings);
    this.settings = settings;
    this.user;
    this.channel;
    this.on('start', this._onStart);
    this.on('message', this._onMessage);
  }

  _onStart() {
    this.user = this.users.filter(user => user.name === this.settings.name)[0];
    this.channel = this.groups.filter(group => group.name === 'lolatics')[0];

    console.log('started!');
  }

  _onMessage(message) {
    if (this._isFromSomeoneElse(message)
      && this._isMessage(message)
      && this._isInLoliticsChannel(message)
      && this._mentionsMe(message)) {
        console.log('== Handling Query');
        this.ws.send(JSON.stringify({ type: 'typing', channel: this.channel.id }));

        getPollingData()
          .then(response => {
            const result =
              `Average of last ${response.meta.sample} polls:\n` +
              `:conservative: ${response.data.con}%${this._formatChange(response.diff.con)}\n` +
              `:labour: ${response.data.lab}%${this._formatChange(response.diff.lab)}\n` +
              `:libdems: ${response.data.lib}%${this._formatChange(response.diff.lib)}\n` +
              `:ukip: ${response.data.ukip}%${this._formatChange(response.diff.ukip)}\n` +
              `:green: ${response.data.green}%${this._formatChange(response.diff.green)}`;
            this._postMessage(result);
          }, error => {
            this._postMessage(':exclamation: Whoops! Failed to get data');
          });
    }
  }

  _formatChange(val) {
    if (val > 0) {
      return `\t:small_red_triangle: ${val}`;
    } else if (val < 0) {
      return `\t:small_red_triangle_down: ${val * -1}`;
    } else {
      return '';
    }
  }

  _isFromSomeoneElse(message) {
    return message.user !== this.user.id;
  }

  _isInLoliticsChannel(message) {
      return message.channel === this.channel.id;
  }

  _isMessage(message) {
      return message.type === 'message'
        && Boolean(message.text)
  }

  _mentionsMe(message) {
    return message.text.indexOf(`<@${this.user.id}>`) > -1;
  }

  _postMessage(message) {
    this.postMessageToGroup(this.channel.name, message, { as_user: true });
  }
}

module.exports = ElectionBot;
