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

//Four Year PLan app

//app.get('/apps/fyp', fypApp.landing);


//DAVID PUT YOUR STUFF HERE 
app.get('/socs', function(request, response){
	var term = request.query.term;
	var sectionID = request.query.sectionID;
	var courseName = request.query.courseName;
	var timeout = 5000;
	var byId = true;
	// Checks if term are not undefined, null or have incorrect lengths
	if(typeof term === 'undefined'|| term == null || term.length != 4){
		response.send("No/Incorrect term!");
	}
	else{
		// Section ID && Course Name not there
		if(typeof sectionID === 'undefined' && typeof courseName === 'undefined') {
			response.send("Not enough information is given to find a course. Please include either the source ID, the course name or both.");
		}
		else if((typeof sectionID === 'undefined' || sectionID == null)
		    && (typeof courseName != 'undefined' && courseName != null)){
			byId = false;
		}
		// Using Section ID
		if(byId){
			socsjs.findCourse(term, sectionID, timeout, byId).then(function(result) {
    			response.send(result);    // returns a Course
			}).catch(function(err) {
    			response.send(err, 'Section ID error!');
			});
		}
		// Using Course Name
		else{
			socsjs.findCourse(term, courseName, timeout).then(function(result) {
				response.send(result);	  // returns a Course
			}).catch(function(err) {
				response.send(err, 'Course Name error!');
			});
		}
	}
});





app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
