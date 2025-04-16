const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

function isOrganiser(req, res, next) {
  if (req.session.user && req.session.user.role === 'organiser') {
    next();
  } else {
    res.redirect('/login');
  }
}

router.get('/courses', courseController.listCourses);
router.get('/courses/add', isOrganiser, courseController.showAddForm);
router.post('/courses/add', isOrganiser, courseController.addCourse);
router.get('/courses/:id/participants', isOrganiser, courseController.viewParticipants);
router.get('/courses/edit/:id', isOrganiser, courseController.showEditForm);
router.post('/courses/edit/:id', isOrganiser, courseController.updateCourse);
router.get('/courses/delete/:id', isOrganiser, courseController.deleteCourse);


module.exports = router;
