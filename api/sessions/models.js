var jwt = require('jsonwebtoken'),
  utils = require('../utils/helpers'),
  secret = process.env.JWT_SECRET,
  expiration = process.env.JWT_EXPIRATION,
  bcrypt = require('bcrypt'),
  db = require('../../db'),
  redis = require('redis'),
  Slack = require('slack-node'),
  randomstring = require('randomstring'),
  redisClient = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST),
  twilioClient = require('twilio')(process.env.TWILIO_ID, process.env.TWILIO_KEY, process.env.TWILIO_PHONE);


function create(loginCredentials, callback) {
  db.one('SELECT * FROM users WHERE email = $1', loginCredentials.email)
    .then(function(user) {
      console.log(user);
      bcrypt.compare(loginCredentials.password, user.password, function(err, res) {
        if (err) {
          callback(err, null);
        } else {

          var key = randomstring.generate({
            length: 6,
            charset: 'numeric'
          });
          //Save key value in redis for 2FA
          redisClient.set('phone_' + user.phone_number, key);

          //Dev
          if (process.env.env == 'dev') {
            var slack = new Slack();
            slack.setWebhook(process.env.SLACK_WEBHOOK);
            slack.webhook({
              channel: "#devmessages",
              username: "barclaybot",
              icon_emoji: ":ghost:",
              text: "Your login key is: " + key
            }, function(err, response) {
              callback(null, 'Key sent');
              return false;
              console.log('Slack response: ', response);
              if (err) {
                console.log('Error: ', err);
              }
            });

          }

          //Prod
          if (process.env.env == 'prod') {
            twilioClient.sendMessage({
              to: user.phone_number,
              from: process.env.TWILIO_PHONE,
              body: 'Your login key is ' + key
            }, function(err, responseData) {
              if (err) {
                console.log(err);
                callback(err, 'Error');
              } else {
                callback(null, 'Key sent to phone');
              }
            })

          }

        }
      });
    })
    .catch(function(err) {
      console.log('error', err);
      callback(err, 'Uh oh');
    });
};



module.exports = {
  create: create
};
