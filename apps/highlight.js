var ucsd_courses = require('../modules/ucsd_courses.js');
var redis = require('../modules/redis.js');


function landing(req, res) {

	var classCode = req.query.class_code;
	var type = req.query.type;


	if(classCode && classCode.length > 0) {
		
		//clean up commas and shit
		classCode = classCode.replace(/[^a-zA-Z0-9]/g, '');


		ucsd_courses.getCourseData(classCode, function(err, courseObj) {

				if(err) {
					console.log(err);
					res.send(JSON.stringify(err));
				}
				else if(courseObj.err) {
					console.log(courseObj.err);
					res.send(JSON.stringift(err));
				}
				else {

					redis.incCourse(classCode);

					if(type == 'json') {
						res.send(JSON.stringify(courseObj));
					}
					else {
						res.render('popup-blank.html', courseObj);
					}
				}
		});


	}
}

module.exports = {
	landing: landing,
}
