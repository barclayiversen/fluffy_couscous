var express = require('express');
var sessions = require('../api/sessions/controllers');
var helpers = require('../api/utils/helpers');
var router = express.Router();

router.get('/', sessions.verifyToken);
router.post('/', sessions.create);

module.exports = router;
