var express = require('express');
var users = require('../api/user/controllers');
var helpers = require('../api/utils/helpers');
var router = express.Router();

router.post('/', helpers.validateUserRegistrationData, users.create);

module.exports = router;
