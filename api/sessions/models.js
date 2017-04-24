var jwt = require('jsonwebtoken');
var utils = require('../utils/helpers');
var secret = process.env.JWT_SECRET;
var expiration = process.env.JWT_EXPIRATION;
var bcrypt = require('bcrypt');
var db = require('../../db');

function create(loginCredentials, callback) {
  db.one('SELECT id, password, email FROM users WHERE email = $1', loginCredentials.email)
    .then(function(user) {
      console.log(user);
      bcrypt.compare(loginCredentials.password, user.password, function(err, res) {
        if (err) {
          callback(err, null);
        } else {
          var tokenData = {
            user_id: user.id,
            email: user.email
          }
          var token = jwt.sign(tokenData, secret, {
            expiresIn: "7d"
          });
          callback(null, token);
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
