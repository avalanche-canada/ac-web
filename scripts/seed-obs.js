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
            "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI4ZDE3MmQ1ODg3OGE2ZjM4Yzk1ZmYxYzY3ZGMxNjA0MSIsImVtYWlsIjoieXZlcy5yaWNoYXJkQHRlc2VyYS5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ill2ZXMgUmljaGFyZCIsImdpdmVuX25hbWUiOiJZdmVzIiwiZmFtaWx5X25hbWUiOiJSaWNoYXJkIiwicGljdHVyZSI6Imh0dHBzOi8vbGg0Lmdvb2dsZXVzZXJjb250ZW50LmNvbS8tZGYwY2pFWW84ajgvQUFBQUFBQUFBQUkvQUFBQUFBQUFCRGMvX1ZTdGY5QnZwTXMvcGhvdG8uanBnIiwiZ2VuZGVyIjoibWFsZSIsImxvY2FsZSI6ImVuIiwiY2xpZW50SUQiOiJtY2d6Z2xiRmsyZzFPY2pPZlVaQTFmcnFqWmRjc1ZnQyIsInVzZXJfaWQiOiJnb29nbGUtb2F1dGgyfDEwMDAxMjE2MjQ0NTA0ODQzMzkwNiIsIm5pY2tuYW1lIjoieXZlcy5yaWNoYXJkIiwiaWRlbnRpdGllcyI6W3siYWNjZXNzX3Rva2VuIjoieWEyOS56QUF2eFgtOW5qNTJpdl9YczlkMTNEa01KTHgyYUExQmdONEhEWnoxUTQzYXQ5QW9DdkhiQWI5OSIsInByb3ZpZGVyIjoiZ29vZ2xlLW9hdXRoMiIsImV4cGlyZXNfaW4iOjM1OTksInVzZXJfaWQiOiIxMDAwMTIxNjI0NDUwNDg0MzM5MDYiLCJjb25uZWN0aW9uIjoiZ29vZ2xlLW9hdXRoMiIsImlzU29jaWFsIjp0cnVlfV0sImNyZWF0ZWRfYXQiOiIyMDE0LTExLTA1VDE1OjEyOjQ3LjA2OFoiLCJnbG9iYWxfY2xpZW50X2lkIjoiNUdHS3ZaRVI5STJ4ZndjbzNsTHI3QVNhSGhYdzdhRDkiLCJpc3MiOiJodHRwczovL2F2YWxhbmNoZWNhLmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDEwMDAxMjE2MjQ0NTA0ODQzMzkwNiIsImF1ZCI6Im1jZ3pnbGJGazJnMU9jak9mVVpBMWZycWpaZGNzVmdDIiwiZXhwIjoxNDE3MjE5NTc0LCJpYXQiOjE0MTcxODM1NzR9.L54wY3mW8Ruaa7Mzg8S1bZTJwPjCArvXJAEn_G_t5gU"
        }
    };

    request.post(options, function (err, res, body) {
        if (err) {
            return console.error('upload failed:', err);
        }
        console.log('Upload successful!  Server responded with:', body);
    })
});

