const express           = require('express');
const router            = express.Router();
const bookingController = require('../controllers/bookingController');

function isLoggedIn(req, res, next) {
  if (req.session.user) return next();
  res.redirect('/login');
}

// view your courses
router.get('/my-courses', isLoggedIn, bookingController.showMyCourses);

// unenrol
router.post('/my-courses/unenrol/:courseId',
            isLoggedIn,
            bookingController.unenrol);

module.exports = router;
