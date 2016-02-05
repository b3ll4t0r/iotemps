'use strict';

var http = require('http');

var IndexModel = require('../models/index');
var wunderground = require('../lib/wunder');
var nest = require('../lib/nest').init('poop', 'pee');
var dao = require('../lib/dao');


module.exports = function (router) {

    router.get('/', function (req, res) {
        wunderground.currentConditions('pws:KTXAUSTI186', function(weatherModel) {
            console.log('nesting');
            nest.getAllData(function(nestModel) {
                var model = new IndexModel(weatherModel, nestModel);
                res.render('index', model);
            });
        });
    });


    router.get('/test', function (req, res) {
        dao.recordData();
        res.send(200);
    });

};
