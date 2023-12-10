const mongoose = require('mongoose');
const { Schema } = mongoose;

const AccomodationSchema = new Schema({
    owner: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
    title: String,
    address: String,
    photos: [String],
    description: String,
    perks: [String],
    extraInfo: String,
    checkIn: Number,
    checkOut:Number,
    maxGuest:Number
});


const AccomodationModel = mongoose.model('Accomodation', AccomodationSchema);

module.exports = AccomodationModel;