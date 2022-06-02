const sequelize = require('sequelize')
const db = require('../config/db')
const mongoose = require('mongoose');
const { Schema } = mongoose;
const uniqueValidator = require('mongoose-unique-validator');
const { Double } = require('mongodb');
const { INTEGER } = require('sequelize');
const { Decimal128 } = require('mongodb');

const hasilSchema = new Schema(
    {
        duration: {
            type: String,
            required: true
        },
        distance: {
            type: Number,
            required: true
        },
        dataactv: {
            type: String,
            required: true,
        },
        kal: {
            type: Number,
            required: true,
        },
        lastlatitude: {
            type: Schema.Types.Decimal128,
            required: true
        },
        lastlongitude: {
            type: Schema.Types.Decimal128,
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'user'
        },
        Date: {
            type: Date,
            default: Date.now(),
        }
       }
);

const Hasil = mongoose.model("hasil", hasilSchema);
module.exports = Hasil, hasilSchema;