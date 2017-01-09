"use strict";
var express = require('express');
var ucsd_courses = require('./modules/ucsd_courses.js');
var redis = require('./modules/redis.js');
var mustacheExpress = require('mustache-express');
var socsjs = require('socsjs');

var calendarApp = require('./apps/calendar.js');
var prettyApp = require('./apps/pretty.js');
var highlightApp = require('./apps/highlight.js');
var notif = require('./apps/notif.js');


var app = express();

app.set('port', (process.env.PORT || 80));

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('view engine', 'mustache');
app.engine('html', mustacheExpress());
app.set('views', __dirname + '/views');
app.use(express.static('public'));



//Front Page
app.get('/', function(request, response) {
	response.send('aayyy');	
});


//#########   APPS    ###############

//Calendar App
//app.get('/apps/calendar/landing.html', calendarApp.landing);

//Pretty App
app.get('/apps/pretty/test.css', prettyApp.landing);

//app.get('/apps/highlight', highlightApp.landing);

//Course highlight app
app.get('/apps/courses', highlightApp.landing);

//Four Year Plan app

//app.get('/apps/fyp', fypApp.landing);

app.get('/notif', notif.handle);

//DAVID PUT YOUR STUFF HERE 
app.get('/socs', function(request, response){
	var term = request.query.term;
	var sch = request.query.class;
	var timeout = 5000;
	var byId = true;

	// Parsing through string for different classes
	var courses = sch.split(':');
	var course = [];
	for(var i = 0; i < courses.length; i++){
		course[i] = courses[i].split('.');
	}

	// Splitting classes for courseName/sectionID
	var courseName = [];
	var sectionID = [];
	for(var z = 0; z < course.length; z++){
		courseName[z] = course[z][0] + course[z][1];
		sectionID[z] = course[z][2];
	}
	
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
		// Finding all lectures and discussions and adding them
		socsjs.findCourses(term, courseName, timeout).then(function(result) {
				var tempC = [];
				for(var i = 0; i < result.length; i++){
					for(var j = 0; j < result[i].sections.length; j++){
						if(result[i].sections[j].type == "lecture"){
							tempC.push(result[i].sections[j]);
						}
						else if(result[i].sections[j].type == "discussion"){
							if(result[i].sections[j].sectionID == sectionID[i]){
								tempC.push(result[i].sections[j]);
							}
						}
						/*
						// Everything besides lectures and discussions
						else{
							tempC.push(result[i].sections[j]);
						}*/
						
					}
				}
				var classes = JSON.stringify(tempC);
				response.send(classes);	// returns a Course
			}).catch(function(err) {
				response.send(err, 'Course Name error!');
			});
	}
});





app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
