'use strict';
var _ = require('lodash');
var moment = require('moment');
var uuid = require('node-uuid');
var moment = require('moment');
var im = require('imagemagick-stream');

var DOC = require("dynamodb-doc");
var docClient = new DOC.DynamoDB();

var AST_TABLE = process.env.AST_DYNAMODB_TABLE;

exports.getProviderList = function (filters, success, fail) {

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

exports.getProvider = function (provId, success, fail) {
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

exports.addProvider = function (provider, success, fail) {
    success({blah:'blah'});
};
