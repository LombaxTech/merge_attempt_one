const express = require('express');
const router = express.Router();
const User = require('../models/user');

const { sendMessage, getInbox } = require('../controllers/chat');

router.get('/inbox/:userId', getInbox)
router.post('/chat/:studentId/:tutorId', sendMessage);


module.exports = router;