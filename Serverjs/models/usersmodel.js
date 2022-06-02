const sequelize = require('sequelize')
const db = require('../config/db')
const mongoose = require('mongoose');
const { Schema } = mongoose;
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        date: {
            type: Date,
            default: Date.now()
        },
        // datarecord: {
        //     type: [mongoose.Schema.Types.ObjectId], 
        //     ref: 'hasil'
        // },
        publicKey: {
            type: [String]
        },
        privateKey: {
            type: [String]
        }
       }
);

userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString(),
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.password;
    },
});

userSchema.plugin(uniqueValidator, {message: "Email already in use."});

const User = mongoose.model("user", userSchema);
module.exports = User;