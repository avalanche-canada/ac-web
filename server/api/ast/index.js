var express = require('express');
var router = express.Router();
var ast  = require('./ast');
var _ = require('lodash');
var bodyParser = require('body-parser');

var debug = require('debug')('dev');

var jsonParser = bodyParser.json();

router.get('/providers', function (req, res) {
    var filters = req.query;
    debug('fetching providers with fiters:' +  JSON.stringify(filters));

    var success = function success(providerList){
        res.json(providerList);
    };

    var fail = function fail(err){
        console.log ('Error retrieving providers', err);
        res.send(500, {error: 'error retrieving providers '})
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
        console.log('Error retrieving provider with id' + provid ,  err);
        res.send(500, {error: 'error retrieving provider'})
    };

    ast.getProvider(provid, success, fail);
});

router.post('/providers', jsonParser, function (req, res) {

    var success = function success(details){
        res.json(details);
    };

    var fail = function fail(err){
        console.log('Error adding provider', req , err);
        res.send(500, {error: 'error adding provider'})
    };

    ast.addProvider(req.body, success, fail);
});

router.put('/providers/:provid', jsonParser, function (req, res) {

    var success = function success(details){
        res.json(details);
    };

    var fail = function fail(err){
        console.log('Error adding provider', req , err);
        res.send(500, {error: 'error adding provider'})
    };

    ast.updateProvider(req.params.provid, req.body, success, fail);
});

module.exports = router;
