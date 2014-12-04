#!/usr/bin/env node
'use strict';
var fs = require('fs');
var obs = require('./fixtures/observations');
var request = require('request');
var shortId = require('shortid');
var uuid = require('node-uuid');
var geohash = require('ngeohash');
var moment = require('moment');
var randomWords = require('random-words');

var o = {
    ac: '{"slab":true,"sound":false,"snow":true,"temp":false}',
    rc: '{"ridingQuality":{"prompt":"Riding quality was:","options":["Amazing","Good","OK","Terrible"],"selected":"OK"},"snowConditions":{"prompt":"Snow conditions were:","options":{"Crusty":false,"Powder":true,"Deep powder":false,"Wet":false,"Heavy":false,"Wind affected":true,"Hard":false}},"rideType":{"prompt":"We rode:","options":{"Mellow slopes":false,"Steep slopes":true,"Convex slopes":false,"Sunny slopes":false,"Cut-blocks":true,"Open trees":false,"Dense trees":true,"Alpine slopes":false}},"stayedAway":{"prompt":"We stayed away from:","options":{"Steep slopes":false,"Convex slopes":true,"Sunny slopes":false,"Cut-blocks":false,"Open trees":true,"Alpine slopes":false}},"weather":{"prompt":"The day was:","options":{"Stormy":true,"Windy":false,"Sunny":false,"Cold":false,"Warm":false,"Cloudy":false,"Foggy":true,"Wet":false}}}'
};

//obs.features = [obs.features[0]]
obs.features.forEach(function (ob) {
    var coord = ob.geometry.coordinates;

    var options =  {
        url: 'http://localhost:9000/api/min/submissions',
        formData: {
            title: randomWords(3).join(' '),
            latlng: JSON.stringify([coord[1], coord[0]]),
            datetime: moment().format(),
            avalancheConditions: o.ac,
            ridingConditions: o.rc,
            comment: 'my comment',
            attachments: [
                fs.createReadStream(__dirname + '/fixtures/attachment.png'),
                fs.createReadStream(__dirname + '/fixtures/attachment.png')
            ]
        },
        headers: {
            "Authorization": "Bearer "
        }
    };

    request.post(options, function (err, res, body) {
        if (err) {
            return console.error('upload failed:', err);
        }
        console.log('Upload successful!  Server responded with:', body);
    })
});

