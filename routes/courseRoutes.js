const express           = require('express');
const router            = express.Router();
const courseController  = require('../controllers/courseController');
const bookingController = require('../controllers/bookingController');

// public browse
router.get('/explore-courses', courseController.listCourses);

// ensure logged in
function isLoggedIn(req, res, next) {
  if (req.session.user) return next();
  res.redirect('/login');
}

// ensure organiser
function isOrganiser(req, res, next) {
  if (req.session.user?.role === 'organiser') return next();
  res.redirect('/login');
}

// organiser lanes
router.get('/courses',            isLoggedIn, isOrganiser, courseController.listCourses);
router.get('/courses/add',        isLoggedIn, isOrganiser, courseController.showAddForm);
router.post('/courses/add',       isLoggedIn, isOrganiser, courseController.addCourse);
router.get('/courses/edit/:id',   isLoggedIn, isOrganiser, courseController.showEditForm);
router.post('/courses/edit/:id',  isLoggedIn, isOrganiser, courseController.updateCourse);
router.get('/courses/delete/:id', isLoggedIn, isOrganiser, courseController.deleteCourse);
router.get('/courses/:id/participants',
                                 isLoggedIn, isOrganiser, courseController.viewParticipants);

// enrolment (non‑organisers)
router.post('/enrol/:id',         isLoggedIn, bookingController.enrol);

// organiser un‑enrol a user
router.post(
  '/courses/:courseId/unenrol/:userId',
  isLoggedIn,
  isOrganiser,
  courseController.unenrolUser
);

module.exports = router;
