'use strict';

var http = require('http'),
    config = require('../config');

//NOTE: I can make calls every 5 minutes.  My license key allows for 500 calls per day, 10 per minute.
var obj = {};
module.exports = obj;

obj.currentConditions = function(query, callback) {
    // http://api.wunderground.com/api/48297eecb4712b03/conditions/q/pws:KTXAUSTI186.json
    // NOTE: the hostname must not start with the protocol nor end in /
    // NOTE: The path must start with /
    // Here are the http request options for the Weather Underground request.
    var currentConditionsOptions = {
        hostname:'api.wunderground.com',
        port:80,
        path:'/api/' + config.wunderkey + '/conditions/q/' + query + '.json',
        method:'GET'
    };

    console.log("Wunder current conditions request option data: " + JSON.stringify(currentConditionsOptions));

    //This is meant to hold the body of the response as it comes across in chunks.
    var wunderResponseText = '';

    //Let's create the Weather Underground request.
    var wunderRequest = http.request(currentConditionsOptions, function (wunderResponse) {
        console.log("Wunder response code: " + wunderResponse.statusCode);
        console.log('Wunder response headers: ' + JSON.stringify(wunderResponse.headers));

        //Ensure that we are using the correct encoding of the responding service.
        wunderResponse.setEncoding('utf8');

        //'data' events come in as data comes back from the server, so there can be more than one...
        wunderResponse.on('data', function (chunk) {
            //The response is chunked into bits so we need to grab each one and append it to the fullBody.
            wunderResponseText = wunderResponseText + chunk;
        });
        wunderResponse.on('error', function (chunk) {
            console.log("Wunder response code: " + wunderResponse.statusCode);
            console.log('Wunder response headers: ' + JSON.stringify(wunderResponse.headers));
            console.log('There was an error in the response: ' + wunderResponse.error);
        });
        wunderResponse.on('end', function () {
            //No chunks come in at this point, they are all done, so the end event gets broadcast.

            //Log the data we are going to render
            //console.log(wunderResponseText);
            //Even though the response data is in the JSON format it's still a String.  Therefore, it still
            // needs to be parsed into variable.
            var weatherData = JSON.parse(wunderResponseText);
            //Alright, we have our data, let's dump it out to the screen now.
            console.log("returning model.");
            callback({
                wunder: weatherData
            });
        });
    });
    //Add the 'error' event so we can capture any errors and record them.
    wunderRequest.on('error', function (error) {
        console.log("Error in Wunder request: " + error);
    });
    //We need to end the request so Node knows that we are done writing to it and executes it.
    wunderRequest.end();
};