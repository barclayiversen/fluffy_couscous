var express = require('express');
var users = require('../api/user/controllers');
var helpers = require('../api/utils/helpers');
var router = express.Router();


router.post('/', helpers.validateUserRegistrationData, users.create);
router.get('/:user_id', helpers.authenticateRequest, users.get);
router.put('/:user_id', helpers.authenticateRequest, users.update);
router.delete('/:user_id', helpers.authenticateRequest, users.destroy);


module.exports = router;
