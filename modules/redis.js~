
var client = require('redis').createClient(process.env.REDIS_URL);

client.on('error', function(err) {
	console.log(err);
});



function incCourse(course, callback) {

	client.hincrby('course_count', course, 1, callback);
}


module.exports = {
	incCourse: incCourse,
}

