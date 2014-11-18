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

var AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-2'});
var DOC = require("dynamodb-doc");
var docClient = new DOC.DynamoDB();
var s3Stream = require('s3-upload-stream')(new AWS.S3());

var jwtCheck = jwt({
  secret: new Buffer(process.env.AUTH0_CLIENT_SECRET, 'base64'),
  audience: process.env.AUTH0_CLIENT_ID
});

router.post('/', function (req, res) {
    var form = new multiparty.Form();
    var bucket = 'ac-user-uploads';
    var keyPrefix = 'obs/quick' + moment().format('/YYYY/MM/DD/');
    var item = {
        obid: uuid.v4(),
        acl: 'private',
        obtype: 'quick',
        user: '2f158fab-2e60-43cb-a96c-2655b1dd6b57',
        ob: {
            uploads: []
        }
    };

    form.on('field', function(name, value) {
        console.log('field %s with value %s', name, value);
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
            TableName: "ac-obs",
            Item: item
        }, function (result) {
            console.log(result);
            res.send(201, "OK");
        });
    });

    form.parse(req);
});

router.get('/', function (req, response) {
    var params = {
        TableName: 'ac-obs',
        ProjectionExpression: 'obid, obtype, ob.latlng'
    };

    docClient.scan(params, function(err, res) {
        if (err) {
            console.log(err);
            response.json(500, {error: "error fetching observations"})
        } else {
            var obs = res.Items.map(function (item) {
                return {
                    obid: item.obid,
                    obtype: item.obtype,
                    latlng: item.ob.latlng.split(',')
                }
            });

            response.json(obs);
        }
    });
});

router.get('/:obid', function (req, response) {
    var params = {
        TableName: 'ac-obs',
        Key: {obid: req.params.obid}
    };

    docClient.getItem(params, function(err, res) {
        if (err) {
            console.log(err);
            response.json(500, {error: "error fetching observation"})
        } else {
            res.Item.ob.obid = res.Item.obid
            response.json(res.Item.ob);
        }
    });
});

module.exports = router;