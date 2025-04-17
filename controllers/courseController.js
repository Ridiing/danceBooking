const courseDB  = require('../models/courseModel');
const bookingDB = require('../models/bookingModel');
const userDB    = require('../models/userDB');

exports.listCourses = (req, res) => {
  courseDB.find({}, (err, courses) => {
    if (err) return res.status(500).send('Error loading courses');
    res.render('courses', {
      courses,
      isOrganiser: req.session.user?.role === 'organiser'
    });
  });
};

exports.showAddForm = (req, res) => {
  res.render('addCourse');
};

exports.addCourse = (req, res) => {
  const { name, description, duration, price, dates, times, locations } = req.body;
  const sessions = Array.isArray(dates)
    ? dates.map((_, i) => ({ date: dates[i], time: times[i], location: locations[i] }))
    : [{ date: dates, time: times, location: locations }];

  courseDB.insert({ name, description, duration, price: +price, classes: sessions }, (err) => {
    if (err) return res.send('Error adding course');
    res.redirect('/courses');
  });
};

exports.showEditForm = (req, res) => {
  courseDB.findOne({ _id: req.params.id }, (err, course) => {
    if (err || !course) return res.send('Course not found');
    res.render('editCourse', { course });
  });
};

exports.updateCourse = (req, res) => {
  const { name, description, duration, price, dates, times, locations } = req.body;
  const sessions = Array.isArray(dates)
    ? dates.map((_, i) => ({ date: dates[i], time: times[i], location: locations[i] }))
    : [{ date: dates, time: times, location: locations }];

  courseDB.update(
    { _id: req.params.id },
    { $set: { name, description, duration, price: +price, classes: sessions } },
    {},
    (err) => {
      if (err) return res.send('Error updating course');
      res.redirect('/courses');
    }
  );
};

exports.deleteCourse = (req, res) => {
  courseDB.remove({ _id: req.params.id }, {}, (err) => {
    if (err) return res.send('Error deleting course');
    res.redirect('/courses');
  });
};

exports.viewParticipants = (req, res) => {
  const courseId = req.params.id;

  // Find all bookings for this course
  bookingDB.find({ courseId }, (err, bookings) => {
    if (err) return res.send('Error loading bookings');

    // Extract the user IDs and fetch those users
    const userIds = bookings.map(b => b.userId);
    userDB.find({ _id: { $in: userIds } }, (err, users) => {
      if (err) return res.send('Error loading participants');

      // Render the participants template with both list & courseId
      res.render('participants', { users, courseId });
    });
  });
};

/**
 * Allow an organiser to remove a participant from a course.
 * route: POST /courses/:courseId/unenrol/:userId
 */
exports.unenrolUser = (req, res) => {
  const { courseId, userId } = req.params;

  bookingDB.remove({ courseId, userId }, {}, (err, numRemoved) => {
    if (err) {
      console.error('Failed to unenrol user:', err);
      return res.send('Error removing participant');
    }
    // Redirect back to the participants list for this course
    res.redirect(`/courses/${courseId}/participants`);
  });
};
