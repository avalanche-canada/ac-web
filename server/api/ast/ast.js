'use strict';
var _ = require('lodash');
var moment = require('moment');
var uuid = require('node-uuid');
var geohash = require('ngeohash');
var DOC = require("dynamodb-doc");
var geolib = require("geolib");
var docClient = new DOC.DynamoDB();


var AST_PROVIDER_TABLE = process.env.AST_PROVIDER_TABLE;
var AST_COURSE_TABLE = process.env.AST_COURSE_TABLE;

//! \return true if provider is valid (contains required fields)
var validProvider = function (provider){
    return (provider.pos &&
            provider.pos.latitude &&
            provider.pos.longitude &&
            provider.location_name &&
            provider.name &&
            provider.contact.phone &&
            provider.contact.email &&
            provider.contact.website &&
            provider.sponsor &&
            provider.license_expiry &&
            provider.insurance_expiry &&
            provider.license_agreement);
};

//! \return a provider as they are represented in the database
var provider = function (id, providerDetails){
    return { providerid : id,
            geohash : geohash.encode(providerDetails.pos.latitude, providerDetails.pos.longitude),
            location_name: providerDetails.location_name,
            name : providerDetails.name,
            contact : {
                phone: providerDetails.contact.phone,
                email: providerDetails.contact.email,
                website:providerDetails.contact.website
            },
            sponsor: providerDetails.sponsor,
            license_expiry: providerDetails.license_expiry,
            insurance_expiry: providerDetails.insurance_expiry,
            license_agreement: providerDetails.license_agreement,
            instructors: {}};
};

//! \return true if instructor is valid (contains required fields)
var validInstructor = function (instructor){
    return (instructor.name &&
            instructor.email &&
            instructor.caalevel &&
            instructor.memerships);
};

//! \return true if course is valid (contains required fields)
var validCourse = function (course){
    return (course.providerid &&
            course.pos &&
            course.pos.latitude &&
            course.pos.longitude &&
            course.location_name &&
            course.name &&
            course.date &&
            course.level &&
            course.desc &&
            course.tags);
};

//! create a course as it is represented in the db
var course = function (courseId, courseDetails){
    return {courseid: courseId,
            providerid: courseDetails.providerid,
            geohash: geohash.encode(courseDetails.pos.latitude, courseDetails.pos.longitude),
            location_name: courseDetails.location_name,
            name: courseDetails.name,
            date: courseDetails.date,
            level: courseDetails.level,
            desc: courseDetails.desc,
            tags: courseDetails.tags};
};


function getProviderDistanceList(success, fail, origin) {
    getProviderList(function(providerList){
                        providerList.forEach(function(provider){
                            provider.distance = geolib.getDistance(provider.pos, origin);
                        })
                        success(providerList);
                    },
                    fail);
};

function getProviderList(success, fail) {
    var params = { TableName: AST_PROVIDER_TABLE };

    docClient.scan(params, function(err, res) {
        if (err) {
            fail(err);
        } else {
            var providerList = res.Items;
            providerList.forEach(function(provider){
                provider.pos = geohash.decode(provider.geohash);
            })
            success(providerList);
        }
    });
};



function getProvider(provId, success, fail) {
    var params = { TableName: AST_PROVIDER_TABLE };
    params.KeyConditions = [docClient.Condition('providerid', 'EQ', provId)];

    docClient.query(params, function(err, res) {
        if (err) {
            fail(err);
        } else {
            var providerList = res.Items;
            providerList.forEach(function(provider){
                provider.pos = geohash.decode(provider.geohash);
            })
            success(providerList);
        }
    });
};



function addProvider(providerDetails, success, fail) {

    if (validProvider(providerDetails)){
        var params  = { TableName: AST_PROVIDER_TABLE,
                        Item: provider(uuid.v4(), providerDetails)};
        docClient.
            putItem(params, function(err, res) {
                if (err) {
                    fail(JSON.stringify(err));
                } else {
                    success(res.items);
                }
            });
    }
    else{
        fail('unable to add provider invalid input where provider = ' + JSON.stringify(providerDetails));
    }
};

//! cannot simply overwrite as that would remove instructor list. instead update all fields except instructors
function updateProvider(provId, providerDetails, success, fail) {

    if (validProvider(providerDetails)){
        var params  = {}
        params.TableName = AST_PROVIDER_TABLE;
        params.Key = {'providerid':provId};
        params.UpdateExpression = 'SET #name = :name, \
                                   geohash = :geohash, \
                                   location_name = :location_name, \
                                   contact = :contact, \
                                   sponsor = :sponsor, \
                                   license_expiry = :license_expiry, \
                                   license_agreement = :license_agreement, \
                                   insurance_expiry = :insurance_expiry';

        params.ExpressionAttributeNames = {'#name' : 'name'};
        params.ExpressionAttributeValues = {':name' : providerDetails.name,
                                            ':geohash' : geohash.encode(providerDetails.pos.latitude, providerDetails.pos.longitude),
                                            ':location_name' : providerDetails.location_name,
                                            ':contact' : providerDetails.contact,
                                            ':sponsor' : providerDetails.sponsor,
                                            ':license_expiry' : providerDetails.license_expiry,
                                            ':license_agreement' : providerDetails.license_agreement,
                                            ':insurance_expiry' : providerDetails.insurance_expiry };

        docClient.
            updateItem(params, function(err, res) {
                if (err) {
                    fail(err);
                } else {
                    success(res.items);
                }
            });
    }
    else{
        fail('unable to update provider invalid input where provider = ' + JSON.stringify(providerDetails));
    }
};

function getCourseDistanceList(success, fail, origin) {
    getCourseList(function(courseList){
                        courseList.forEach(function(course){
                            course.distance = geolib.getDistance(course.pos, origin);
                        })
                        success(courseList);
                    },
                    fail);
};

function getCourseTagList(success, fail) {

    getCourseList(function(courseList){
        var tagList = [];
        courseList.forEach(function(course){
            if(course.tags && course.tags.length > 0){
                course.tags.forEach(function(tag){
                    if (tagList.indexOf(tag) === -1){
                        tagList.push(tag);
                    }
                })
                //tagList = tagList.concat(course.tags);
            }
        });

        success(tagList);
    },
    fail);

};

function getCourseList(success, fail) {
    var params = { TableName: AST_COURSE_TABLE };

    docClient.scan(params, function(err, res) {
        if (err) {
            fail(err);
        } else {
            var courseList = res.Items;
            courseList.forEach(function(course){
                course.pos = geohash.decode(course.geohash);
            });
            success(courseList);
        }
    });
};

function getCourse(courseId, success, fail) {
    var params = { TableName: AST_PROVIDER_TABLE };
    params.KeyConditions = [docClient.Condition('courseid', 'EQ', courseId)];

    docClient.query(params, function(err, res) {
        if (err) {
            fail(err);
        } else {
            var providerList = res.Items;
            providerList.forEach(function(provider){
                provider.pos = geohash.decode(provider.geohash);
            });
            success(providerList);
        }
    });
};

function addCourse(courseDetails, success, fail) {

    if (validCourse(courseDetails)){
        var params  = { TableName: AST_COURSE_TABLE,
                        Item: course(uuid.v4(), courseDetails)};
        docClient.
            putItem(params, function(err, res) {
                if (err) {
                    fail(JSON.stringify(err));
                } else {
                    success(res.items);
                }
            });
    }
    else{
        fail('unable to add course invalid input where course = ' + JSON.stringify(courseDetails));
    }

}

function updateCourse(courseId, courseDetails, success, fail) {

    if (validCourse(courseDetails)){
        var params  = { TableName: AST_COURSE_TABLE,
                        Item: course(courseId, courseDetails)};

        console.log('updating course');
        //! \todo verify course exists
        docClient.
            putItem(params, function(err, res) {
                if (err) {
                    fail(JSON.stringify(err));
                } else {
                    success(res.items);
                }
            });
    }
    else{
        fail('unable to add course invalid input where course = ' + JSON.stringify(courseDetails));
    }
}

function addInstructor(provId, inctructorDetails, success, fail) {

    var instructorId = uuid.v4();

    var params  = {}
    params.TableName = AST_PROVIDER_TABLE;
    params.Key = {providerid:provId};
    params.UpdateExpression = 'SET instructors.#i = :x';
    params.ExpressionAttributeNames = {'#i' : instructorId};
    params.ExpressionAttributeValues = {':x' : inctructorDetails};

    console.log('Adding Course = ', JSON.stringify(params.ExpressionAttributeValues));

    docClient.
        updateItem(params, function(err, res) {
            if (err) {
                fail(err);
            } else {
                console.log('Sucesfully Added c', JSON.stringify(params.ExpressionAttributeValues));
                success(res.items);
            }
        });
}

function updateInstructor(provId, inctructorId, inctructor, success, fail) {

    var params  = {}
    params.TableName = AST_PROVIDER_TABLE;
    params.Key = {providerid:provId};
    params.UpdateExpression = 'SET instructors.#i = :x';
    params.ExpressionAttributeNames = {'#i' : instructorId};
    params.ExpressionAttributeValues = {':x' : inctructorDetails};

    console.log('Adding Course = ', JSON.stringify(params.ExpressionAttributeValues));

    docClient.
        updateItem(params, function(err, res) {
            if (err) {
                fail(err);
            } else {
                console.log('Sucesfully Added c', JSON.stringify(params.ExpressionAttributeValues));
                success(res.items);
            }
        });
}


module.exports = {
    getProviderList:getProviderList,
    getProvider:getProvider,
    addProvider:addProvider,
    updateProvider:updateProvider,
    getCourseList:getCourseList,
    getCourse:getCourse,
    addCourse:addCourse,
    updateCourse:updateCourse,
    addInstructor:addInstructor,
    updateInstructor:updateInstructor,
    getProviderDistanceList:getProviderDistanceList,
    getCourseDistanceList:getCourseDistanceList,
    getCourseTagList:getCourseTagList
}

