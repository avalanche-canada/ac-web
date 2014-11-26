#!/usr/bin/env node
'use strict';
var fs = require('fs');
var obs = require('./fixtures/observations');
var request = require('request');
var shortId = require('shortid');
var uuid = require('node-uuid');
var geohash = require('ngeohash');
var moment = require('moment');

var o = {
    sc: '{"slab":false,"sound":false,"snow":false,"temp":false}',
    ac: '{"ridingQuality":{"prompt":"Riding quality was:","options":["Amazing","Good","OK","Terrible"],"selected":"null"},"snowConditions":{"prompt":"Snow conditions were:","options":{"Crusty":false,"Powder":false,"Deep powder":false,"Wet":false,"Heavy":false,"Wind affected":false,"Hard":false}},"rideType":{"prompt":"We rode:","options":{"Mellow slopes":false,"Steep slopes":false,"Convex slopes":false,"Sunny slopes":false,"Cut-blocks":false,"Open trees":false,"Dense trees":false,"Alpine slopes":false}},"stayedAway":{"prompt":"We stayed away from:","options":{"Steep slopes":false,"Convex slopes":false,"Sunny slopes":false,"Cut-blocks":false,"Open trees":false,"Alpine slopes":false}},"weather":{"prompt":"The day was:","options":{"Stormy":false,"Windy":false,"Sunny":false,"Cold":false,"Warm":false,"Cloudy":false,"Foggy":false,"Wet":false}}}'
};

//obs.features = [obs.features[0]]
obs.features.forEach(function (ob) {
    var coord = ob.geometry.coordinates;

    var options =  {
        url: 'http://localhost:9000/api/min/submissions',
        formData: {
            latlng: JSON.stringify([coord[1], coord[0]]),
            datetime: moment().format(),
            avalancheCondtions: o.ac,
            ridingConditions: o.sc,
            comment: 'my comment',
            attachments: [
                fs.createReadStream(__dirname + '/fixtures/attachment.png'),
                fs.createReadStream(__dirname + '/fixtures/attachment.png')
            ]
        },
        headers: {
            "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI0ZTUzMjFiNGI1NzdmYzRjNTQwZGQ3OGZiMTg0YjM5MyIsImVtYWlsIjoieXZlcy5yaWNoYXJkQHRlc2VyYS5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImNsaWVudElEIjoibWNnemdsYkZrMmcxT2NqT2ZVWkExZnJxalpkY3NWZ0MiLCJwaWN0dXJlIjoiaHR0cHM6Ly9zZWN1cmUuZ3JhdmF0YXIuY29tL2F2YXRhci80YzhmZmE5NmFhNzYzNWZhMTg2Y2Q3YTM0MGFjYjRlMj9zPTQ4MCZyPXBnJmQ9aHR0cHMlM0ElMkYlMkZzc2wuZ3N0YXRpYy5jb20lMkZzMiUyRnByb2ZpbGVzJTJGaW1hZ2VzJTJGc2lsaG91ZXR0ZTgwLnBuZyIsInVzZXJfaWQiOiJhdXRoMHw1NDVhNDA2ZTk4MTUxNjBlOTE3NjIzODciLCJuYW1lIjoieXZlcy5yaWNoYXJkQHRlc2VyYS5jb20iLCJuaWNrbmFtZSI6Inl2ZXMucmljaGFyZCIsImlkZW50aXRpZXMiOlt7InVzZXJfaWQiOiI1NDVhNDA2ZTk4MTUxNjBlOTE3NjIzODciLCJwcm92aWRlciI6ImF1dGgwIiwiY29ubmVjdGlvbiI6IlVzZXJuYW1lLVBhc3N3b3JkLUF1dGhlbnRpY2F0aW9uIiwiaXNTb2NpYWwiOmZhbHNlfV0sImNyZWF0ZWRfYXQiOiIyMDE0LTExLTA1VDE1OjIxOjE4LjYwNFoiLCJnbG9iYWxfY2xpZW50X2lkIjoiNUdHS3ZaRVI5STJ4ZndjbzNsTHI3QVNhSGhYdzdhRDkiLCJpc3MiOiJodHRwczovL2F2YWxhbmNoZWNhLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw1NDVhNDA2ZTk4MTUxNjBlOTE3NjIzODciLCJhdWQiOiJtY2d6Z2xiRmsyZzFPY2pPZlVaQTFmcnFqWmRjc1ZnQyIsImV4cCI6MTQxNzA2NjIzMCwiaWF0IjoxNDE3MDMwMjMwfQ.Zr_aGtE7IEGpTioaJbO-PnnC0eX_iQv6EjepLoBV0xQ"
        }
    };

    request.post(options, function (err, res, body) {
        if (err) {
            return console.error('upload failed:', err);
        }
        console.log('Upload successful!  Server responded with:', body);
    })
});

