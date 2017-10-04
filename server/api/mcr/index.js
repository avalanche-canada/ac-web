'use strict';

var express = require('express');
var request = require('request');
var async   = require('async');

var cache   = require('./cache');
var logger  = require('../../logger');

var router = express.Router();

//TODO(wnh): put in a better place you idiot
var AC_MCR_HOST = process.env.AC_MCR_HOST; 
var AC_MCR_URL          = AC_MCR_HOST + '/sapi/public';
var IMAGE_PREFIX_USER   = AC_MCR_HOST + '/content/styles/guide_view_guide_picture/public/';
var IMAGE_PREFIX_REPORT = AC_MCR_HOST + '/content/';

router.get('/', function(req, res) {
    return getNodeList(function (err, nodes){
        if(err){
            return _error(res,err);
        }
        async.map(nodes, getReportAndUser, function(err, reports){
            if(err){
                return _error(res,err);
            }
            return res
                    .status(200)
                    .json(reports)
                    .end();
        });
    });
});

function _error(res, err) {
    res.status(500).json({msg: err}).end()
}

function getReportAndUser(node, cb){
    return async.parallel({
        report: function(_cb) {return getReport(node.nid, _cb);},
        user:   function(_cb) {return getUser(node.uid, _cb);}
    }, cb);
}

function getNodeList(cb) {
    logger.debug('MCR - getNodeList(report_type=5)')
    return request({url: AC_MCR_URL + '/node.json', qs: {report_type: 5}}, function(err, resp, body){
        if (err) {cb(err);}
        logger.debug('MCR - getNodeList(report_type=5) - return ' + resp.statusCode);

        var body_5 = JSON.parse(body);

        logger.debug('MCR - getNodeList(report_type=3)')
        return request({url: AC_MCR_URL + '/node.json', qs: {report_type: 5}}, function(err, resp, body){
            if (err) {cb(err);}
            logger.debug('MCR - getNodeList(report_type=3) - return ' + resp.statusCode);
            var body_3 = JSON.parse(body);
            var list = body_5.concat(body_3);
            list = list.sort(function(node) { return Number.parseInt(node.updated); });
            logger.debug('MCR - getNodeList() -> ' + list.length + ' nodes');
            cb(null, list);
        });
    });
}


function getReport(node_id, cb) {
    logger.debug('MCR - getReport(node_id='+node_id+', cb)');
    return request({
        url: AC_MCR_URL + '/node/' + node_id + '.json', 
        qs: {report_type: 5}}, 
        function(err, resp, body){
            if(err) {
                cb(err);
            }
            logger.debug('MCR - getReport(node_id='+node_id+', cb) -> ' + resp.statusCode);
            cb(null, JSON.parse(body));
        }
    );
}

function getUser(user_id, cb) {
    logger.debug('MCR - getUser(user_id='+user_id+', cb)');
    return request(AC_MCR_URL + '/user/' + user_id + '.json', function(err, resp, body){
        if(err) {
            cb(err);
        }
        logger.debug('MCR - getUser(user_id='+user_id+', cb)');
        cb(null, JSON.parse(body));
    });
}

module.exports = router;
