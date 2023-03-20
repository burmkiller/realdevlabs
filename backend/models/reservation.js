const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reservationSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    user: { type: mongoose.Types.ObjectId, required: true, ref: 'User'},
    date: { type: Date, required: true},
});

module.exports = mongoose.model('Reservation', reservationSchema);
