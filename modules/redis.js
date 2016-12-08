



var client = require('redis').createClient(process.env.REDIS_URL);

client.on('error', function(err) {
	console.log(err);
});


function setCourseCount() {
	client.set('course_count', 0, function(err, reply) {
		if(err) {
			console.log(err);
		}
		else {
			console.log(reply);
			console.log('course count at 0');
		}
	});

}

function incCourse() {
	client.incr('course_count', function(err, reply) {
		console.log(reply);
		console.log('course count incremented');
	});
}

setCourseCount();

module.exports = {
	incCourse: incCourse,
}

