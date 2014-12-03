var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Tower: The Ascent' });
});

router.get('/play', function(req, res) {
  res.render('play', { title: 'Tower: The Ascent' });
});

router.get('/about', function(req, res) {
  res.render('about', { title: 'Tower: The Ascent' });
});

router.get('/updates', function(req, res) {
  res.render('updates', { title: 'Tower: The Ascent' });
});

router.get('/contact', function(req, res) {
  res.render('contact', { title: 'Tower: The Ascent' });
});

module.exports = router;
