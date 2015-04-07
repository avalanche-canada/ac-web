'use strict';
var _ = require('lodash');
var moment = require('moment');
var uuid = require('node-uuid');

var DOC = require("dynamodb-doc");
var docClient = new DOC.DynamoDB();

var AST_TABLE = process.env.AST_DYNAMODB_TABLE;

exports.getProviderList = function getProviderList(filters, success, fail) {

    console.log('getting provders from' + AST_TABLE);

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

    console.log('getting provider from' + AST_TABLE + 'with id' + provId);

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

    console.log('Adding provider to ' + AST_TABLE + ' provider = ', JSON.stringify(params.Item));

    docClient.
        putItem(params, function(err, res) {
            if (err) {
                fail(err);
            } else {
                //var providerList = res.Items;
                success(res);
            }
        });
};

exports.updateProvider = function updateProvider(provId, provider, success, fail) {
    var params  = {}
    params.TableName = AST_TABLE;
    params.Key = {providerid:provId};

    provider.providerid = provId;

    params.UpdateExpression = 'SET #a = :x';
    params.ExpressionAttributeNames  = {'#a' : 'provider'};
    params.ExpressionAttributeValues = {':x' : provider};

    console.log('Updating provider = ', JSON.stringify(params.ExpressionAttributeValues));

    docClient.
        updateItem(params, function(err, res) {
            if (err) {
                fail(err);
            } else {
                //var providerList = res.Items;
                success(res);
            }
        });
};
