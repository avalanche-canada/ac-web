var _ = require('lodash');
var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var util = require('util');
var AWS = require('aws-sdk');
var moment = require('moment');
var uuid = require('node-uuid');
var path = require('path');
var geohash = require('ngeohash');

//AWS.config.loadFromPath('./aws.json');
var s3Stream = require('s3-upload-stream')(new AWS.S3());
var dynamodb = new AWS.DynamoDB();

router.post('/', function (req, res) {
    var form = new multiparty.Form();
    var s3Client = new AWS.S3();
    var bucket = 'ac-user-uploads';
    var keyPrefix = 'obs/quick' + moment().format('/YYYY/MM/DD/');
    var item = {
        obid: { S: uuid.v4() },
        acl: { S: 'private' },
        obtype: { S: 'quick'},
        user: { S: '86d7a01c-266d-40e5-b367-ef3926b87530' }
    };
    var ob = {};
    var uploads = [];

    form.on('field', function(name, value) {
        console.log('field %s with value %s', name, value);
        switch(name){
            case "location":
                item.latlng = { S: value };
                item.geohash = { S: geohash.encode(value.split(',')[0], value.split(',')[1]) };
                break;
            case "datetime":
                item.epoch = { N: ''+moment(value).unix() };
                break;
            default:
                ob[name] = { S: value };
                break;
        }
    });

    form.on('part', function(part) {
        var uploadId = uuid.v4()
        var ext = path.extname(part.filename);
        var key = keyPrefix + uploadId + ext;

        console.log('uploading: ' + key);

        uploads.push(key);

        var upload = s3Stream.upload({
          Bucket: bucket,
          Key: key,
          ACL: "public-read"
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
        if (uploads) ob.uploads = { SS: uploads };
        item.ob = { M: ob };

        dynamodb.putItem({
            TableName: "ac-obs",
            Item: item
        }, function (result) {
            console.log(result);
            res.end("OK");
        });
    });

    form.parse(req);
});

router.get('/', function (req, response) {
    dynamodb.scan({ TableName: 'ac-obs', ProjectionExpression: 'latlng, obtype' }, function(err, res) {
        var obs = _.map(res.Items, function (item) {
            return {
                obtype: item.obtype.S,
                latlng: item.latlng.S
            }
        });
        response.json(obs);
    });
});

module.exports = router;