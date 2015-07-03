var express = require('express');
var router = express.Router();
var ast  = require('./ast');
var _ = require('lodash');
var bodyParser = require('body-parser');
var debug = require('debug')('dev');
var jsonParser = bodyParser.json();
var logger = require('winston');
var geocoder = require('geocoder');

var errorCallback = function(res, errStr){
    return function(err){
        logger.log('warn', errStr, err);
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
    //var filters = req.query; //! \todo

    if(req.query.latitude && req.query.longitude){
        ast.getProviderDistanceList(successCallback(res),
                        errorCallback(res, 'Error retrieving providers'),
                        req.query);
    }else{
         ast.getProviderList(successCallback(res),
                        errorCallback(res, 'Error retrieving providers'));
    }

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

    var provider = req.body;

    //! if not lat long provided then get one using location name
    if(!provider.pos.latitude && !provider.pos.longitude && provider.pos.location_name){
        geocoder.geocode(provider.pos.location_name , function ( err, data ) {
            if(err){
                errorCallback(res, 'error retrieving coordinates from geocode service')();
            }
            else{
                provider.pos.latitude  = data.results[0].geometry.location.lat;
                provider.pos.longitude = data.results[0].geometry.location.lng;
                addProvider();
            }
        });
    }
    else{
        addProvider();
    }

    var addProvider = function(provider){
        ast.addProvider(req.body,
                        successCallback(res),
                        errorCallback(res, 'Error adding provider'));
    }

});

//! Update provider[id] details
router.put('/providers/:provid', jsonParser, function (req, res) {
    ast.updateProvider(req.params.provid,
                              req.body,
                              successCallback(res),
                              errorCallback(res, 'Error updating provider'));
});

//! Get a list of courses
router.get('/courses', function (req, res) {

    if(req.query.latitude && req.query.longitude){
        ast.getCourseDistanceList(successCallback(res),
                        errorCallback(res, 'Error retrieving providers'),
                        req.query);
    }else{
         ast.getCourseList(successCallback(res),
                        errorCallback(res, 'Error retrieving providers'));
    }

});

//! Get course[id]
router.get('/courses/:courseId', function (req, res) {
    var courseId = req.params.courseId;

    console.log(courseId);
    if (courseId === 'tags'){
            ast.getCourseTagList(successCallback(res),
                        errorCallback(res, 'Error retrieving course tag list'));
    }
    else{
            ast.getCourse(courseId,
                    successCallback(res),
                    errorCallback(res, 'Error fetching course with id '+ courseId));
    }

});

//! Add Course for provider[id]
router.post('/courses', jsonParser, function (req, res) {
   ast.addCourse(req.body,
                 successCallback(res),
                 errorCallback(res, 'Error adding course'));
});

//! Update course[id]
router.put('/courses/:courseid', jsonParser, function (req, res) {
    ast.updateCourse(req.params.provid,
                     req.params.courseid,
                     req.body,
                     successCallback(res),
                     errorCallback(res, 'Error updating course'));
});

//! Add Instructor for provider[id]
router.post('/providers/:provid/instructors', jsonParser, function (req, res) {
   ast.addInstructor(req.params.provid,
                     req.body,
                     successCallback(res),
                     errorCallback(res, 'Error adding instructor'));
});

//! Update provider[id] Instructor[id]
router.put('/providers/:provid/instructors/:instructorid', jsonParser, function (req, res) {
   ast.updateInstructor(req.params.provid,
                        req.body,
                        successCallback(res),
                        errorCallback(res, 'Error updating instructor'));
});

module.exports = router;
