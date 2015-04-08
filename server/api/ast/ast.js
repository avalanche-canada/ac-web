'use strict';
var _ = require('lodash');
var moment = require('moment');
var uuid = require('node-uuid');

var DOC = require("dynamodb-doc");
var docClient = new DOC.DynamoDB();

var AST_TABLE = process.env.AST_DYNAMODB_TABLE;

exports.getProviderList = function getProviderList(filters, success, fail) {
    var params = { TableName: AST_TABLE };

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
    var params = { TableName: AST_TABLE };
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

exports.addProvider = function addProvider(provider, success, fail) {
    var params  = { TableName: AST_TABLE };
    params.Item =  provider;
    params.Item.providerid = uuid.v4();

    docClient.
        putItem(params, function(err, res) {
            if (err) {
                fail(err);
            } else {
                success(res.items);
            }
        });
};

exports.updateProviderDetails = function updateProviderDetails(provId, provider, success, fail) {
    var params  = {}
    params.TableName = AST_TABLE;
    params.Key = {providerid:provId};

    provider.providerid = provId;

    params.UpdateExpression = 'SET #a = :x';
    params.ExpressionAttributeNames  = {'#a' : 'provider'};
    params.ExpressionAttributeValues = {':x' : provider};

    docClient.
        updateItem(params, function(err, res) {
            if (err) {
                fail(err);
            } else {
                success(res.items);
            }
        });
};

exports.addCourse = function addCourse(provId, course, success, fail) {
    var params  = {}
    params.TableName = AST_TABLE;
    params.Key = {providerid:provId};
    params.UpdateExpression = 'SET #courses = list_append(#courses, :x)';
    params.ExpressionAttributeNames  = {'#courses' : 'courses'};
    params.ExpressionAttributeValues = {':x' : course};

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

}

exports.addInstructor = function addInstructor(provId, inctructor, success, fail) {}

exports.updateInstructor = function updateInstructor(provId, inctructorId, inctructor, success, fail) {}


