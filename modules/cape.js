var request = require ("request");
var cheerio = require ("cheerio");
var BASE_URL = 'https://cape.ucsd.edu/responses/Results.aspx?Name=&CourseNumber=';

function getCapeData (course, callback) {
	
	request ({
		url:
		BASE_URL + course, 
		headers: {
			'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.109 Safari/537.36'
		}},
		function (error, response, body) {
			
			var $ = cheerio.load (body);
			var result;







			if (//error) {
				callback (true, result);
				return;
			}

			callback (null, result);
	});
}

// what other files can access from cape.js
module.exports = {
	getCapeData:getCapeData
}
