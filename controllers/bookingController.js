const bookingDB = require('../models/bookingModel');
const courseDB  = require('../models/courseModel');

exports.enrol = (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  const userId   = req.session.user._id;
  const courseId = req.params.id;

  console.log('Enrolling', userId, 'into', courseId);
  bookingDB.findOne({ userId, courseId }, (err, existing) => {
    if (err) return res.send('Error checking enrolment');
    if (existing) return res.send('Already enrolled');
    bookingDB.insert({ userId, courseId }, (err) => {
      if (err) return res.send('Error enrolling');
      res.redirect('/my-courses');
    });
  });
};

exports.showMyCourses = (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  const userId = req.session.user._id;

  bookingDB.find({ userId }, (err, bookings) => {
    if (err || !bookings.length) {
      return res.render('myCourses', { courses: [] });
    }
    const courseIds = bookings.map(b => b.courseId);
    courseDB.find({ _id: { $in: courseIds } }, (err, courses) => {
      if (err) return res.send('Error loading your courses');
      res.render('myCourses', { courses });
    });
  });
};

exports.unenrol = (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  const userId   = req.session.user._id;
  const courseId = req.params.courseId;

  bookingDB.remove({ userId, courseId }, {}, (err) => {
    if (err) return res.send('Error unenrolling');
    res.redirect('/my-courses');
  });
};
