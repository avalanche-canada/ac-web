'use strict';

var proxy = require('express-http-proxy'),
    url = require('url'),
    avCanPrefix = '/v1_1/avalanche-ca',
    cloudinary_auth = new Buffer(process.env.CLOUDINARY_AUTH).toString(
        'base64'
    );

var proxyCloudinary = proxy('https://api.cloudinary.com', {
    forwardPath: function(req, res) {
        var newPath = url.parse(req.url).path;
        newPath = avCanPrefix + newPath;
        return newPath;
    },

    decorateRequest: function(req) {
        req.headers['Authorization'] = 'Basic ' + cloudinary_auth;
    },
});

module.exports = proxyCloudinary;
