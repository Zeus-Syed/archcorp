const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let flightSchema = new Schema({
    countryId : {
        type: String,
        unique: true
    },
    countryName : {
        type: String
    },
    flightCount : {
        type: Number
    },
    createdOn : {
        type: Date
    }
}) ;

mongoose.model('Flight', flightSchema);