"use strict";
var express = require('express');
var ucsd_courses = require('./modules/ucsd_courses.js');
var redis = require('./modules/redis.js');
var mustacheExpress = require('mustache-express');
var socsjs = require('socsjs');

var calendarApp = require('./apps/calendar.js');
var prettyApp = require('./apps/pretty.js');
var highlightApp = require('./apps/highlight.js');


var app = express();

app.set('port', (process.env.PORT || 80));

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('view engine', 'mustache');
app.engine('html', mustacheExpress());
app.set('views', __dirname + '/views');



//Front Page
app.get('/', function(request, response) {
	response.send('aayyy');	
});


//#########   APPS    ###############

//Calendar App
app.get('/apps/calendar/landing.html', calendarApp.landing);

//Pretty App
app.get('/apps/pretty/test.css', prettyApp.landing);

//app.get('/apps/highlight', highlightApp.landing);

//Course highlight app
app.get('/apps/courses', highlightApp.landing);


//DAVID PUT YOUR STUFF HERE 
app.get('/socs', function(request, response){
	var quarter = request.query.quarter;
	var sectionID = request.query.sectionID;
	var timeout = 5000;
	var byId = true;
	// Checks if quarter/sectionID are not null
	if(quarter.length() == 0 || quarter === null || sectionID == null || sectionID.length() == 0){
		response.send("One or more categories have not been supplied. Please try again, bitch");
	}
	socsjs.findCourse(quarter, sectionID, timeout, byId).then(function(result) {
    	response.send(result);    // returns a Course
	}).catch(function(err) {
    	response.send(err, 'oops!');
	});
});





app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
