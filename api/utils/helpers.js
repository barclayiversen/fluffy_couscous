var util = require('util'),
  express = require('express'),
  expressValidator = require('express-validator'),
  app = express(),
  phone = require('phone');

function validateUserRegistrationData(req, res, next) {
  //Validate user input
  isPhone(req.body.phone_number, function(err, cleanPhoneNumber) {

  });
  req.checkBody('email', 'Invalid email!').isEmail();
  req.checkBody('password', 'Password is too short').isLength({
    min: 6
  });
  req.getValidationResult().then(function(result) {
    if (!result.isEmpty()) {
      res.status(400).send('There have been validation errors: ' + util.inspect(result.array()));
      return;
    } else {
      return next();
    }
  });

}

function isPhone(phone_number, callback) {
  if (!phone_number) {
    errorResponse(req, res, 'Please provide a phone number');
  }

  var cleanPhoneNumber = phone(phone_number);
  if (cleanPhoneNumber[0] === null) {
    errorResponse(req, res, 'Phone number is invalid');
  }

  if (cleanPhoneNumber[0] != null) {
    return cleanPhoneNumber[0];
  }

}

function errorResponse(req, res, responseData) {
  res.status(400)
    .json({
      data: responseData
    })
}


module.exports = {
  validateUserRegistrationData: validateUserRegistrationData
}
