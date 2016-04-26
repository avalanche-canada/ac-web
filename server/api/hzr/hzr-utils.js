'use strict';
var _ = require('lodash');
var moment = require('moment');
var uuid = require('node-uuid');
var path = require('path');
var moment = require('moment');
var im = require('imagemagick-stream');
var logger = require('winston');
var q = require('q');

var AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-2'});
var dynamodb = new AWS.DynamoDB.DocumentClient();
var s3Stream = require('s3-upload-stream')(new AWS.S3());

var HZR_TABLE = process.env.HOTZONE_DYNAMODB_TABLE;
var UPLOADS_BUCKET = process.env.UPLOADS_BUCKET || 'ac-hzr-uploads';
var UPLOADS_BUCKET_URL = +UPLOADS_BUCKET;

exports.saveHZR = function (user, form, callback) {
    var keyPrefix = moment().format('YYYY/MM/DD/');
    var item = {
        hzid: uuid.v4(),
        subid: uuid.v4(),
        userid: user.user_id,
        user: user.nickname || 'unknown',
        acl: 'public',
        report: {
            uploads: []
        }
    };
    var tempObs = {};

    form.on('field', function(name, value) {
        value = value.trim();
        try {
            switch(name){
                case "dateissued":
                    var val = moment(value, 'YYYY-MM-DD hh:mm A').utc();
                    item.dateissued = val.unix();
                    item.report[name] = val.format();
                    break;
                case "datevalid":
                    var val = moment(value, 'YYYY-MM-DD hh:mm A').utc();
                    item.datevalid = val.unix();
                    item.report[name] = val.format();
                    break;
                case "hotzoneid":
                    item.hotzoneid = value;
                    item.report[name] = value;
                    break;
                case "data":
                    item.report[name] = JSON.parse(value);
                    break;
                default:
                    if(/^\{|^\[/.test(value)) {
                        value = JSON.parse(value);
                    }
                    item.report[name] = value;
                    break;
            }
        } catch (e) {
            callback(e);
        }
    });

    form.on('part', function(part) {
        var validMimeTypes = ['image/png', 'image/jpeg'];
        var uploadId = uuid.v4();
        var key = keyPrefix + uploadId;

        var mimeType = part.headers['content-type'];

        logger.log('info','upload mime type is %s', mimeType);

        if(validMimeTypes.indexOf(mimeType) !== -1) {
            key += '.' + mimeType.split('/')[1];
            item.report.uploads.push(key);

            console.log('Uploading %s to S3.', key);

            var upload = s3Stream.upload({
              Bucket: UPLOADS_BUCKET,
              Key: key,
              ContentType: part.type,
              ACL: "private"
            });

            part.pipe(upload);

            upload.on('error', function (error) {
              callback("Error uploading object to S3 : %s", error);
            });

            upload.on('uploaded', function (details) {
              console.log("Uploaded object to S3 : %s", JSON.stringify(details));
            });
        } else {
            callback({error: 'Invalid file extention. Valid file extentions are ' + validMimeTypes.join()});
        }

    });

    form.on('error', function (err) {
        callback('error accepting report form: ' + err);
    });

    form.on('close', function (err) {
        saveReport(item)
            .then(function(ob){
                callback(null, ob);
            }, function (err){
                callback(err);
            });


        function saveReport(item){
            var defer = q.defer();

            dynamodb.put({
                TableName: HZR_TABLE,
                Item: item
            }, function (err, data) {
                if (err) {
                    logger.log('info', JSON.stringify(err));
                    defer.reject({error: 'error saving your submission: saving'});
                } else {
                    logger.log('info','successfully saved report');
                    defer.resolve(item);
                }
            });

            return defer.promise;
        }

    });
};

exports.getReports = function (callback) {
    var params = {
        TableName: HZR_TABLE,
        IndexName: 'acl-datevalid-index'
    };
    var today = moment();

    console.log('getting valid reports for  %s', today.format('YYYY-MM-DD'));

    params.KeyConditionExpression = "acl = :auth and datevalid >= :today";
    params.ExpressionAttributeValues= {
        ':auth': 'public',
        ':today': today.unix()
    };

    console.log(params);

    dynamodb.query(params, function(err, res) {
        if (err) {
            console.log(err);
            callback({error: "error fetching hot zone reports: " + JSON.stringify(err)});
        } else {
            var reports = [];
            var groupedItems = _.groupBy(res.Items, 'hotzoneid');
            for (var key in groupedItems) {
                reports.push(_.max(groupedItems[key], function (item) {
                    return item.dateissued;
                }));
            }
            callback(null, reports);
        }
    });
};

exports.getReport = function (subid, client, callback) {
    var params = {
        TableName: HZR_TABLE,
        IndexName: 'subid-index',
        KeyConditionExpression: 'subid = :subid',
        ExpressionAttributeValues: {':subid' : subid}
    };

    dynamodb.query(params, function(err, res) {
        if (err) {
            callback({error: "error fetching report"});
        } else {
            callback(null, res.Items);
        }
    });
};
