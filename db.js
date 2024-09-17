var connectionString = 'postgres://' + process.env.RDS_USERNAME + ':' + encodeURIComponent(process.env.RDS_PASSWORD) + '@' + process.env.RDS_HOSTNAME +':'+ process.env.RDS_PORT + '/' + process.env.RDS_DB_NAME;
var pgp = require('pg-promise')();
var db = pgp(connectionString);

module.exports = db;
