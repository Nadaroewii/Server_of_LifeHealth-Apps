const mongoose = require('mongoose');
//const dbConfig = require('./config/db.config');
// const mySQL = require('mysql');

// const connectionString = {
//     connectionLimit : 100,
//     host            : 'localhost',
//     user            : 'root',
//     password        : '',
//     database        : 'lifehealth',
//     debug : false,
//     port : 3306,
// };

//const db = mySQL.createPool(connectionString);

module.exports = {
    db : "mongodb://nadaroewii:Nada3007@ac-u6zf77u-shard-00-00.2lj3hqm.mongodb.net:27017,ac-u6zf77u-shard-00-01.2lj3hqm.mongodb.net:27017,ac-u6zf77u-shard-00-02.2lj3hqm.mongodb.net:27017/?ssl=true&replicaSet=atlas-jr9eqd-shard-0&authSource=admin&retryWrites=true&w=majority"
};