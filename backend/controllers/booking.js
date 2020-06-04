const User = require('../models/user');

exports.createBooking = async (req, res) => {

    let { tutorId } = req.params;
    let { studentId, subject, time } = req.body;

    try {
        let tutor = await User.findOne({ _id: tutorId, role: 1 });
        if (!tutor) return res.status(400).json({ error: 'no tutor found' });
        let student = await User.findOne({ _id: studentId, role: 0 });
        if (!student) return res.status(400).json({ error: 'no student found' });

        let booking = {
            tutor: {
                tutorName: tutor.name,
                tutorId
            },
            student: {
                studentName: student.name,
                studentId
            },
            subject,
            time: new Date(time.year, time.month, time.day, time.hour)
        }

        // TODO: MAKE SURE BOOKING DOESNT ALREADY EXIST

        tutor.bookings.push(booking);
        student.bookings.push(booking);
        let tutorResult = await tutor.save();
        let studentResult = await student.save();

        res.json({ success: 'true, booking saved', tutorResult, studentResult });

    } catch (error) {
        return res.status(400).json({ error })
    }
}

exports.getBookings = async (req, res) => {
    let { userId } = req.params;

    try {
        let user = await User.findOne({ _id: userId });
        if (!user) return res.status(400).json({ error: 'no user found' });

        res.json({ bookings: user.bookings });
    } catch (error) {
        return res.status(400).json({ error })
    }
}