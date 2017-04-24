var express = require('express');
var users = require('./users');
var sessions = require('./sessions');
var app = express();

app.use('/users', users); //
app.use('/sessions', sessions);

module.exports = app;
