var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/play');
}

var alreadyLoggedIn = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		res.redirect('/game');
	// if the user is not authenticated then redirect him to the login page
	return next();
}

module.exports = function(passport){

	router.get('/', function(req, res) {
	  res.render('index', { title: 'Tower: The Ascent' });
	});

	router.get('/play', alreadyLoggedIn, function(req, res) {
		// Display the Login page with any flash message, if any
		res.render('play', { title: 'Tower: The Ascent', message: req.flash('message') });
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

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/game',
		failureRedirect: '/play',
		failureFlash : true  
	}));

	/* GET Registration Page */
	router.get('/signup', function(req, res){
		res.render('register',{message: req.flash('message')});
	});

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/game',
		failureRedirect: '/signup',
		failureFlash : true  
	}));

	/* GET Game Page */
	router.get('/game', isAuthenticated, function(req, res){
		res.render('game', { user: req.user });
	});

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		req.flash('message','You have logged out');
		res.redirect('/play');
	});

	return router;
}
