var express = require('express')
var router = express.Router()
const SPONSORS = require('./sponsors.json')

router.get('/sponsors/:date', function(req, res) {
    res.json(Object.assign({}, SPONSORS.default, SPONSORS[req.params.date]))
})

// Kept it so it won't clients right after deployment, can now be removed!
router.get('/sponsors.json', function(req, res) {
    res.json(SPONSORS)
})

module.exports = router
