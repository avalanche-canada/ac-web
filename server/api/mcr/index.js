'use strict';

var async = require('async');
var differenceInDays = require('date-fns/difference_in_days');
var express = require('express');
var request = require('request');

var logger = require('../../logger');
var config = require('../../config/environment');
var mcr_cache = require('./cache');
var mcr_format = require('./format');

var router = express.Router();

var AC_MCR_URL = config.AC_MCR_HOST + '/sapi/public';

router.get('/', function(req, res) {
    //TODO(wnh): Clean this up a bit
    mcr_cache.cache.wrap(
        'mcr/format_list',
        function(cb) {
            return getNodeList(function(err, nodes) {
                async.map(nodes, getReportAndUser, function(err, reports) {
                    if (err) {
                        return cb(err);
                    }
                    var fmt_reports = reports
                        .filter(Boolean)
                        .map(function(ru) {
                            return mcr_format.formatReportFull(
                                ru.report,
                                ru.user
                            );
                        })
                        // "formatReportFull" can return "undefined"
                        .filter(Boolean);
                    fmt_reports = fmt_reports.filter(filterToSevenDays);
                    cb(null, fmt_reports);
                });
            });
        },
        function(err, data) {
            if (err) {
                logger.error("MCR getting report list", {error: err});
                return error(res, err);
            }
            return res
                .status(200)
                .json(data)
                .end();
        }
    );
});

function filterToSevenDays(report) {
    if (report.dates.length < 1) {
        return false;
    }
    var diff = differenceInDays(new Date(), report.dates[0]);
    return diff <= config.MCR_LIMIT_DAYS;
}

router.get('/:report_id', function(req, res) {
    var report_id = Number.parseInt(req.params.report_id);
    return getReport(report_id, function(err, report) {
        if (err) {
            logger.error("MCR getting report by id", {error: err});
            return error(res, err);
        }
        return getUser(report.uid, function(err, user) {
            if (err) {
                logger.error("MCR getting user", {error: err});
                return error(res, err);
            }
            return res
                .status(200)
                .json(mcr_format.formatReportFull(report, user))
                .end();
        });
    });
});

function error(res, err) {
    res
        .status(500)
        .json({ msg: err })
        .end();
}

/*
 * Gets the report data and user profile for a given MCR "node".
 * Retuns `undefined` and logs a warning if there is an error fetching either
 * part.
 */
function getReportAndUser(node, cb) {
    return getReport(node.nid, function(err_report, value_report){
        getUser(node.uid, function(err_user, value_user){
           if (err_report || err_user) {
               logger.warn('MRC::getReportAndUser skipping due to error',
                   {node_id: node.nid, user_id: node.uid,
                    err_report:err_report, err_user:err_user.toString()});
               cb(null, undefined);
           } else {
               cb(null, {
                    report: value_report,
                    user:   value_user,
               });
           }
        });
    });
}

function getNodeList(cb) {
    var cache_key = 'mcr/node_list';
    return mcr_cache.cache.wrap(
        cache_key,
        function(_cb) {
            return __getNodeList(_cb);
        },
        cb
    );
}

function getJSON(path, qs, cb) {
    return cb(new Error('Unable to contact upstream api'));

    return request({ url: AC_MCR_URL + path, qs: qs }, function(
        err,
        resp,
        body
    ) {
        if (err) {
            logger.error('MCR::getJSON', { path: path, qs: qs, error:err });
            return cb(err);
        }
        logger.debug('MCR::getJSON', {
            path: path,
            qs: qs,
            return_status: resp.statusCode,
        });

        if (resp.statusCode !== 200) {
            logger.warn('MCR::getJSON', {
                msg: 'non 200 from MCR api',
                status_code: resp.statusCode,
                req_path: path,
            });
            return cb(new Error('Uable to contact upstream api'));
        }

        try {
            cb(null, JSON.parse(body));
        } catch (err2) {
            logger.error('MCR::getJSON', {
                msg: 'unable to parse JSON',
                req_path: path,
                error: err2,
            });
            return cb(err2);
        }
    });
}

function __getNodeList(cb) {
    logger.debug('MCR::getNodeList', { report_type: 5 });
    return getJSON('/node.json', { report_type: 5 }, function(err, body_5) {
        if (err) {
            cb(err);
        }
        if (!body_5) {
            logger.warn('MCR::getNodeList missing body err=%s, body=%s', err, body_5);
            body_5 = [];
        }
        logger.debug('MCR::getNodeList', { report_type: 3 });
        return getJSON('/node.json', { report_type: 3 }, function(err, body_3) {
            if (err) {
                cb(err);
            }
            var list = body_5.concat(body_3);
            list = list.sort(function(node) {
                return Number.parseInt(node.updated);
            });
            logger.debug('MCR::getNodeList', { return_count: list.length });
            cb(null, list);
        });
    });
}

function getReport(node_id, cb) {
    var cache_key = 'mcr/report/' + node_id;
    return mcr_cache.cache.wrap(
        cache_key,
        function(_cb) {
            logger.debug('MCR::getReport(node_id=%d) action=fetching', node_id);
            return __getReport(node_id, _cb);
        },
        { ttl: mcr_cache.TTL_ITEMS },
        cb
    );
}

function __getReport(node_id, cb) {
    logger.debug('MCR::getReport(node_id=%d', node_id);
    var path = '/node/' + node_id + '.json';
    return getJSON(path, { report_type: 5 }, function(err, data) {
        if (err) {
            cb(err);
        }
        cb(null, data);
    });
}

function getUser(user_id, cb) {
    var cache_key = 'mcr/user/' + user_id;
    return mcr_cache.cache.wrap(
        cache_key,
        function(cache_cb) {
            logger.debug('MCR::getUser(user_id=%d) action=fetching', user_id);
            __getUser(user_id, cache_cb);
        },
        { ttl: mcr_cache.TTL_ITEMS },
        cb
    );
}

function __getUser(user_id, cb) {
    logger.debug('MCR::getUser(user_id=%d)', user_id);
    var path = '/user/' + user_id + '.json';
    return getJSON(path, {}, function(err, data) {
        if (err) {
            cb(err);
        }
        logger.debug('MCR::getUser', { user_id: user_id });
        cb(null, data);
    });
}

module.exports = router;
