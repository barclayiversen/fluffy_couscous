//TODO: pg-promise and all that

var connectionString = 'postgres://' + process.env.RDS_USERNAME + ':' + process.env.RDS_PASSWORD + '@' + process.env.RDS_HOSTNAME + '/' + process.env.RDS_DB_NAME;
var pgp = require('pg-promise')();
var db = pgp(connectionString);

function successResponse(callback, data) {
  callback(null, data);
}

function errorResponse(callback, data) {
  callback(data, null);
}

function create(user, callback) {
  db.query('INSERT INTO users (email, password, phone_number) VALUES ($1, $2, $3)', [user.email, user.password, user.phone_number])
    .then(function() {
      successResponse(callback, 'User Created');
    })
    .catch(function(err) {
      errorResponse(callback, 'Error creating user');
    });
}

module.exports = {
  create: create
}
