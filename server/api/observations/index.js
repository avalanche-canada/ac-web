var _ = require('lodash');
var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var util = require('util');
var moment = require('moment');
var uuid = require('node-uuid');
var path = require('path');
var geohash = require('ngeohash');
var jwt = require('express-jwt');
var moment = require('moment');

var AWS = require('aws-sdk');
var DOC = require("dynamodb-doc");
AWS.config.update({region: 'us-west-2'});
var docClient = new DOC.DynamoDB();
var s3Stream = require('s3-upload-stream')(new AWS.S3());

var jwtCheck = jwt({
  secret: new Buffer(process.env.AUTH0_CLIENT_SECRET, 'base64'),
  audience: process.env.AUTH0_CLIENT_ID
});

var OBS_TABLE = 'mountain-info-network';

router.post('/submissions', function (req, res) {
    var form = new multiparty.Form();
    var bucket = 'ac-user-uploads';
    var keyPrefix = moment().format('YYYY/MM/DD/');
    var item = {
        obid: uuid.v4(),
        subid: uuid.v4(),
        acl: 'public',
        obtype: 'quick',
        userid: '2f158fab-2e60-43cb-a96c-2655b1dd6b57',
        ob: {
            uploads: []
        }
    };

    //todos: trim string

    form.on('field', function(name, value) {
        switch(name){
            case "location":
                item.ob.latlng = value;
                item.geohash = geohash.encode(item.ob.latlng.split(',')[0], value.split(',')[1]);
                break;
            case "datetime":
                item.ob.datetime = value;
                item.epoch = moment(item.ob.datetime).unix();
                break;
            default:
                item.ob[name] = value;
                break;
        }
    });

    form.on('part', function(part) {
        var uploadId = uuid.v4()
        var ext = path.extname(part.filename);
        var key = keyPrefix + uploadId + ext;

        console.log('uploading: ' + key);

        item.ob.uploads.push(key);

        var upload = s3Stream.upload({
          Bucket: bucket,
          Key: key,
          ACL: "private"
        });

        part.pipe(upload);

        upload.on('error', function (error) {
          console.log(error);
        });

        upload.on('uploaded', function (details) {
          console.log(details);
        });

    });

    form.on('error', function (err) {
        console.log('error accepting obs form: ' + err)
    });

    form.on('close', function (err) {
        docClient.putItem({
            TableName: OBS_TABLE,
            Item: item,
        }, function (err, data) {
            if (err) {
                res.json(500, {error: 'error saving you submission.'});
            } else {

                var sub =  {
                    subid: item.subid,
                    latlng: item.ob.latlng,
                    datetime: item.ob.datetime,
                    uploads: item.ob.uploads,
                    obs: [
                        {
                            obtype: item.obtype,
                            obid: item.obid
                        }
                    ]
                }

                res.json(201, sub);
            }
            
        });
    });

    form.parse(req);
});

router.get('/submissions', function (req, response) {
    console.log(JSON.stringify(AWS.config))
    var params = {
        TableName: OBS_TABLE,
        IndexName: 'acl-epoch-index'
    };
    var startDate = moment().subtract('2', 'days');
    var endDate = moment();

    console.log('dates = %s', req.query.dates)
    //todo: validate temporal query string values

    if (req.query.last) {
        startDate = moment().subtract(req.query.last.split(':')[0], req.query.last.split(':')[1]);
    } else if (req.query.dates) {

        startDate = moment(req.query.dates.split(',')[0]);
        endDate = moment(req.query.dates.split(',')[1]);
    }

    console.log('getting obs between start = %s and end = %s', startDate.format('YYYY-mm-DD'), endDate.format('YYYY-mm-DD'));
    params.KeyConditions = [
        docClient.Condition("acl", "EQ", "public"), 
        docClient.Condition("epoch", "BETWEEN", startDate.unix(), endDate.unix())
    ];

    docClient.query(params, function(err, res) {
        if (err) {
            console.log(err);
            response.json(500, {error: "error fetching observations"});
        } else {
            var subs = _.chain(res.Items)
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
                            obid: ob.obid
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

            response.json(subs);
        }
    });
}); 

router.get('/submissions/:subid', function (req, response) {
    var params = {
        TableName: OBS_TABLE,
        FilterExpression: 'attribute_exists(obid) and subid = :subid',
        ExpressionAttributeValues: {':subid' : req.params.subid}
    };

    docClient.scan(params, function(err, res) {
        if (err) {
            console.log(err);
            response.json(500, {error: "error fetching observation"})
        } else {
            var subs = _.chain(res.Items)
                .groupBy('subid')
                .map(function (obs, subid) {
                    console.log('hey'+JSON.stringify(obs))
                    var meta = {
                        subid: subid,
                        latlng: obs[0].ob.latlng,
                        datetime: obs[0].ob.datetime,
                        uploads: obs[0].ob.uploads
                    };

                    var obs = obs.map(function (ob) {
                        return {
                            obtype: ob.obtype,
                            obid: ob.obid
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

            response.json(subs);
        }
    });
});

router.get('/observations', function (req, response) {
    var params = {
        TableName: OBS_TABLE,
        IndexName: 'acl-epoch-index'
    };
    var startDate = moment().subtract('2', 'days');
    var endDate = moment();

    console.log('dates = %s', req.query.dates)
    //todo: validate temporal query string values

    if (req.query.last) {
        startDate = moment().subtract(req.query.last.split(':')[0], req.query.last.split(':')[1]);
    } else if (req.query.dates) {

        startDate = moment(req.query.dates.split(',')[0]);
        endDate = moment(req.query.dates.split(',')[1]);
    }

    console.log('getting obs between start = %s and end = %s', startDate.format('YYYY-mm-DD'), endDate.format('YYYY-mm-DD'));
    params.KeyConditions = [
        docClient.Condition("acl", "EQ", "public"), 
        docClient.Condition("epoch", "BETWEEN", startDate.unix(), endDate.unix())
    ];

    docClient.query(params, function(err, res) {
        if (err) {
            console.log(err);
            response.json(500, {error: "error fetching observations"});
        } else {
            var obs = _.map(res.Items, function (item) {
                return {
                    subid: item.subid,
                    obid: item.obid,
                    datetime: item.datetime,
                    obtype: item.obtype,
                    latlng: item.ob.latlng
                }
            }); 

            response.json(obs);
        }
    });
});

router.get('/observations/:obid', function (req, response) {
    var params = {
        TableName: OBS_TABLE,
        FilterExpression: 'obid = :obid',
        ExpressionAttributeValues: {':obid' : req.params.obid}
    };

    docClient.scan(params, function(err, res) {
        if (err) {
            console.log(err);
            response.json(500, {error: "error fetching observation"})
        } else {
            var item = res.Items[0];
            ob = {
                subid: item.subid,
                obid: item.obid,
                datetime: item.datetime,
                obtype: item.obtype,
                latlng: item.ob.latlng,
                narative: item.ob.narative,
            };

            response.json(ob);
        }
    });
});

router.get('/uploads/:year/:month/:day/:uploadid', function (req, res) {
    var params = {
        Bucket: 'ac-user-uploads',
        Key: [req.params.year, req.params.month, req.params.day, req.params.uploadid].join('/')
    };

    var s3 = new AWS.S3();
    s3.getObject(params).createReadStream().pipe(res);
});

module.exports = router;