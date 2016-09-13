var path = require('path');
var express = require('express');

var router = express.Router();

router.get('/sponsors.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'sponsors.json'));
})

module.exports = router;

