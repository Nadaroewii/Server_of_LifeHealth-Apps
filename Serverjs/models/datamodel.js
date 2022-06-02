const sequelize = require('sequelize')
const db = require('../config/db')
const mongoose = require('mongoose');
const { Schema } = mongoose;
const uniqueValidator = require('mongoose-unique-validator');
const { Double } = require('mongodb');
const { INTEGER } = require('sequelize');

const dataSchema = new Schema(
    {
        duration: {
            type: String,
            required: true
        },
        distance: {
            type: String,
            required: true
        },
        dataactv: {
            type: String,
            required: true,
        },
        kal: {
            type: String,
            required: true,
        },
        lastlatitude: {
            type: String,
            required: true
        },
        lastlongitude: {
            type: String,
            required: true,
        },
        Date: {
            type: Date,
            default: Date.now(),
        }
       }
);

const Data = mongoose.model("data", dataSchema);
module.exports = Data, dataSchema;