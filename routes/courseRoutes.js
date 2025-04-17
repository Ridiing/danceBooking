const express         = require('express');
const router          = express.Router();
const courseController = require('../controllers/courseController');
const bookingController = require('../controllers/bookingController');

// public browse
router.get('/explore-courses', courseController.listCourses);

// ensure logged in
function isLoggedIn(req, res, next) {
  if (req.session.user) return next();
  res.redirect('/login');
}


function isOrganiser(req, res, next) {
  if (req.session.user && req.session.user.role === 'organiser') {
    return next();
  }
  res.redirect('/login');
}

// organiser lanes
router.get('/courses',           isLoggedIn, courseController.listCourses);
router.get('/courses/add',       isLoggedIn, isOrganiser, courseController.showAddForm);
router.post('/courses/add',      isLoggedIn, isOrganiser, courseController.addCourse);
router.get('/courses/edit/:id',  isLoggedIn, isOrganiser, courseController.showEditForm);
router.post('/courses/edit/:id', isLoggedIn, isOrganiser, courseController.updateCourse);
router.get('/courses/delete/:id',isLoggedIn, isOrganiser, courseController.deleteCourse);
router.get('/courses/:id/participants',
                                isLoggedIn, isOrganiser, courseController.viewParticipants);

// enrollment (non‑organisers)
router.post('/enrol/:id',        isLoggedIn, bookingController.enrol);

module.exports = router;
