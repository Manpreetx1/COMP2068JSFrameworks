const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');

// GET /users/register - show register form
router.get('/register', (req, res) => {
  res.render('register', { title: 'Register' });
});

// POST /users/register - handle registration
router.post('/register', async (req, res) => {
  const { username, password, password2 } = req.body;
  let errors = [];

  if (!username || !password || !password2) {
    errors.push({ msg: 'Please fill in all fields' });
  }

  if (password !== password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password should be at least 6 characters' });
  }

  if (errors.length > 0) {
    return res.render('register', {
      title: 'Register',
      errors,
      username,
      password,
      password2
    });
  }

  try {
    let user = await User.findOne({ username });

    if (user) {
      errors.push({ msg: 'Username is already registered' });
      return res.render('register', {
        title: 'Register',
        errors,
        username,
        password,
        password2
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ username, password: hashedPassword });
    await user.save();

    req.flash('success_msg', 'You are now registered and can log in');
    res.redirect('/users/login');
  } catch (err) {
    console.error(err);
    res.status(500).send('Registration failed');
  }
});

// GET /users/login - show login form
router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

// POST /users/login - handle login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/recipes',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// GET /users/logout - handle logout
router.get('/logout', (req, res) => {
  req.logout(() => {
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
  });
});

module.exports = router;
