'use strict';
var _ = require('lodash');
var moment = require('moment');
var uuid = require('node-uuid');
var geohash = require('ngeohash');
var DOC = require("dynamodb-doc");
var docClient = new DOC.DynamoDB();

var AST_PROVIDER_TABLE = process.env.AST_PROVIDER_TABLE;
var AST_COURSE_TABLE = process.env.AST_COURSE_TABLE;


var validProvider = function (provider){
    return (provider.pos &&
            provider.pos.lat &&
            provider.pos.lng &&
            provider.name &&
            provider.contact.phone &&
            provider.contact.email &&
            provider.contact.website &&
            provider.sponsor &&
            provider.license_expiry &&
            provider.insurance_expiry &&
            provider.license_agreement);
};

var provider = function (id, providerDetails){
    return { providerid : id,
            geohash : geohash.encode(providerDetails.pos.lat, providerDetails.pos.lng),
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

var validInstructor = function (instructor){
    return (true);
};

var validCourse = function (course){
    return (course.providerid &&
            course.pos &&
            course.pos.lat &&
            course.pos.lng &&
            course.name &&
            course.date &&
            course.level &&
            course.desc &&
            course.tags);
};

var course = function (courseId, courseDetails){
    return {courseid: courseId,
            providerid: courseDetails.providerid,
            geohash: geohash.encode(courseDetails.pos.lat, courseDetails.pos.lng),
            name: courseDetails.name,
            date: courseDetails.date,
            level: courseDetails.level,
            desc: courseDetails.desc,
            tags: courseDetails.tags};
};

exports.getProviderList = function getProviderList(filters, success, fail) {
    var params = { TableName: AST_PROVIDER_TABLE };

    docClient.scan(params, function(err, res) {
        if (err) {
            fail(err);
        } else {
            var providerList = res.Items;
            success(providerList);
        }
    });
};

exports.getProvider = function getProvider(provId, success, fail) {
    var params = { TableName: AST_PROVIDER_TABLE };
    params.KeyConditions = [docClient.Condition('providerid', 'EQ', provId)];

    docClient.query(params, function(err, res) {
        if (err) {
            fail(err);
        } else {
            var providerList = res.Items;
            success(providerList);
        }
    });
};

exports.addProvider = function addProvider(providerDetails, success, fail) {

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
exports.updateProvider = function updateProvider(provId, providerDetails, success, fail) {

    if (validProvider(providerDetails)){
        var params  = {}
        params.TableName = AST_PROVIDER_TABLE;
        params.Key = {'providerid':provId};
        params.UpdateExpression = 'SET #name = :name, \
                                   geohash = :geohash, \
                                   contact = :contact, \
                                   sponsor = :sponsor, \
                                   license_expiry = :license_expiry, \
                                   license_agreement = :license_agreement, \
                                   insurance_expiry = :insurance_expiry';

        params.ExpressionAttributeNames = {'#name' : 'name'};
        params.ExpressionAttributeValues = {':name' : providerDetails.name,
                                            ':geohash' : geohash.encode(providerDetails.pos.lat, providerDetails.pos.lng),
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


exports.getCourseList = function getCourseList(filters, success, fail) {
    var params = { TableName: AST_COURSE_TABLE };

    docClient.scan(params, function(err, res) {
        if (err) {
            fail(err);
        } else {
            var providerList = res.Items;
            success(providerList);
        }
    });
};

exports.getCourse = function getCourse(courseId, success, fail) {
    var params = { TableName: AST_PROVIDER_TABLE };
    params.KeyConditions = [docClient.Condition('courseid', 'EQ', courseId)];

    docClient.query(params, function(err, res) {
        if (err) {
            fail(err);
        } else {
            var providerList = res.Items;
            success(providerList);
        }
    });
};

exports.addCourse = function addCourse(courseDetails, success, fail) {

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

exports.updateCourse = function updateCourse(courseId, course, success, fail) {

    if (validCourse(courseDetails)){
        var params  = { TableName: AST_COURSE_TABLE,
                        Item: course(courseId, courseDetails)};

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

exports.addInstructor = function addInstructor(provId, inctructorDetails, success, fail) {

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

exports.updateInstructor = function updateInstructor(provId, inctructorId, inctructor, success, fail) {

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


