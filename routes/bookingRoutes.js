const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Enroll in a course
router.post('/enrol/:id', bookingController.enrol);

// View user's own courses
router.get('/my-courses', bookingController.showMyCourses);

// Unenroll from a course (for logged-in user)
router.post('/unenrol/:courseId', bookingController.unenrolSelf);

module.exports = router;
