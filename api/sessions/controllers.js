var Sessions = require('./models');
var bcrypt = require('bcrypt');
var helpers = require('../utils/helpers');
var async = require('async');


function verifyToken(req, res, next) {

  Sessions.verifyToken(req.body.token, function(err, res) {
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

  var user = {
    key: req.body.key,
    phone: req.body.phone
  };

  Sessions.authenticate(user, function(err, success) {
    if (err) {
      helpers.errorResponse(req, res, err);
    } else {
      helpers.successResponse(req, res, success);
    }
  });
}

module.exports = {
  verifyToken: verifyToken,
  create: create,
  authenticate: authenticate
};
