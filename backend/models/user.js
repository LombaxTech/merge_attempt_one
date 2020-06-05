const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inboxSchema = require('./inbox');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    subjects: [String],
    // bookings: [bookingSchema],
    // cancelledBookings: [bookingSchema],
    university: {
        type: String
    },
    inbox: [inboxSchema],
    role: {
        type: Number,
        default: 0
    }
})

const user = mongoose.model('User', userSchema);

module.exports = user;