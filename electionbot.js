'use strict';

const Bot = require('slackbots');
const westminster = require('./services/westminster');

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
        this._sendTypingResponse();

        westminster.getMessage()
          .then(this._postMessage, this._postError);
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

  _sendTypingResponse() {
    this.ws.send(JSON.stringify({ type: 'typing', channel: this.channel.id }));
  }

  _mentionsMe(message) {
    return message.text.indexOf(`<@${this.user.id}>`) > -1;
  }

  _postMessage(message) {
    this.postMessageToGroup(this.channel.name, message, { as_user: true });
  }

  _postError() {
    this._postMessage(':exclamation: Whoops! Failed to get data');
  }
}

module.exports = ElectionBot;
