"use strict";

var cheerio = require('cheerio');
var request = require('request');
/*
{
	course_name : "Introduction to Analog Design",
	course_code : "ECE 35",
	num_units 	: 4,
	prereqs		: "Math 20A-B and Phys 2A",
	description : "Fundamental circuit theory concepts, Kirchoff’s voltage and current laws, Thevenin’s and Norton’s theorems, loop and node analysis, time-varying signals, transient first order circuits, steady-state sinusoidal response. Math 20C and Phys 2B must be taken concurrently. Program or material fee may apply."

}
*/
function parseCourse(courseStr){
	var retObj = {};
	retObj.dep = courseStr.split(' ')[0].toUpperCase();
	retObj.course_num = courseStr.split(' ')[1].toUpperCase();
	retObj.html_id = retObj.dep.toLowerCase() + retObj.course_num.toLowerCase();
	return retObj;
}

function getCourseName(htmlTitle){
	//EG "ECE 35. Introductory to Analog Electronics. (4)"

	//Starts after Course Code. 
	var begIndex = htmlTitle.search(/\./) + 1 +1;

	var lastIndex = htmlTitle.search(/\(/);

	return htmlTitle.substring(begIndex, lastIndex);
}

function getCourseCode(htmlTitle){
	var begIndex = 0;
	var lastIndex = htmlTitle.search(/\./);

	return htmlTitle.substring(begIndex, lastIndex);
}

function getNumUnits(htmlTitle){
	var begIndex = htmlTitle.search(/\(/) + 1;
	var lastIndex = htmlTitle.search(/\)/);

	return htmlTitle.substring(begIndex, lastIndex);
}

function getDescription(htmlBody){
	var begIndex = 0;
	var lastIndex = htmlBody.search(/Prerequisites:/);

	return htmlBody.substring(begIndex, lastIndex);
}

function getPreReqs(htmlBody){
	var begIndex = htmlBody.search(/Prerequisites:/) + 'Prerequisites:'.length +1;
	var lastIndex = htmlBody.length;

	return htmlBody.substring(begIndex, lastIndex);
}

function getCourseData( courseString, callback) { 
	
	var courseObj = parseCourse(courseString);
	var courseData = {};

	request('http://ucsd.edu/catalog/courses/' + courseObj.dep + '.html', function(err, resp, body){
		if(err){
			console.log('request error');
			console.log(err);
			callback(err);
			return;
		}

		var $ = cheerio.load(body);

		console.log(courseObj);


		if($('#' + courseObj.html_id).attr('name') !== courseObj.html_id){	
			console.log('some errors');
		}

		var htmlTitle = $('#' + courseObj.html_id).next().text();
		var htmlBody = $('#' + courseObj.html_id).next().next().text();

		courseData.course_name = getCourseName(htmlTitle);
		courseData.course_code = getCourseCode(htmlTitle);
		courseData.num_units = getNumUnits(htmlTitle);

		courseData.description = getDescription(htmlBody);
		courseData.prereqs = getPreReqs(htmlBody);

		callback(null, courseData);


	});
}



module.exports = {
	
	getCourseData : getCourseData,
}
