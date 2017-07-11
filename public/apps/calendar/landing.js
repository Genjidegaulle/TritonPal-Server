// Your Client ID can be retrieved from your project in the Google
// Developer Console, https://console.developers.google.com

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
 scraped_courses = JSON.parse(response.responseText);
 // process the response.
};

response.onerror = function() {
};

response.send();

var CLIENT_ID = '947982621174-q3jjim3laa960bh41qpmcghhbjqcufu0.apps.googleusercontent.com';
var SCOPES = ["https://www.googleapis.com/auth/calendar"];

//For startDate
var SYEAR = new Date().getFullYear();
var SMONTH = [7, 8, 9, 1, 3];
var SDAY = [3, 7, 28, 8, 30];

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
    done.style.display = 'inline';
		loadCalendarApi();
	} else {
		// Show auth UI, allowing the user to initiate authorization by
		// clicking authorize button.
		authorizeDiv.style.display = 'inline';
    done.stye.display = 'none';
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


function listCalendars() {
		console.log('before req');
		var request = gapi.client.calendar.calendarList.list({maxResults:3, minAccessRole:'writer'});
		console.log('before exec');

		var user_calendars_div = document.getElementById('user_calendars');

		request.execute(function(resp) {
			for(var i = 0; i < resp.items.length; i++) {
 				console.log(resp.items[i].summary + '\n');

				var li_container = document.createElement('li');
				var label = document.createElement('label');
				var input = document.createElement('input');
				var check = document.createElement('div');

				check.className += ' check';

				label.htmlFor = i + '-option';
				label.innerText = resp.items[i].summary;

				input.type = 'radio';
				input.id = i+'-option';
				input.name='selector';

				li_container.appendChild(input);
				li_container.appendChild(label);
				li_container.appendChild(check);

				user_calendars_div.appendChild(li_container);
			}
			});
}

/**
 * Load Google Calendar client library. List upcoming events
 * once client library is loaded.
 */
function loadCalendarApi() {
	console.log('before gapi.client.load');
	gapi.client.load('calendar', 'v3', listCalendars);
}


function showClasses(){
  var classes = [];
  for(var q = 0; q < scraped_courses.length; q++){
  classes.push(scraped_courses[q].name);
  }
  alert("These are your classes: " + classes);
}

/**
 * Test adding an event
 */
function addEvent() {
	//Load in json
	jsonderulo = scraped_courses;

  // Checking for errors
  if(jsonderulo == null){
    alert("You do not have any classes. Please enter at least one class to add to your calendar.");
  }
	/** VARIABLE CITY **/
	//To fix startDate
	var startDate;
	var offset;

	//To fix "MWF" formatting
	var days;

  //Specify class type
  var classtype;

	//To get start/end times
	var startTime, endTime, times;

	//For recurrence
	var recurrence;


	//Create event for each class
	for (var i = 0; i < jsonderulo.length; i++){
    for (var k = 0; k < jsonderulo[i].sections.length; k++){



        var response = window.location.href;
        console.log(response);
        var quarterLen = "https://tritonpal.herokuapp.com/apps/calendar/landing.html?term=".length;
        var quarter = response.substring(quarterLen, quarterLen + 2);

        console.log(quarter);
        var curr;

        if( quarter == "S1"){
          curr = 0;
        }
        else if( quarter == "S2"){
          curr = 1;
        }
        else if( quarter == "FA"){
          curr = 2;
        }
        else if( quarter == "WI"){
          curr = 3;
        }
        else if( quarter == "SP"){
          curr = 4;
        }


  		offset = 0;
  		recurrence = 10;
        /* NOTE: Summer session is 5 weeks long */
  		//Set offset and fix "MWF" formatting
  		switch (jsonderulo[i].sections[k].days) {
  			case "MWF":
  				days = "MO,WE,FR";
                // Summer Session classes are shorter
                if( curr === 0 || curr == 1){
                    recurrence = 15;
                }
                else if ( curr == 2 ) {   // Fall classes start on Thursday
                    recurrence = 31;
                }
                else {
  				          recurrence = 30;
                }

                // When fall begins on a Thursday
                if (curr == 2) {
                    offset = 1;
                }


  				break;
  			case "TuTh":
  				days = "TU,TH";
                // Summer Session classes are shorter
                if( curr === 0 || curr == 1){
                    recurrence = 10;
                }
                else if ( curr == 2 ) {   // Fall classes start on Thursday
                    recurrence = 21;
                }
                else {
  				           recurrence = 20;
                }
                offset = 1;

                // When fall begins on a Thursday
                if (curr == 2){
                    offset = 0;
                }


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
          if (curr == 2)  // Fall
            offset = 0;
          }
  				break;
  			case "F":
  				days = "FR";
  				offset = 4;
          if (curr == 2)  // Fall
            offset = 1;
          }

  				break;
  			default:
  				console.log("ERROR IN DATE");
  				//TODO: Handle later?
  		}

      // Append correct class type onto name
      var type = jsonderulo[i].sections[k].type;
      if (type == "discussion"){
        classtype = " (DI)";
      }
      else if (type == "lecture") {
        classtype = " (LE)";
      }
      else if (type == "lab") {
        classtype = "(LA)";
      }
      else if (type == "studio") {
        classtype = " (ST)";
      }
      else if (type == "seminar") {
        classtype = " (SE)";
      }
      else if (type == "independentStudy"){
        classtype = " (IN)";
      }
      else {
        classtype = "";
      }

  		//TODO: Array index subject to change

      // Get correct quarter
      // 0 = SS1, 1 = SS2, 2 = Fall, 3 = Winter, 4 = Spring




      console.log("The current month start is " + SMONTH[curr] + "/" + SDAY[curr] + "because its " + quarter + 'and curr is ' + curr);
      console.log("The next month is " + SMONTH[curr + 1]);

  		startDate = SYEAR + "-" + SMONTH[curr] + "-" + (SDAY[curr] + offset);
  		console.log("THE START DATE FOR " + jsonderulo[i].name + " IS " + jsonderulo[i].sections[k].days + " w OFFSET " + offset);

  		//Get Start and end time
  		times = jsonderulo[i].sections[k].time.split(/[-]+/);
      console.log("THE 2 TIMES ARE " + jsonderulo[i].sections[k].time);
      console.log("OR " + times[0] + " " + times[1]);

  	    //START TIME
  	    for(var j = 0; j < 2; j++){
  	      //AM
  	      if(times[j].match(/[a]+/)){
            //Simply remove "a"
  	        times[j] = times[j].substring(0, times[j].length - 1);
  	      }
  	      //PM
  	      else{
            //Remove "p"
            times[j] = times[j].substring(0, times[j].length - 1);

            //Convert to 24HR format
            var hhMM = times[j].split(":");
  	        times[j] = ((parseInt(hhMM[0]) % 12) + 12) + ":" + hhMM[1];
  	      }
  	    }

  	    startTime = times[0];
  	    endTime = times[1];
        console.log("THE START TIME IS " + startTime);
  		//create event
  		var exevent = {
  			"summary": jsonderulo[i].name + classtype,
  			"start": {
  				"dateTime": startDate + "T" + startTime + ":00",
  				"timeZone": "America/Los_Angeles"
  			},
  			"end": {
  				"dateTime": startDate + "T" + endTime + ":00",
  				//"dateTime": "2016-12-27T09:00:00-08:00",
  				"timeZone": "America/Los_Angeles"
  			},
        "location" : jsonderulo[i].sections[k].location,
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
			});
  	}
  }
  alert("Your classes have been successfully added!");
}
