'use strict';
var _ = require('lodash');
var moment = require('moment');
var uuid = require('node-uuid');
var geohash = require('ngeohash');
var DOC = require("dynamodb-doc");
var docClient = new DOC.DynamoDB();

var AST_PROVIDER_TABLE = process.env.AST_PROVIDER_TABLE;
var AST_COURSE_TABLE = process.env.AST_COURSE_TABLE;
var AST_INSTRUCTOR_TABLE = process.env.AST_INSTRUCTOR_TABLE;

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
            courses:[],
            instructors:[]};
};

var validInstructor = function (instructor){
    return (true);
};

var validCourse = function (course){
    return (true);
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

exports.updateProvider = function updateProvider(provId, providerDetails, success, fail) {

    if (validProvider(providerDetails)){
        var params  = { TableName: AST_PROVIDER_TABLE,
                        Item: provider(provId, providerDetails)};

        params.ConditionExpression = 'providerid = :id';
        params.ExpressionAttributeValues = {':id': provId};

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
        fail('unable to update provider invalid input where provider = ' + JSON.stringify(providerDetails));
    }
};

exports.addCourse = function addCourse(provId, courseDetails, success, fail) {

    var courseId = uuid.v4();

    var params  = {}
    params.TableName = AST_TABLE;
    params.Key = {providerid:provId};
    params.UpdateExpression = 'SET #courses#i = :x';
    params.ExpressionAttributeNames  = {'#courses' : 'courses'};
    params.ExpressionAttributeValues = {':x' : courseDetails};
    params.ExpressionAttributeNames = {'#i' : courseId};

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

exports.updateCourse = function updateCourse(provId, courseId, course, success, fail) {
    var params  = {}
    params.TableName = AST_TABLE;
    params.Key = {providerid:provId};
    params.ConditionExpression = ":x.id = :y";
    params.UpdateExpression = 'SET #courses = list_append(#courses, :x)';
    params.ExpressionAttributeNames  = {'#courses' : 'courses'};
    params.ExpressionAttributeValues = {':x' : course};
    params.ExpressionAttributeValues = {':y' : courseId};


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

exports.addInstructor = function addInstructor(provId, inctructor, success, fail) {}

exports.updateInstructor = function updateInstructor(provId, inctructorId, inctructor, success, fail) {}


