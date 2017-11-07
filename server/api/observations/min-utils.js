'use strict';
var _ = require('lodash');
var moment = require('moment');
var uuid = require('node-uuid');
var path = require('path');
var geohash = require('ngeohash');
var moment = require('moment');
var changeCase = require('change-case');
var logger = require('../../logger.js');
var multiparty = require('multiparty');
var q = require('q');
var sharp = require('sharp');

var request = require('request');

var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-west-2' });
var dynamodb = new AWS.DynamoDB.DocumentClient();
var s3Stream = require('s3-upload-stream')(new AWS.S3());

var OBS_TABLE = process.env.MINSUB_DYNAMODB_TABLE;
var UPLOADS_BUCKET = process.env.UPLOADS_BUCKET || 'ac-user-uploads';

function itemsToSubmissions(items) {
    var subs = _.chain(items)
        .groupBy('subid')
        .map(function(obs, subid) {
            var new_obs = obs.map(function(ob) {
                return {
                    obtype: ob.obtype,
                    obid: ob.obid,
                    // TODO(wnh): this ain't needed no moe.
                    shareUrl: 'http://avalanche.ca/share/' +
                        changeCase.paramCase(ob.ob.title) +
                        '/' +
                        subid,
                };
            });

            return {
                subid: subid,
                latlng: obs[0].ob.latlng.map(Number),
                datetime: obs[0].ob.datetime,
                uploads: obs[0].ob.uploads,
                title: obs[0].ob.title,
                user: obs[0].user,
                obs: new_obs,
            };
        })
        .value();

    return subs;
}

function itemToObservation(item) {
    return itemsToObservations([item])[0];
}

function itemsToObservations(items) {
    if (items[0]) {
        var obs = _.map(items, function(item) {
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
                comment: item.ob.comment,
            };
        });

        return obs;
    } else {
        return [];
    }
}

var getAuth0Profile = function(token, cb) {
    request.post(
        {
            url: 'https://avalancheca.auth0.com/tokeninfo',
            json: true,
            body: { id_token: token },
        },
        function callback(error, response, body) {
            if (error) {
                cb(error);
            } else {
                cb(null, body);
            }
        }
    );
};

function itemToSubmission(item) {
    return itemsToSubmissions([item])[0];
}

function validateItem(item) {
    return item.ob.latlng.length === 2;
}

exports.saveSubmission = function(token, form, callback) {
    logger.info('Saving submission');
    var keyPrefix = moment().format('YYYY/MM/DD/');
    var item = {
        obid: uuid.v4(),
        subid: uuid.v4(),
        userid: null, //these are now set later with the auth0 profile
        user: null,
        acl: 'public',
        obtype: 'quick',
        ob: {
            uploads: [],
        },
    };
    var tempObs = {};

    form.on('field', function(name, value) {
        value = value.trim();
        logger.info(
            'Saving field: %s for MIN submission with value: %s',
            name,
            value
        );
        try {
            switch (name) {
                case 'latlng':
                    item.ob.latlng = JSON.parse(value);
                    item.geohash = geohash.encode(
                        item.ob.latlng[0],
                        item.ob.latlng[1]
                    );
                    break;
                case 'datetime':
                    item.ob.datetime = value;
                    item.epoch = moment(item.ob.datetime).unix();
                    break;
                case 'obs':
                    tempObs = JSON.parse(value);
                    break;
                default:
                    if (/^\{|^\[/.test(value)) {
                        value = JSON.parse(value);
                    }
                    item.ob[name] = value;
                    break;
            }
        } catch (e) {
            callback(e);
        }
    });

    var imageUploadPromises = [];

    form.on('part', function(part) {
        var validMimeTypes = ['image/png', 'image/jpeg'];
        var uploadId = uuid.v4();
        var key = keyPrefix + uploadId;

        var mimeType = part.headers['content-type'];

        logger.info('upload mime type is %s', mimeType);

        if (validMimeTypes.indexOf(mimeType) !== -1) {
            key += '.' + mimeType.split('/')[1];
            item.ob.uploads.push(key);

            logger.info('Uploading %s to S3.', key);

            var isDone = q.defer();
            imageUploadPromises.push(isDone.promise);

            var orienter = sharp().rotate();

            var upload = s3Stream.upload({
                Bucket: UPLOADS_BUCKET,
                Key: key,
                ContentType: part.type,
                ACL: 'private',
            });

            part.pipe(orienter).pipe(upload);

            upload.on('error', function(error) {
                logger.info('Error uploading object to S3 : %s', error);
                callback('Error uploading object to S3 ' + error);
                isDone.resolve();
            });

            upload.on('uploaded', function(details) {
                logger.info(
                    'Uploaded object to S3 : %s',
                    JSON.stringify(details)
                );
                isDone.resolve();
            });
        } else {
            callback({
                error: 'Invalid file extention. Valid file extentions are ' +
                    validMimeTypes.join(),
            });
        }
    });

    form.on('error', function(err) {
        callback('error accepting obs form: ' + err);
    });

    form.on('close', function(err) {
        getAuth0Profile(token, function(err, profile) {
            if (err) {
                logger.info(
                    'Error getting user profile : %s',
                    JSON.stringify(err)
                );
                return res.send(500, {
                    error: 'There was an error while saving your submission.',
                });
            }
            item.userid = profile.user_id;
            item.user = profile.nickname || 'unknown';

            if (_.isEmpty(tempObs)) {
                saveOb(item).then(
                    function(ob) {
                        callback(null, ob);
                    },
                    function(err) {
                        callback(err);
                    }
                );
            } else {
                saveAllObs(callback);
            }
        });

        function saveOb(item) {
            var valid = validateItem(item);
            var defer = q.defer();

            if (valid) {
                dynamodb.put(
                    {
                        TableName: OBS_TABLE,
                        Item: item,
                    },
                    function(err, data) {
                        if (err) {
                            logger.info(JSON.stringify(err));
                            defer.reject({
                                error: 'error saving you submission: saving',
                            });
                        } else {
                            logger.info('successfully saved item');
                            var sub = itemToSubmission(item);
                            defer.resolve(sub);
                        }
                    }
                );
            } else {
                defer.reject({ error: 'error saving you submission: invalid' });
            }
            return defer.promise;
        }

        function saveAllObs(callback) {
            var obsPromises = [];
            _.forEach(tempObs, function(ob, key) {
                var itemClone = _.cloneDeep(item);
                itemClone.obid = uuid.v4();
                itemClone.obtype = key.replace('Report', '');
                _.assign(itemClone.ob, ob);

                var p = saveOb(itemClone);

                obsPromises.push(p);
            });

            q.all(obsPromises.concat(imageUploadPromises)).then(
                function(results) {
                    callback(null, results[0]);
                },
                function(err) {
                    callback(err);
                }
            );
        }
    });
};

exports.getSubmissions = function(filters, callback) {
    var startDate = moment().subtract('2', 'days');
    var endDate = moment();

    logger.info('dates = %s', filters.dates);
    //todo: validate temporal query string values

    if (filters.last) {
        startDate = moment().subtract(
            filters.last.split(':')[0],
            filters.last.split(':')[1]
        );
    } else if (filters.dates) {
        startDate = moment(filters.dates.split(',')[0]);
        endDate = moment(filters.dates.split(',')[1]);
    }
    return getSubmissionsRecursive(startDate, endDate, null, [], callback);
};
function getSubmissionsRecursive(
    startDate,
    endDate,
    prevKey,
    prevItems,
    callback
) {
    var params = {
        TableName: OBS_TABLE,
        IndexName: 'acl-epoch-index',
    };

    logger.info(
        'getting obs between start = %s and end = %s',
        startDate.format('YYYY-MM-DD'),
        endDate.format('YYYY-MM-DD')
    );

    params.KeyConditionExpression =
        'acl = :auth and epoch BETWEEN :start AND :end';
    params.ExpressionAttributeValues = {
        ':auth': 'public',
        ':start': startDate.unix(),
        ':end': endDate.unix(),
    };

    if (prevKey !== null) {
        params.ExclusiveStartKey = prevKey;
    }

    dynamodb.query(params, function(err, res) {
        if (err) {
            callback({ message: 'error fetching observations', error: err });
            return;
        }

        var items = prevItems.concat(res.Items);
        logger.info('getSubmissionsRecursive: return count =', res.Count);

        if (typeof res.LastEvaluatedKey !== 'undefined') {
            logger.info('getSubmissionsRecursive: Running recursive');
            getSubmissionsRecursive(
                startDate,
                endDate,
                res.LastEvaluatedKey,
                items,
                callback
            );
        } else {
            logger.info(
                'getSubmissionsRecursive: final length -',
                items.length
            );
            var subs = itemsToSubmissions(items);
            callback(null, subs);
        }
    });
}

exports.getSubmission = function(subid, client, callback) {
    var params = {
        TableName: OBS_TABLE,
        IndexName: 'subid-index',
        KeyConditionExpression: 'subid = :subid',
        ExpressionAttributeValues: { ':subid': subid },
    };

    dynamodb.query(params, function(err, res) {
        if (err) {
            callback({ error: 'error fetching observations' });
        } else if (res.Count === 0) {
            callback(null, null);
        } else {
            callback(
                null,
                routeResponseForClient(res.Items, client, 'submissions')
            );
        }
    });
};

exports.getObservations = function(filters, callback) {
    var params = {
        TableName: OBS_TABLE,
        IndexName: 'acl-epoch-index',
    };
    var startDate = moment().subtract('2', 'days');
    var endDate = moment();

    //todo: validate temporal query string values
    if (filters.last) {
        var number = filters.last.split(':')[0];
        var unit = filters.last.split(':')[1];
        startDate = moment().subtract(number, unit);
    } else if (filters.dates) {
        logger.info('dates = %s', filters.dates);
        startDate = moment(filters.dates.split(',')[0]);
        endDate = moment(filters.dates.split(',')[1]);
    }

    logger.info(
        'getting obs between start = %s and end = %s',
        startDate.format('YYYY-MM-DD'),
        endDate.format('YYYY-MM-DD')
    );

    params.KeyConditionExpression =
        'acl = :auth and epoch BETWEEN :start AND :end';
    params.ExpressionAttributeValues = {
        ':auth': 'public',
        ':start': startDate.unix(),
        ':end': endDate.unix(),
    };

    dynamodb.query(params, function(err, res) {
        if (err) {
            callback(err);
        } else {
            callback(
                null,
                routeResponseForClient(
                    res.Items,
                    filters.client,
                    'observations'
                )
            );
        }
    });
};

exports.getObservation = function(obid, callback) {
    var params = {
        TableName: OBS_TABLE,
        KeyConditionExpression: 'obid = :obid',
        ExpressionAttributeValues: { ':obid': obid },
    };
    dynamodb.query(params, function(err, res) {
        if (err) {
            logger.error(err);
            callback({ error: 'error fetching observations' });
        } else if (typeof res === 'undefined') {
            logger.error('Undefined returned for observation obid=' + obid);
            callback({ error: 'error fetching observation' });
        } else {
            var sub = itemToObservation(res.Items[0]);
            callback(null, sub);
        }
    });
};

exports.getUploadAsStream = function(key, size) {
    var s3 = new AWS.S3();
    var params = {
        Bucket: UPLOADS_BUCKET,
        Key: key,
    };

    var stream = s3.getObject(params).createReadStream();

    if (size === 'fullsize') {
        return stream;
    } else {
        var resize = sharp().resize(size, size).max();
        return stream
            .on('error', err => {
                resize.emit('error', err);
            })
            .pipe(resize);
    }
};

function routeResponseForClient(results, client, type) {
    //if client, then is request from web
    if (client && client === 'web') {
        if (type && type === 'observations') {
            return mapWebObsResults(results);
        } else {
            return mapWebSubResults(results);
        }
    } else {
        if (type && type === 'observations') {
            return itemsToObservations(_.filter(results, { obtype: 'quick' }));
        } else {
            return itemsToSubmissions(results);
        }
    }
}

function mapWebObsResults(results) {
    return _.map(results, function(item) {
        var ob = _.cloneDeep(item.ob);
        delete ob.title;
        delete ob.datetime;
        delete ob.latlng;
        delete ob.uploads;

        return {
            subid: item.subid,
            obid: item.obid,
            title: item.ob.title,
            datetime: item.ob.datetime,
            user: item.user,
            obtype: item.obtype,
            latlng: item.ob.latlng,
            uploads: item.ob.uploads,
            ob: ob,
        };
    });
}

function mapWebSubResults(items) {
    var subs = _.chain(items)
        .groupBy('subid')
        .map(function(obs, subid) {
            var meta = {
                subid: subid,
                latlng: obs[0].ob.latlng,
                datetime: obs[0].ob.datetime,
                uploads: obs[0].ob.uploads,
                user: obs[0].user,
                title: obs[0].ob.title,
            };

            var obs = obs.map(function(ob) {
                delete ob.ob.title;
                delete ob.ob.datetime;
                delete ob.ob.latlng;
                delete ob.ob.uploads;
                return {
                    obtype: ob.obtype,
                    obid: ob.obid,
                    shareUrl: 'http://avalanche.ca/share/' +
                        changeCase.paramCase(meta.title) +
                        '/' +
                        ob.obid,
                    ob: ob.ob,
                };
            });

            meta.obs = obs;

            return meta;
        })
        .value();

    return subs;
}
