var express = require('express');
var router = express.Router();
var ast  = require('./ast');
var _ = require('lodash');

var debug = require('debug')('dev');

router.get('/providers', function (req, res) {
    var filters = req.query;
    debug('fetching providers with fiters:' +  JSON.stringify(filters));

    var success = function success(providerList){
        res.json(providerList);
    };

    var fail = function fail(err){
        debug('Error retrieving providers' + err);
        res.send(500, {error: 'error retreiving providers'})
    };

    ast.getProviderList(filters, success, fail);
});


router.get('/providers/:provid', function (req, res) {
    var provid = req.params.provid;
    debug('fetching provider with id:' + provid);

    var success = function success(providerList){
        res.json(providerList);
    };

    var fail = function fail(err){
        debug('Error retrieving provider' + err + 'with id' + provid);
        res.send(500, {error: 'error retrieving providers'})
    };

    ast.getProvider(provid, success, fail);
});

module.exports = router;
