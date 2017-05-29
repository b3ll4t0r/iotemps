'use strict';

var fs = require('fs');
var IndexModel = require('../models/index');

module.exports = function (router) {

    router.get('/', function (req, res) {
        var now = new Date();
        var dateString = now.getFullYear() + "-" + (now.getMonth() +1) + "-" + now.getDate();
        var model = new IndexModel(dateString);
        model.data = fs.readFileSync(process.env.HOME + '/.iotemps/' + dateString).toString().split("\n");
        console.log("found " + model.data.length + " records.");
        res.render('index', model);
    });
};
