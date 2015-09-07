'use strict';

var fs = require('fs');
var classifier = require('classifier');

var bayes = new classifier.Bayesian();

fs.readFileSync('data/positive.txt').toString().toLowerCase().replace(/[^\w\s]/g, '').split('\n').forEach(function (v) {
  v && bayes.train(v, 'twss');
});

// negative training data
fs.readFileSync('data/negative.txt').toString().toLowerCase().replace(/[^\w\s]/g, '').split('\n').forEach(function (v) {
  v && bayes.train(v, 'unclassified');
});


// this is dirty (string concat get request). doesn't handle multiple rooms, etc
var https = require('https');
var baseUrl = 'https://api.telegram.org/bot' + process.env.TELEGRAM_BOT_TOKEN;
var updateId = null;
//var conversations = {};

function getUpdates() {
  https.get(baseUrl + '/getUpdates' + (updateId ? '?offset=' + updateId : ''), function (res) {
    var buf = '';
    res.on('data', function (chunk) { buf += chunk; });
    res.on('end', function () {
      console.log(buf);
      JSON.parse(buf).result.forEach(function (msg) {
        updateId = msg.update_id +1;
        //conversations[msg.message.chat.id] = msg.update_id; // set conversation state
        if (msg.message.text && bayes.classifySync(msg.message.text) === 'twss') {
          https.get(baseUrl + '/sendMessage?chat_id=' + msg.message.chat.id + '&text=That%27s%20what%20she%20said&reply_to_message_id=' + msg.message.message_id, function () {});
        }
      });
    });
  }).on('error', console.log);
}

getUpdates();
setInterval(getUpdates, 10000);