var Sessions = require('./models');
var bcrypt = require('bcrypt');
var helpers = require('../utils/helpers');
var async = require('async');


function verifyToken(req, res, next) {
  console.log('body = ', req.body, ' headers = ', req.headers);
  Sessions.verifyToken(req.headers.authorization, function(err, success) {
    if (err) {
      helpers.errorResponse(req, res, err);
    } else {
      helpers.successResponse(req, res, success);
    }
  });

}

function create(req, res, next) {

  var loginCredentials = {
    email: req.body.email,
    password: req.body.password
  };

  Sessions.create(loginCredentials, function(err, success) {
    if (err) {
      helpers.errorResponse(req, res, err);
    } else {
      helpers.successResponse(req, res, success);
    }
  });

}

function authenticate(req, res, next) {
console.log(req.body)
  var user = {
    key: req.body.key,
    phone: req.body.phone_number
  };

  Sessions.authenticate(user, function(err, success) {
    if (err) {
      helpers.errorResponse(req, res, err);
    } else {
      helpers.successResponse(req, res, success);
    }
  });
}

function destroy(req, res, next) {

}

module.exports = {
  verifyToken: verifyToken,
  create: create,
  authenticate: authenticate,
  destroy: destroy
};
