'use strict';

const Bot = require('slackbots');
const westminster = require('./services/westminster');
const scotland = require('./services/scotland');
const indyref = require('./services/indyref');
const wales = require('./services/wales');
const seats = require('./services/seats');

class ElectionBot extends Bot {
  constructor(settings) {
    super(settings);
    this.settings = settings;
    this.user;
    this.on('start', this._onStart);
    this.on('message', this._onMessage);
  }

  _onStart() {
    this.user = this.users.filter(user => user.name === this.settings.name)[0];
    console.log('started!');
  }

  _onMessage(message) {
    if (this._isFromSomeoneElse(message)
      && this._isMessage(message)
      && this._mentionsMe(message)) {
        this._sendTypingResponse(message.channel);
        const text = message.text.toLowerCase();
        let action;

        if (text.indexOf('westminster') >= 0) {
          action = westminster.getMessage;
        } else if (text.indexOf('scotland') >= 0) {
          action = scotland.getMessage;
        } else if (text.indexOf('indyref') >= 0) {
          action = indyref.getMessage;
        } else if (text.indexOf('wales') >= 0) {
          action = wales.getMessage;
        } else if (text.indexOf('seats') >= 0) {
          action = seats.getMessage;
        }

        if (action) {
          action().then(
            response => { this._postMessage(message.channel, response); },
            () => { this._postError(message.channel); });
        } else {
          this._postDontKnow(message.channel);
        }
    }
  }

  _isFromSomeoneElse(message) {
    return message.user !== this.user.id;
  }

  _isMessage(message) {
      return message.type === 'message'
        && Boolean(message.text)
  }

  _sendTypingResponse(channel) {
    this.ws.send(JSON.stringify({ type: 'typing', channel: channel }));
  }

  _mentionsMe(message) {
    return message.text.indexOf(`<@${this.user.id}>`) > -1;
  }

  _postMessage(channel, message) {
    this.postMessage(channel, message, { as_user: true });
  }

  _postError(channel) {
    this._postMessage(channel, ':exclamation: Whoops! Failed to get data');
  }

  _postDontKnow(channel) {
    this._postMessage(
      channel,
      ':question: Sorry, I don\'t understand. Try again with one of these keywords:\n' +
      '*westminster* - For Westminster Polling Data\n' +
      '*scotland* - For Scottish Polling Data\n' +
      '*indyref* - For Independence Referendum Polling Data\n' +
      '*wales* - For Welsh Polling Data',
      '*seats* - For Westminster Seat Predictions'
    );
  }
}

module.exports = ElectionBot;
