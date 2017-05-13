'use strict';
var path = require('path');

var express = require('express');

var router = express.Router();

router.get('/favicon.ico', (req, res) => {
    res.sendFile(path.join(__dirname, 'img/favicon.ico'));
});

module.exports = router;
