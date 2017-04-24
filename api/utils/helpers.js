var util = require('util'),
  express = require('express'),
  expressValidator = require('express-validator'),
  app = express(),
  phone = require('phone');

function validateUserRegistrationData(req, res, next) {
  //TODO: Validate the user doesn't already exist. 
    req.checkBody('email', 'Invalid email!').isEmail();
    req.checkBody('password', 'Password is too short').isLength({
      min: 6
    });

  //Validate user input

  req.getValidationResult().then(function(result) {
    if (!result.isEmpty()) {
      res.status(400).send('There have been validation errors: ' + util.inspect(result.array()));
      return;
    } else {
      //Validate phone
      isPhone(req.body.phone_number, function(err, cleanPhoneNumber) {
        if (err) {
          errorResponse(req, res, err);
        } else {
          console.log('checkpoint');
          req.body.phone_number = cleanPhoneNumber
          return next();
        }
      });
    }
  });

}

function isPhone(phone_number, callback) {
  if (!phone_number) {
    callback('Please provide a phone number', null);
  }

  var cleanPhoneNumber = phone(phone_number);
  if (cleanPhoneNumber[0] === null) {
    callback('Phone number is invalid', null);
  }

  if (cleanPhoneNumber[0] != null) {
    callback(null, cleanPhoneNumber[0]);
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
