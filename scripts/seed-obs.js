#!/usr/bin/env node
'use strict';
var fs = require('fs');
var obs = require('./fixtures/observations');
var request = require('request');
var shortId = require('shortid');
var uuid = require('node-uuid');
var geohash = require('ngeohash');

obs.features.forEach(function (ob) {
    var options =  {
        url: 'http://localhost:9000/api/observations',
        formData: {
            location: ob.geometry.coordinates.join(),
            datetime: ob.properties.date,
            narative: 'my narative',
            attachments: [
                fs.createReadStream(__dirname + '/fixtures/attachment.png'),
                fs.createReadStream(__dirname + '/fixtures/attachment.png')
            ]
        }
    };

    request.post(options, function (err, res, body) {
        if (err) {
            return console.error('upload failed:', err);
        }
        console.log('Upload successful!  Server responded with:', body);
    })
});

