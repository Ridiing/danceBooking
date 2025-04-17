const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

function isOrganiser(req, res, next) {
    if (req.session.user && req.session.user.role === 'organiser') {
      next();
    } else {
      res.redirect('/login');
    }
  }

router.get('/register', authController.showRegister);
router.post('/register', authController.register);
router.get('/login', authController.showLogin);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/manage-users', isOrganiser, userController.manageUsers);
router.post('/make-organiser/:id', isOrganiser, userController.makeOrganiser);
router.post('/delete-user/:id', isOrganiser, userController.deleteUser);

module.exports = router;
