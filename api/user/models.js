//TODO: pg-promise and all that
var moment = require('moment');
var db = require('../../db');

function successResponse(callback, data) {
  callback(null, data);
}

function errorResponse(callback, data) {
  callback(data, null);
}

function create(user, callback) {
  var now = moment().unix();
  db.query('INSERT INTO users (email, password, phone_number) VALUES ($1, $2, $3)', [user.email, user.password, user.phone_number])
    .then(function() {
      successResponse(callback, 'User Created');
    })
    .catch(function(err) {
      //Log error here but only pass a message back.
      console.log('error', err);
      errorResponse(callback, 'Error creating user');
    });
}

function destroy(user_id, callback) {
  db.query('DELETE FROM users WHERE id = $1', user_id)
    .then(function() {
      successResponse(callback, 'User Destroyed');
    })
    .catch(function(err) {
      errorResponse(callback, 'Error destroying user');
    })
}



module.exports = {
  create: create,
  destroy: destroy
}
