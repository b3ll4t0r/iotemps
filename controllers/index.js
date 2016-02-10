'use strict';

var dao = require('../lib/dao');

module.exports = function (router) {

    router.get('/', function (req, res) {
        res.render('index', {});
    });


    router.get('/writeData', function (req, res) {
        dao.recordData();
        res.send(200);
    });

};
