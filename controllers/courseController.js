// courseController.js
const courseDB = require('../models/courseModel');
const bookingDB = require('../models/bookingModel');
const userDB = require('../models/userDB');

exports.listCourses = (req, res) => {
  courseDB.find({}, (err, courses) => {
    if (err) return res.status(500).send('Error loading courses');

    res.render('courses', {
      courses,
      user: req.session.user,
      isOrganiser: req.session.user?.role === 'organiser',
      isStudent: req.session.user?.role === 'student'
    });
  });
};

exports.showAddForm = (req, res) => {
  res.render('addCourse', {
    user: req.session.user
  });
};

exports.addCourse = (req, res) => {
  const { name, description, duration, price, dates, times, locations } = req.body;

  const classes = Array.isArray(dates) ? dates.map((_, i) => ({
    date: dates[i],
    time: times[i],
    location: locations[i]
  })) : [{
    date: dates,
    time: times,
    location: locations
  }];

  const newCourse = {
    name,
    description,
    duration,
    price: parseFloat(price),
    classes
  };

  courseDB.insert(newCourse, (err) => {
    if (err) return res.send('Error adding course');
    res.redirect('/courses');
  });
};

exports.showEditForm = (req, res) => {
  const courseId = req.params.id;

  courseDB.findOne({ _id: courseId }, (err, course) => {
    if (err || !course) return res.send('Course not found');
    res.render('editCourse', { course, user: req.session.user });
  });
};

exports.updateCourse = (req, res) => {
  const { name, description, duration, price, dates, times, locations } = req.body;

  const classes = Array.isArray(dates) ? dates.map((_, i) => ({
    date: dates[i],
    time: times[i],
    location: locations[i]
  })) : [{
    date: dates,
    time: times,
    location: locations
  }];

  const updatedCourse = {
    name,
    description,
    duration,
    price: parseFloat(price),
    classes
  };

  courseDB.update({ _id: req.params.id }, { $set: updatedCourse }, {}, (err) => {
    if (err) return res.send('Error updating course');
    res.redirect('/courses');
  });
};

exports.deleteCourse = (req, res) => {
  courseDB.remove({ _id: req.params.id }, {}, (err) => {
    if (err) return res.send('Error deleting course');
    res.redirect('/courses');
  });
};

exports.viewParticipants = (req, res) => {
  const courseId = req.params.id;

  bookingDB.find({ courseId }, (err, bookings) => {
    if (err) return res.send('Error loading bookings');

    const userIds = bookings.map(b => b.userId);

    userDB.find({ _id: { $in: userIds } }, (err, users) => {
      if (err) return res.send('Error loading users');

    
      res.render('participants', {
        users,
        user: req.session.user,
        courseId
      });
    });
  });
};

exports.unenrolUser = (req, res) => {
  const courseId = req.params.courseId;
  const userId = req.session.user?._id;

  if (!userId) {
    return res.redirect('/login');
  }

  bookingDB.remove({ courseId, userId }, {}, (err, numRemoved) => {
    if (err) return res.send('Error unenrolling user');
    res.redirect('/my-courses');
  });
};

