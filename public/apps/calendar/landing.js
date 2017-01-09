// Your Client ID can be retrieved from your project in the Google
// Developer Console, https://console.developers.google.com

alert("OMG YASSS");

// Sending to scraper w/ GET request
var currUrl = window.location.href;
var splitUrl = currUrl.split('?');
var fullUrl = "https://tritonpal.herokuapp.com/socs?" + splitUrl[1];
var scraped_courses = null;

function httpGet(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);

  } else if (typeof XDomainRequest != "undefined") {
    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);

  } else {

    // Otherwise, CORS is not supported by the browser.
    xhr = null;
  }
  return xhr;
}
var response = httpGet('GET', fullUrl);
if (!response) {
  throw new Error('CORS not supported');
}

response.onload = function() {
 scraped_courses = response.responseText;
 // process the response.
};

response.onerror = function() {
  console.log('There was an error!');
};

response.send();

var CLIENT_ID = '947982621174-q3jjim3laa960bh41qpmcghhbjqcufu0.apps.googleusercontent.com';
var SCOPES = ["https://www.googleapis.com/auth/calendar"];
// var scraped_courses = JSON.parse('[{"name":"COGS 107B","sections":[{"type":"discussion","sectionID":"901004","section":"B06","days":"F","time":"12:00p-12:50p","location":"CSB 005","teacher":"Nitz, Douglas A.","openSeats":0,"seatLimit":51,"waitlistSize":0,"isEnrollable":true}]},{"name":"COGS 101B","sections":[{"type":"discussion","sectionID":"890858","section":"A01","days":"M","time":"9:00a-9:50a","location":"CSB 004","teacher":"Barrera, Steven James","openSeats":0,"seatLimit":56,"waitlistSize":6,"isEnrollable":true}]}]');

//For startDate
var SYEAR = new Date().getFullYear();
var SDAY = [22, 9, 3, 3, 7];
var SMONTH = [9, 1, 4, 7, 8];

/**
 * Check if current user has authorized this application.
 */
function checkAuth() {
	console.log('in check Auth');
	gapi.auth.authorize(
			{
			'client_id': CLIENT_ID,
			'scope': SCOPES.join(' '),
			'immediate': true
			}, handleAuthResult);
}

/**
 * Handle response from authorization server.
 *
 * @param {Object} authResult Authorization result.
 */
function handleAuthResult(authResult) {
	console.log('handling authresult');
	var authorizeDiv = document.getElementById('authorize-div');
	if (authResult && !authResult.error) {
		// Hide auth UI, then load client library.
		authorizeDiv.style.display = 'none';
		loadCalendarApi();
	} else {
		// Show auth UI, allowing the user to initiate authorization by
		// clicking authorize button.
		authorizeDiv.style.display = 'inline';
	}
}

/**
 * Initiate auth flow in response to user clicking authorize button.
 *
 * @param {Event} event Button click event.
 */
function handleAuthClick(event) {
	gapi.auth.authorize(
			{client_id: CLIENT_ID, scope: SCOPES, immediate: false},
			handleAuthResult);
	return false;
}

/**
 * Load Google Calendar client library. List upcoming events
 * once client library is loaded.
 */
function loadCalendarApi() {
	console.log('before gapi.client.load');
	gapi.client.load('calendar', 'v3', listCalendars);
}

function listCalendars() {
	console.log('before req');
	var request = gapi.client.calendar.calendarList.list();
	console.log('before exec');
	request.execute(function(resp) {
			console.log('ayyy');
			appendPre('results:\n');
			for(var i = 0; i < resp.items.length; i++)
			appendPre(resp.items[i].summary + '\n');
			});
}
/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function listUpcomingEvents() {
	var request = gapi.client.calendar.events.list({
			'calendarId': 'primary',
			'timeMin': (new Date()).toISOString(),
			'showDeleted': false,
			'singleEvents': true,
			'maxResults': 10,
			'orderBy': 'startTime'
			});

	request.execute(function(resp) {
			var events = resp.items;
			appendPre('Upcoming events:');

			if (events.length > 0) {
			for (i = 0; i < events.length; i++) {
			var event = events[i];
			var when = event.start.dateTime;
			if (!when) {
			when = event.start.date;
			}
			appendPre(event.summary + ' (' + when + ')')
				}
				} else {
				appendPre('No upcoming events found.');
				}

				});
			}

			/**
			 * Append a pre element to the body containing the given message
			 * as its text node.
			 *
			 * @param {string} message Text to be placed in pre element.
			 */
function appendPre(message) {
	var pre = document.getElementById('output');
	var textContent = document.createTextNode(message + '\n');
	pre.appendChild(textContent);
}

//COMMENT WHERE I AM WORKING FOR ALEX
/**
 * Test adding an event
 */
function addEvent() {
	alert("omg");
	//Load in json
	jsonderulo = scraped_courses;

	/** VARIABLE CITY **/
	//To fix startDate
	var startDate;
	var offset;

	//To fix "MWF" formatting
	var days;

	//To get start/end times
	var startTime, endTime, times;

	//For recurrence
	var recurrence;

	//Create event for each class
	for (var i = 0; i < jsonderulo.length; i++){
		offset = 0;
		recurrence = 10;

		//Set offset and fix "MWF" formatting
		switch (jsonderulo[i].sections[0].days) {
			case "MWF":
				days = "MO,WE,FR";
				recurrence = 30;
				break;
			case "TuTh":
				days = "TU,TH";
				recurrence = 20;
				offset = 1;
				break;
			case "M":
				days = "MO";
				break;
			case "Tu":
				days = "TU";
				offset = 1;
				break;
			case "W":
				days = "WE";
				offset = 2;
				break;
			case "Th":
				days = "TH";
				offset = 3;
				break;
			case "F":
				days = "FR";
				offset = 4;
				break;
			default:
				console.log("ERROR IN DATE");
				//TODO: Handle later?
		}
		//TODO: Array index subject to change
		startDate = SYEAR + "-" + SMONTH[1] + "-" + (SDAY[1] + offset);
		console.log("THE START DATE FOR " + jsonderulo[i].name + " IS " + jsonderulo[i].sections[0].days + " w OFFSET " + offset);

		//Get Start and end time
		times = jsonderulo[i].sections[0].time.split(/[ap-]+/);
		startTime = times[0];
		endTime = times[1];

		//create event
		var exevent = {
			"summary": jsonderulo[i].name,
			"start": {
				"dateTime": startDate + "T" + startTime + ":00",
				"timeZone": "America/Los_Angeles"
			},
			"end": {
				"dateTime": startDate + "T" + endTime + ":00",
				//"dateTime": "2016-12-27T09:00:00-08:00",
				"timeZone": "America/Los_Angeles"
			},
			"recurrence": [
				"RRULE:FREQ=WEEKLY;COUNT=" + recurrence + ";BYDAY=" + days,
			]
		}
		console.log("THE DAYS ARE " + days);
		console.log(exevent);
		//Copied from Google's API
		var request = gapi.client.calendar.events.insert({
				'calendarId': 'primary',
				'resource': exevent
				});

		request.execute(function(exevent) {
				appendPre('Event created: ' + event.htmlLink);
				});
	}
}

