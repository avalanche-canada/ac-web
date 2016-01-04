'use strict';
var _ = require('lodash');
var moment = require('moment');
var uuid = require('node-uuid');
var path = require('path');
var geohash = require('ngeohash');
var moment = require('moment');
var im = require('imagemagick-stream');
var changeCase = require('change-case');
var logger = require('winston');

var AWS = require('aws-sdk');
var DOC = require("dynamodb-doc");
AWS.config.update({region: 'us-west-2'});
var docClient = new DOC.DynamoDB();
var s3Stream = require('s3-upload-stream')(new AWS.S3());

var OBS_TABLE = process.env.MINSUB_DYNAMODB_TABLE;
var UPLOADS_BUCKET = process.env.UPLOADS_BUCKET || 'ac-user-uploads';
var UPLOADS_BUCKET_URL = +UPLOADS_BUCKET;

function itemsToSubmissions(items) {
    var subs = _.chain(items)
        .groupBy('subid')
        .map(function (obs, subid) {
            var meta = {
                subid: subid,
                latlng: obs[0].ob.latlng,
                datetime: obs[0].ob.datetime,
                uploads: obs[0].ob.uploads
            };

            var obs = obs.map(function (ob) {
                return {
                    obtype: ob.obtype,
                    obid: ob.obid,
                    shareUrl: 'http://avalanche.ca/share/' + changeCase.paramCase(ob.ob.title) + '/' + ob.obid
                };
            });

            return {
                subid: subid,
                latlng: meta.latlng,
                datetime: meta.datetime,
                uploads: meta.uploads,
                obs: obs
            }
        })
        .value();

    return subs;
}

function itemToObservation(item) {
    return itemsToObservations([item])[0];
}

function itemsToObservations(items) {
    if(items[0]){
        var obs = _.map(items, function (item) {
            return {
                subid: item.subid,
                obid: item.obid,
                title: item.ob.title,
                datetime: item.ob.datetime,
                user: item.user,
                obtype: item.obtype,
                latlng: item.ob.latlng,
                uploads: item.ob.uploads,
                ridingConditions: item.ob.ridingConditions,
                avalancheConditions: item.ob.avalancheConditions,
                comment: item.ob.comment
            }
        });

        return obs;
    } else {
        return [];
    }
}

function itemToSubmission(item) {
    return itemsToSubmissions([item])[0];
}

function validateItem(item) {
    return item.ob.latlng.length === 2;
}

exports.saveSubmission = function (user, form, callback) {
    var keyPrefix = moment().format('YYYY/MM/DD/');
    var item = {
        obid: uuid.v4(),
        subid: uuid.v4(),
        userid: user.user_id,
        user: user.nickname || 'unknown',
        acl: 'public',
        obtype: 'quick',
        ob: {
            uploads: []
        }
    };

    form.on('field', function(name, value) {
        value = value.trim();
        logger.log('info','Saving field: %s for MIN submission with value: %s', name, value);
        try {
            switch(name){
                case "latlng":
                    item.ob.latlng = JSON.parse(value);
                    item.geohash = geohash.encode(item.ob.latlng[0], item.ob.latlng[1]);
                    break;
                case "datetime":
                    item.ob.datetime = value;
                    item.epoch = moment(item.ob.datetime).unix();
                    break;
                default:
                    if(/^\{|^\[/.test(value)) {
                        value = JSON.parse(value);
                    }
                    item.ob[name] = value;
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
            item.ob.uploads.push(key);

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
        callback('error accepting obs form: ' + err);
    });

    form.on('close', function (err) {
        var valid = validateItem(item);

        if(valid){
            docClient.putItem({
                TableName: OBS_TABLE,
                Item: item,
            }, function (err, data) {
                if (err) {
                    logger.log('info', JSON.stringify(err));
                    callback({error: 'error saving you submission: saving'});
                } else {
                    logger.log('info','successfully saved item');
                    var sub =  itemToSubmission(item);
                    callback(null, sub);
                }
            });
        } else {
            callback({error: 'error saving you submission: invalid'});
        }

    });
};

exports.getSubmissions = function (filters, callback) {
    var params = {
        TableName: OBS_TABLE,
        IndexName: 'acl-epoch-index'
    };
    var startDate = moment().subtract('2', 'days');
    var endDate = moment();

    console.log('dates = %s', filters.dates)
    //todo: validate temporal query string values

    if (filters.last) {
        startDate = moment().subtract(filters.last.split(':')[0], filters.last.split(':')[1]);
    } else if (filters.dates) {

        startDate = moment(filters.dates.split(',')[0]);
        endDate = moment(filters.dates.split(',')[1]);
    }

    console.log('getting obs between start = %s and end = %s', startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD'));

    params.KeyConditions = [
        docClient.Condition("acl", "EQ", "public"),
        docClient.Condition("epoch", "BETWEEN", startDate.unix(), endDate.unix())
    ];

    docClient.query(params, function(err, res) {
        if (err) {
            callback({error: "error fetching observations"});
        } else {
            var subs = itemsToSubmissions(res.Items);
            callback(null, subs);
        }
    });
};

exports.getSubmission = function (subid, callback) {
    var params = {
        TableName: OBS_TABLE,
        FilterExpression: 'attribute_exists(obid) and subid = :subid',
        ExpressionAttributeValues: {':subid' : subid}
    };

    docClient.scan(params, function(err, res) {
        if (err) {
            callback({error: "error fetching observations"});
        } else {
            var sub = itemToSubmission(res.Items[0]);
            callback(null, sub);
        }
    });
};

exports.getObservations = function (filters, callback) {
    var params = {
        TableName: OBS_TABLE,
        IndexName: 'acl-epoch-index'
    };
    var startDate = moment().subtract('2', 'days');
    var endDate = moment();

    //todo: validate temporal query string values
    if (filters.last) {
        var number = filters.last.split(':')[0];
        var unit = filters.last.split(':')[1];
        startDate = moment().subtract(number, unit);
    } else if (filters.dates) {
        console.log('dates = %s', filters.dates);
        startDate = moment(filters.dates.split(',')[0]);
        endDate = moment(filters.dates.split(',')[1]);
    }

    console.log('getting obs between start = %s and end = %s', startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD'));

    params.KeyConditions = [
        docClient.Condition("acl", "EQ", "public"),
        docClient.Condition("epoch", "BETWEEN", startDate.unix(), endDate.unix())
    ];

    docClient.query(params, function(err, res) {
        if (err) {
            callback({error: "error fetching observations"});
        } else {
            var subs = itemsToObservations(res.Items);
            callback(null, subs);
        }
    });
};

exports.getObservation = function (obid, callback) {
    var params = {
        TableName: OBS_TABLE,
        KeyConditionExpression: 'obid = :obid',
        ExpressionAttributeValues: {':obid' : obid}
    };
    docClient.query(params, function(err, res) {
        if (err) {
            console.log(err);
            callback({error: "error fetching observations"});
        } else {
            var sub = itemToObservation(res.Items[0]);
            callback(null, sub);
        }
    });
};

exports.getUploadAsStream = function (key, size) {
    var s3 = new AWS.S3();
    var params = {
        Bucket: UPLOADS_BUCKET,
        Key: key
    };
    var resize = im().resize(size).quality(90);

    var stream = s3.getObject(params).createReadStream();

    if(size === 'fullsize'){
        return stream;
    } else {
        return stream.pipe(resize);
    }
};
