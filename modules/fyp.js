var request = require('request');

function getSearchControls(callback) {
	var queryUrl = 'http://plans.ucsd.edu/controller.php?action=LoadSearchControls';

	request(queryUrl, function(err, resp, body) {
		if(err) {
			callback(err);
		}
		else {
			callback(null, body);
		}
	});
}

function getMajors(year, college, department, callback) {
	
	//needs at least 1
	if(!year && !college && !deparment) {
		callback(true);
	}

	var queryUrl = 'http://plans.ucsd.edu/controller.php?action=LoadMajors';

	if(year) 
		queryUrl += '&year=' + year;
	if(college)
		queryUrl += '&college='+college;
	if(deparment)
		queryUrl += '&department=' + department;
	
	request(queryUrl, function(err, resp, body) {
		if(err) {
			callback(err);
		}
		else {
			callback(null, body);
		}
	});
}

function getPlan(college, year, major, callback) {
	
	//Needs all params
	if(!college || !year || !major) {
		callback(true);
	var queryUrl = 'http://plans.ucsd.edu/controller.php?action=LoadPlans';
	
	queryUrl += '&college='+college;
	queryUrl += '&year='&year;
	queryUrl += '&major='+major;

	request(queryUrl, function(err, resp, body) {
		if(err) {
			callback(err);
		}
		else {
			callback(null, body);
		}
	});
}
}

module.exports = {
	getSearchControls: getSearchControls,
	getMajors: getMajors,
	getPlan: getPlan,
}
