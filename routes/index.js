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

	var updates = [{id:'1',title:'Site On Line',date:'Thu Dec 11, 2014',content:'A momentous occasion for us! Our amazing website is finally online.  Players can now log in and click on the wonderful enemy.  Enemies drop gold which you can collect.  Go Collect those gold!',numComments:1,comments:["I am so excited that the site is finally online!"],showComments:false},
  {id:'2',title:'Simple Game Changes',date:'Mon Dec 8, 2014',content:'A lot of simple game change have been added! Scrolling background and enemy attack get out there and fight heros!',numComments:2, comments:["I love this update!", "So awesome!"],showComments:false},
  {id:'3',title:'Game Started',date:'Mon Dec 1, 2014',content:'We started with our lovely game creation.  Simple updates have made the site an increasly awesomeness.',numComments:0, comments:[],showComments:false}]

	router.get('/updateData', function(req, res){
		res.send(updates);
	});

	router.get('/isAuthenticated', function(req, res){
		if(!req.isAuthenticated()) {
			res.status(401);
			res.end();
			return;
		}
		else {
			res.status(200);
			res.end();
			return;
		}
	});

	router.get('/isAdmin', function(req, res){
		if(req.isAuthenticated()) {
			if(req.user.username == "admin"){
				res.status(200);
				res.end();
				return;
			}	
		}
		res.status(401);
		res.end();
		return;
	});

	router.post('/addComment', function(req, res){
		if(!req.isAuthenticated()) {
			res.status(401);
			res.end();
			return;
		}
		var updateId = req.body.updateId;
		var comment = req.body.comment;
		for(var i=0;i<updates.length;i++){
    		if(updates[i].id==updateId){
        		updates[i].numComments += 1;
        		updates[i].comments.push(comment);
        		res.status(200);
				res.end();
    		}
    	}
		res.status(200);
		res.end();
	});

	router.post('/updateData', function(req, res){
		if(!req.isAuthenticated()) {
			res.status(401);
			res.end();
			return;
		}
		var update = req.body;
		for(var i=0;i<updates.length;i++){
    		if(updates[i].id==update.id){
        		updates[i] = update;
        		res.status(200);
				res.end();
    		}
    	}
		updates.unshift(update)
		res.status(200);
		res.end();
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
