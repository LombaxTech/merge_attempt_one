const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    tutor: {
        tutorName: String,
        tutorId: String
    },
    student: {
        studentName: String,
        studentId: String
    },
    subject: String,
    time: Date
})

module.exports = bookingSchema;