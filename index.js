"use strict";
var express = require('express');
var ucsd_courses = require('./modules/ucsd_courses.js');
var redis = require('./modules/redis.js');

var app = express();




app.set('port', (process.env.PORT || 80));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
	response.send('aayyy');
});


app.get('/pretty/test.css', function(req, res) {
	res.sendFile(__dirname + '/test.css');
});
app.get('/courses/', function(req, res) {
	
	redis.incCourse();

	
	var subjCode = req.query.subj_code;	
	var courseCode = req.query.course_code;
	var classCode = req.query.class_code;

	
	if(classCode && classCode.length > 0) {
		console.log('doing classCode');
		console.log('classCode before: ' + classCode);
		classCode = classCode.replace(/[^a-zA-Z0-9]/g, '');

		console.log('classCode after: ' + classCode);
		console.log(classCode);
		ucsd_courses.getCourseData(classCode, function(err, courseObj) {
			if(err) {
				console.log(err);
				res.send(JSON.stringify(err));
			}
			else {
				res.send(JSON.stringify(courseObj,null,'\t'));
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
