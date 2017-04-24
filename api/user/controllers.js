var user = require('./models');
var bcrypt = require('bcrypt');
var helpers = require('../utils/helpers');

function successResponse(req, res, responseData) {
  res.status(200)
    .json({
      data: responseData
    })
}

function create (req, res, next) {

  var user = {
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    phone_number: req.body.phone_number
  };
  console.log('user', user);
  user.create(user, function(err, success) {
    console.log(err, success);
    if (err) {
      errorResponse(req, res, err);
    } else {
      successResponse(req, res, success);
    }

  })

}

module.exports = {
  create: create
}
