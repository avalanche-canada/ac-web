var express = require('express');
var router = express.Router();
var ast  = require('./ast');
var _ = require('lodash');
var bodyParser = require('body-parser');
var debug = require('debug')('dev');
var jsonParser = bodyParser.json();

var errorCallback = function(res, errStr){
    return function(err){
        console.log (errStr, err);
        res.send(500, {error: errStr})
    };
};

var successCallback = function(res){
    return function(ret){
        res.json(ret);
    }
};

//! Get Provider List
router.get('/providers', function (req, res) {
    var filters = req.query; //! \todo
    ast.getProviderList(filters,
                        successCallback(res),
                        errorCallback(res, 'Error retrieving providers'));
});

//! get provider with id
router.get('/providers/:provid', function (req, res) {
    var provid = req.params.provid;
    ast.getProvider(provid,
                    successCallback(res),
                    errorCallback(res, 'Error fetching provider with id '+ provid));
});

//! Add provider (details + courses + instructors)
router.post('/providers', jsonParser, function (req, res) {
    ast.addProvider(req.body,
                    successCallback(res),
                    errorCallback(res, 'Error adding provider'));
});

//! Update provider[id] details
router.put('/providers/:provid', jsonParser, function (req, res) {
    ast.updateProvider(req.params.provid,
                              req.body,
                              successCallback(res),
                              errorCallback(res, 'Error updating provider'));
});

//! Add Course for provider[id]
router.post('/courses/:provid', jsonParser, function (req, res) {
   ast.addCourse(req.params.provid,
                 req.body,
                 successCallback(res),
                 errorCallback(res, 'Error adding course'));
});

//! Update course[id]
router.put('/course/:courseid', jsonParser, function (req, res) {
    ast.updateCourse(req.params.provid,
                     req.params.courseid,
                     req.body,
                     successCallback(res),
                     errorCallback(res, 'Error updating course'));
});

//! Add Instructor for provider[id]
router.post('/instructor/:provid', jsonParser, function (req, res) {
   ast.addInstructor(req.params.provid,
                     req.body,
                     successCallback(res),
                     errorCallback(res, 'Error adding instructor'));
});

//! Update provider[id] Instructor[id]
router.put('/instructor/:courseid', jsonParser, function (req, res) {
   ast.updateInstructor(req.params.provid,
                        req.body,
                        successCallback(res),
                        errorCallback(res, 'Error updating instructor'));
});

module.exports = router;
