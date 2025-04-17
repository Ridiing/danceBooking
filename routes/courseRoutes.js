const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const bookingController = require('../controllers/bookingController');
const courseDB = require('../models/courseModel');

// Explore courses (public)
router.get('/explore-courses', (req, res) => {
  courseDB.find({}, (err, courses) => {
    if (err) return res.status(500).send('Unable to load courses');

    res.render('exploreCourses', {
      courses,
      user: req.session.user,
      isOrganiser: req.session.user?.role === 'organiser'
    });
  });
});

// Middleware for access control
function isLoggedIn(req, res, next) {
  if (req.session.user) return next();
  res.redirect('/login');
}

function isOrganiser(req, res, next) {
  if (req.session.user && req.session.user.role === 'organiser') {
    next();
  } else {
    res.redirect('/login');
  }
}

// Course management (organisers only)
router.get('/courses', isLoggedIn, courseController.listCourses);
router.get('/courses/add', isOrganiser, courseController.showAddForm);
router.post('/courses/add', isOrganiser, courseController.addCourse);
router.get('/courses/:id/participants', isOrganiser, courseController.viewParticipants);
router.get('/courses/edit/:id', isOrganiser, courseController.showEditForm);
router.post('/courses/edit/:id', isOrganiser, courseController.updateCourse);
router.get('/courses/delete/:id', isOrganiser, courseController.deleteCourse);

// Booking routes (logged-in users)
router.post('/my-courses/unenrol/:courseId', isLoggedIn, bookingController.unenrolFromMyClass);
router.post('/courses/:id/enrol', isLoggedIn, bookingController.enrol); 



module.exports = router;

