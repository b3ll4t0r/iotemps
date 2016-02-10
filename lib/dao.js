'use strict';

var IndexModel = require('../models/index');
var wunderground = require('./wunder');
var nest = require('../lib/nest').init('poop', 'pee');
var fs = require('fs');

module.exports.recordData = function() {
    wunderground.currentConditions('pws:KTXAUSTI186', function(weatherModel) {
        console.log('nesting');
        nest.getAllData(function(nestModel) {
            var now = new Date();
            var dateString = now.getFullYear() + "-" + (now.getMonth() +1) + "-" + now.getDate();
            var timeString = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

            var record = new IndexModel(timeString, weatherModel, nestModel);
            fs.appendFile(process.env.HOME + '/.iotemps/' + dateString, JSON.stringify(record) + '\n', function(err) {
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