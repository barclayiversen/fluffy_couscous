var User = require('./models');
var bcrypt = require('bcrypt');
var helpers = require('../utils/helpers');
var phone = require('phone');
var async = require('async');

function create (req, res, next) {
  var validPhoneNumber = phone(req.body.phone_number);
  validPhoneNumber = validPhoneNumber[0];
  var user = {
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    phone_number: validPhoneNumber
  };

  User.create(user, function(err, success) {
    console.log(err, success);
    if (err) {
      helpers.errorResponse(req, res, err);
    } else {
      helpers.successResponse(req, res, success);
    }

  });

};

function update(req, res, next) {

};

function destroy (req, res, next) {
  User.destroy(req.params.user_id, function(err, success) {
    console.log(err, 'and', success);
    if (err) {
      helpers.errorResponse(req, res, err);
    } else {
      successResponse(req, res, success);
    }
  })
};

module.exports = {
  create: create,
  destroy: destroy
};
