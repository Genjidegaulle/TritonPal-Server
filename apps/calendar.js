

function landing(req, res) {

	if(!req.query.courses) {
		console.log('oh no');
		return;
	}

	console.log(req.query);
	var courseIds = req.query.courses.split('.');
	
	//res.send('ayyy still working on this mate');
	res.render('test.html', {courses:courseIds, clientID: process.env.GCAL_CLIENTID});

	
}

module.exports = {
	landing: landing,
	
}
