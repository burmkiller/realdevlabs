const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reservationSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User'},
    reservationDate: { type: Date, required: true},
});

module.exports = mongoose.model('Reservation', reservationSchema);
