// bookingController.js
const bookingDB = require('../models/bookingModel');
const courseDB = require('../models/courseModel');

exports.enrol = (req, res) => {
  if (!req.session.user) return res.redirect('/login');

  const userId = String(req.session.user._id);
  const courseId = String(req.params.id);

  bookingDB.findOne({ userId, courseId }, (err, existing) => {
    if (err) return res.send('Error checking enrollment.');
    if (existing) {
      return res.send('You are already enrolled in this course.');
    }

    bookingDB.insert({ userId, courseId }, (err, booking) => {
      if (err) return res.send('Error enrolling.');
      console.log('Enrolled user:', userId, 'in course:', courseId);
      res.redirect('/my-courses');
    });
  });
};

exports.showMyCourses = (req, res) => {
  if (!req.session.user) return res.redirect('/login');

  const userId = String(req.session.user._id);

  bookingDB.find({ userId }, (err, bookings) => {
    if (err || !bookings.length) return res.render('myCourses', { courses: [] });

    const courseIds = bookings.map(b => b.courseId);

    courseDB.find({ _id: { $in: courseIds } }, (err, courses) => {
      if (err) return res.send('Error loading courses');
      res.render('myCourses', { courses });
    });
  });
};

exports.unenrolFromMyClass = (req, res) => {
  const userId = String(req.session.user._id);
  const courseId = String(req.params.courseId);

  bookingDB.remove({ courseId, userId }, {}, (err, numRemoved) => {
    if (err) return res.send('Error unenrolling from course.');
    console.log('Unenrolled user:', userId, 'from course:', courseId);
    res.redirect('/my-courses');
  });
};


