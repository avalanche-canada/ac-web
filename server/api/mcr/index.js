'use strict';

var express = require('express');
var request = require('request');
var async   = require('async');

var logger     = require('../../logger');
var cache      = require('./cache');
var mcr_format = require('./format');

var router = express.Router();

var AC_MCR_HOST = process.env.AC_MCR_HOST; 
var AC_MCR_URL          = AC_MCR_HOST + '/sapi/public';

router.get('/', function(req, res) {
    //TODO(wnh): Clean this up a bit 
    cache.wrap('mcr/format_list', function(cb) {
        return getNodeList(function (err, nodes){
            async.map(nodes, getReportAndUser, function(err, reports){
                if(err){
                    return cb(err)
                }
                var fmt_reports = reports.map(function(ru){
                    return mcr_format.formatReportFull(ru.report, ru.user);
                });
                cb(null, fmt_reports);
            });
        });
    } , function(err, data){
            if(err){
                return _error(res,err);
            }
            return res
                    .status(200)
                    .json(data)
                    .end();
    });
});

router.get('/:report_id', function(req, res) {
    var report_id = Number.parseInt(req.params.report_id);
    return getReport(report_id, function(err, report){
        if(err){
            return _error(res,err);
        }
        return getUser(report.uid, function(err, user){
            if(err){
                return _error(res,err);
            }
            return res
                    .status(200)
                    .json(mcr_format.formatReportFull(report, user))
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
    var cache_key = 'mcr/node_list';
    return cache.wrap(cache_key, function(_cb){
        return __getNodeList(_cb);
    },cb);
}

function __getNodeList(cb) {
    logger.debug('MCR::getNodeList(report_type=5)')
    return request({url: AC_MCR_URL + '/node.json', qs: {report_type: 5}}, function(err, resp, body){
        if (err) {cb(err);}
        logger.debug('MCR::getNodeList(report_type=5) - return_status=%d', resp.statusCode);

        var body_5 = JSON.parse(body);

        logger.debug('MCR::getNodeList(report_type=3)')
        return request({url: AC_MCR_URL + '/node.json', qs: {report_type: 5}}, function(err, resp, body){
            if (err) {cb(err);}
            logger.debug('MCR::getNodeList(report_type=3) return_status=%d', resp.statusCode);
            var body_3 = JSON.parse(body);
            var list = body_5.concat(body_3);
            list = list.sort(function(node) { return Number.parseInt(node.updated); });
            logger.debug('MCR::getNodeList() length=%d', list.length);
            cb(null, list);
        });
    });
}


function getReport(node_id, cb) {
    var cache_key = 'mcr/report/' + node_id;
    return cache.wrap(cache_key, function(_cb){
        logger.debug("MCR::getReport(node_id=%d) action=fetching", node_id);
        return __getReport(node_id, _cb);
    }, cb);
}

function __getReport(node_id, cb) {
    logger.debug('MCR::getReport(node_id=%d', node_id);
    return request({
        url: AC_MCR_URL + '/node/' + node_id + '.json', 
        qs: {report_type: 5}}, 
        function(err, resp, body){
            if(err) {
                cb(err);
            }
            logger.debug('MCR::getReport(node_id=%d) return_status=%d', node_id, resp.statusCode);
            cb(null, JSON.parse(body));
        }
    );
}

function getUser(user_id, cb) {
    var cache_key = 'mcr/user/' + user_id;
    return cache.wrap(cache_key, function(cache_cb){
        logger.debug("MCR::getUser(user_id=%d) action=fetching", user_id);
        __getUser(user_id, cache_cb);
    }, cb);
}
function __getUser(user_id, cb) {
    logger.debug('MCR::getUser(user_id=%d', user_id);
    return request(AC_MCR_URL + '/user/' + user_id + '.json', function(err, resp, body){
        if(err) {
            cb(err);
        }
        logger.debug('MCR::getUser(user_id=%d)', user_id);
        cb(null, JSON.parse(body));
    });
}

module.exports = router;
