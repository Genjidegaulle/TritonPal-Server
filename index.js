"use strict";
var express = require('express');
var ucsd_courses = require('./modules/ucsd_courses.js');
var redis = require('./modules/redis.js');

var app = express();




app.set('port', (process.env.PORT || 80));

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');



//Front Page
app.get('/', function(request, response) {
	response.send('aayyy');
});


//#########   APPS    ###############

//Calendar App


app.get('/apps/calendar/landing.html', function(req, res) {

	if(!req.query.courses) {
		console.log('oh no');
		return;
	}
	var courseIds = req.query.courses.split('.');
	
	res.send('ayyy still working on this mate');
});


//Pretty App
app.get('/apps/pretty/test.css', function(req, res) {
	res.sendFile(__dirname + '/test.css');
});


//Course highlight app
app.get('/apps/courses', function(req, res) {
	

	
	var subjCode = req.query.subj_code;	
	var courseCode = req.query.course_code;
	var classCode = req.query.class_code;

	
	if(classCode && classCode.length > 0) {

		classCode = classCode.replace(/[^a-zA-Z0-9]/g, '');
		redis.incCourse(classCode);

		ucsd_courses.getCourseData(classCode, function(err, courseObj) {
			if(err) {
				console.log(err);
				res.send(JSON.stringify(err));
			}
			else {
				res.send(JSON.stringify(courseObj));
			}

		});
	}

	else if(typeof subjCode === 'undefined' || subjCode === null || subjCode.length < 1||
		typeof courseCode === 'undefined' || courseCode === null || courseCode.length < 1) {
		
		console.log('ruh roh');
		res.send(JSON.stringify( 
			{err: {message: 'subj_code and course_code both must be defined for this api'}}));
		return;
	}

  else {
		
		ucsd_courses.getCourseData(subjCode+' '+courseCode, function(err, courseObj) {
			if(err) {
				console.log(err);
			}
			else {
				res.send(JSON.stringify(courseObj,null,'\t'));
			}

		});
	}
  

});



app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
