const bookingDB = require('../models/bookingModel');
const courseDB = require('../models/courseModel');

exports.enrol = (req, res) => {
  if (!req.session.user) return res.redirect('/login');

  const userId = req.session.user._id;
  const courseId = req.params.id;

  // prevent duplicate bookings
  bookingDB.findOne({ userId, courseId }, (err, existing) => {
    if (existing) {
      return res.send('You are already enrolled in this course.');
    }

    bookingDB.insert({ userId, courseId }, (err, booking) => {
      if (err) return res.send('Error enrolling.');
      res.redirect('/my-courses');
    });
  });
};

exports.showMyCourses = (req, res) => {
  if (!req.session.user) return res.redirect('/login');

  const userId = req.session.user._id;

  bookingDB.find({ userId }, (err, bookings) => {
    if (err || !bookings.length) return res.render('myCourses', { courses: [] });

    const courseIds = bookings.map(b => b.courseId);

    courseDB.find({ _id: { $in: courseIds } }, (err, courses) => {
      if (err) return res.send('Error loading courses');
      res.render('myCourses', { courses });
    });
  });
};

exports.unenrol = (req, res) => {
  const userId = req.session.user._id;
  const courseId = req.params.courseId;

  // double-check correct match
  bookingDB.remove({ userId: userId, courseId: courseId }, {}, (err, numRemoved) => {
    if (err) return res.send('Error unenrolling user');
    console.log(`Removed ${numRemoved} booking(s) for user ${userId} from course ${courseId}`);
    res.redirect('/my-courses');
  });
};

