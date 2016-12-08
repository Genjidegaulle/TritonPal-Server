
var express = require('express');
var ucsd_courses = require('./modules/ucsd_courses.js');

var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
	response.send('aayyy');
});

app.get('/courses/', function(req, res) {
	
	var subjCode = req.query.subj_code;	
	var courseCode = req.query.course_code;
	
  ucsd_courses.getCourseData(subCode+' '+courseCode, function(err, courseObj) {
    if(err) {
      console.log(err);
    }
		else {
			res.send(JSON.stringify(courseObj,null,'\t'));
		}

	});
  

});



app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
