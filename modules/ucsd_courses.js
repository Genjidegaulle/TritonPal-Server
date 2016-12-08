"use strict";

var cheerio = require('cheerio');
var request = require('request');
var htmlFile = require('./getHtml.js');
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

  if(courseStr.indexOf(' ') > 0) {
	  retObj.subj_code = courseStr.split(' ')[0].toUpperCase();
	  retObj.course_code = courseStr.split(' ')[1].toUpperCase();
	  retObj.html_id = retObj.subj_code.toLowerCase() + retObj.course_code.toLowerCase();
	  return retObj;
  }
  else {
    
    for(var i = 0; i < courseStr.length; i++) {
      if(Number.isInteger(courseStr[i])) {
        retObj.subj_code = courseStr.substring(0, i);
        retObj.course_code = courseStr.substring(i, courseStr.length);
	      retObj.html_id = retObj.subj_code.toLowerCase() + retObj.course_code.toLowerCase();
        return retObj;
      }
    }

    throw "GAAAHHHI HATE ERRORS";
  }

}

function getCourseName(htmlTitle){
	//EG "ECE 35. Introductory to Analog Electronics. (4)"

	//Starts after Course Code. 
	var begIndex = htmlTitle.search(/\./) + 1 +1;

	var lastIndex = htmlTitle.search(/\(/);

	return htmlTitle.substring(begIndex, lastIndex);
}

function getClassCode(htmlTitle){
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

	if(htmlBody.includes('Prerequisites:')) {

		var begIndex = htmlBody.search(/Prerequisites:/) + 'Prerequisites:'.length +1;
		var lastIndex = htmlBody.length;
		return htmlBody.substring(begIndex, lastIndex);
	}
	else {
		return '';
	}
}

function getHtmlFile(subjCode) {
	return htmlFile.getHtmlFile(subjCode);
}


function getCourseData( courseString, callback) { 
	
	var courseObj = parseCourse(courseString);
	var courseData = {};
	
	var htmlFile = getHtmlFile(courseObj.subj_code);

	request('http://ucsd.edu/catalog/courses/' + htmlFile,  function(err, resp, body){
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
      throw "GAAHHHH";
		}

		var htmlTitle = $('#' + courseObj.html_id).next().text();
		var htmlBody = $('#' + courseObj.html_id).next().next().text();

		courseData.course_name = getCourseName(htmlTitle);
		courseData.class_code = getClassCode(htmlTitle);
		courseData.num_units = getNumUnits(htmlTitle);

		courseData.description = getDescription(htmlBody);
		courseData.prereqs = getPreReqs(htmlBody);

		callback(null, courseData);


	});
}



module.exports = {
	
	getCourseData : getCourseData,
}
