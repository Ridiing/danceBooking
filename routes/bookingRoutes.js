const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.get('/enrol/:id', bookingController.enrol);
router.get('/my-courses', bookingController.showMyCourses);

module.exports = router;
