'use strict';

var DataModel = require('../models/data');
var config = require('../config');
var wunderground = require('./wunder');
var nest = require('../lib/nest').init(config.nestUser, config.nestPass);
var fs = require('fs');

module.exports.recordData = function() {
    wunderground.currentConditions('pws:KDEWILMI63', function(weatherModel) {
        nest.getAllData(function(nestModel) {
            var now = new Date();
            var dateString = now.getFullYear() + "-" + (now.getMonth() +1) + "-" + now.getDate();
            var timeString = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

            var record = new DataModel(timeString, weatherModel, nestModel);
            fs.appendFile(process.env.HOME + '/.iotemps/' + dateString, JSON.stringify(record) + '\n', function(err) {
               if(err) {
                   console.log(err);
               } else {
                   console.log("data recorded");
                   return record;
               }
            });
        });
    });
};
