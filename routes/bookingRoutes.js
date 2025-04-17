const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// View user's own courses
router.get('/my-courses', bookingController.showMyCourses);

// Unenroll from a course (for logged-in user)
router.post('/my-courses/unenrol/:courseId', bookingController.unenrolFromMyClass);

module.exports = router;
