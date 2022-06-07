const Data = require("../models/datamodel");
const Hasil = require("../models/hasilmodel");
const auth = require("../../Serverjs/middleware/auth");
//const mysql = require('mysql');
//const {db} = require('../config/db.config');

async function dataencrypt(params, callback) {

    const data = new Data(params);
    data.save()
        .then((response) => {
        return callback(null, response);
    })
        .catch((error) => {
        console.log(error)
        return callback(error);
    });
    }

async function datadecrypt(params, callback) {
        const hasil = new Hasil(params);
        hasil.save()
            .then((response) => {
              console.log(response);
            return callback(null, response);
        })
            .catch((error) => {
            console.log(error)
            return callback(error);
        });
        }

module.exports = {
    dataencrypt,
    datadecrypt
};