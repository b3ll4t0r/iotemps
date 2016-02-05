'use strict';

var IndexModel = require('../models/index');
var wunderground = require('./wunder');
var nest = require('./nest').init('poop', 'pee');
var fs = require('fs');

module.exports.recordData = function() {
    wunderground.currentConditions('pws:KTXAUSTI186', function(weatherModel) {
        console.log('nesting');
        nest.getAllData(function(nestModel) {
            var dateString = new Date().toISOString();
            console.log(dateString);
            var timeIndex = dateString.indexOf("T");
            var date       = dateString.substr(0, timeIndex);
            console.log(date);
            var timeString = dateString.substr(timeIndex+1, 8).replace(":", "").replace(":", "");
            console.log(timeString);

            var record = new IndexModel(timeString, weatherModel, nestModel);
            fs.appendFile(process.env.HOME + '/.iotemps/' + date, JSON.stringify(record) + '\n', function(err) {
               if(err) {
                   console.log(err);
               } else {
                   console.log("data recorded");
               }
            });
            console.log("GOT HERE!!!");
        });
    });
};




/*

var fs = require("fs");

console.log("Going to write into existing file");
fs.writeFile('input.txt', 'Simply Easy Learning!',  function(err) {
    if (err) {
        return console.error(err);
    }
    console.log("Data written successfully!");
    console.log("Let's read newly written data");
    fs.readFile('input.txt', function (err, data) {
        if (err) {
            return console.error(err);
        }
        console.log("Asynchronous read: " + data.toString());
    });
});
*/
//tracks and graphs the indoor temprature and humidity from two Nests and the outdoor temprature.
