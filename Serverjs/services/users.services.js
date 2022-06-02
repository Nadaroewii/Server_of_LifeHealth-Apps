const User = require("../../Serverjs/models/usersmodel");
const Data = require("../models/datamodel")
const bcrypt = require("bcryptjs")
const auth = require("../../Serverjs/middleware/auth");
const gk = require("../../ElgamalCrypto/GenerateKey");
const pk = require("../../ElgamalCrypto/GenerateKunci/elgamalnew");
const BigInteger = require('big-integer');
const ky = require('../../Serverjs/config/key');
const Base64 = require('js-base64');

//const mysql = require('mysql');
//const {db} = require('../config/db.config');

async function login({username, password}, callback) {
    const user = await User.findOne({ username });
    console.log(user);
    if(user != null) {
        if(bcrypt.compareSync(password, user.password)) {
            const token = auth.generateAccessToken(username);
            const ServerpubKey = ky.PubKey;
            const ClientpubKey = user.publicKey;
            const ClientprivKey = user.privateKey;
            //console.log(ClientpubKey);
            return callback(null, {...user.toJSON(), token, ServerpubKey, ClientpubKey, ClientprivKey});
        }
        else {
            return callback({
                message: "Invalid Password!",
            })
        }
    }
    else {
        return callback({
            message: "Invalid Username!"
        });
    }
}

async function register(params, callback) {
    pubKey = gk.generatekey;
    privatKey = BigInteger(pk.privatkey);
    privateKey =  Base64.encode(privatKey.toString());
    params['publicKey'] = pubKey;
    params['privateKey'] = privateKey;
    console.log(params);
    if(params.username == undefined) {
         return callback({ message: "Username Required"});
     }

    const user = new User(params);
    user.save()
    .then((response) => {
        return callback(null, response);
    })
    .catch((error) => {
        return callback(error);
    });
    }
    
 async function HistoryData(params, callback) {
    const userId = params.userId;
        //const username = params.username;
        //const dataId = params.dataId;
        //var condition = {};
        //if(username) {
          //  condition["username"] = {
            //   $regex: new RegExp(username), $options : "i"
            //};
        //}

        //if (dataId) {
          //condition["datarecord"] = dataId;
        //}

    User
    .findById(userId)
        //.find(condition, "userId, username, name")
        //.sort(params.sort)
    .populate("Hasil", "duration distance dataactv kal lastlatitude lastlongitude")
    .then((response) => {
        return callback(null, response);
        })
    .catch((error) => {
        return callback(error);
    });
}
        
module.exports = {
    login,
    register,
    HistoryData
};