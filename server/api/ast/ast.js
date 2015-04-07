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
    success([{blah:'blah'}, {blah:'blah'}, {blah:'blah'}, {blah:'blah'}]);
};

exports.getProvider = function (provId, success, fail) {
    success({blah:'blah'});
};

exports.addProvider = function (provider, success, fail) {
    success({blah:'blah'});
};
