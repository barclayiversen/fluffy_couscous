var User = require('./models');
var bcrypt = require('bcrypt');
var helpers = require('../utils/helpers');
var async = require('async');

function successResponse(req, res, responseData) {
  res.status(200)
    .json({
      data: responseData
    })
}

//Moved to utils
// function errorResponse(req, res, responseData) {
//   res.status(400)
//     .json({
//       data: responseData
//     })
// }

function create (req, res, next) {

  var user = {
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    phone_number: req.body.phone_number
  };

  // console.log('user', user);
  User.create(user, function(err, success) {
    console.log(err, success);
    if (err) {
      helpers.errorResponse(req, res, err);
    } else {
      successResponse(req, res, success);
    }

  })

}

function destroy (req, res, next) {
  User.destroy(req.params.user_id, function(err, success) {
    console.log(err, 'and', success);
    if (err) {
      helpers.errorResponse(req, res, err);
    } else {
      successResponse(req, res, success);
    }
  })
}

module.exports = {
  create: create,
  destroy: destroy
}
