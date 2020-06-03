const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    studentName: String,
    subject: String,
    time: Date
})

module.exports = bookingSchema;