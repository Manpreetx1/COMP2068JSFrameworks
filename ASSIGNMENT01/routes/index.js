var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About Me' });
});

/* GET projects page. */
router.get('/projects', function(req, res, next) {
  res.render('projects', { title: 'Projects' });
});

/* GET contact page. */
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact Me' });
});

/* POST contact form */
router.post('/contact', function(req, res, next) {
  const { name, email, message } = req.body;
  
  console.log(`New contact form submission:\nName: ${name}\nEmail: ${email}\nMessage: ${message}`);
  
  // Redirect back to the contact page with a success message
  res.render('contact', { title: 'Contact Me', success: 'Your message has been sent!' });
});

module.exports = router;
