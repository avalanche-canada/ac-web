'use strict';
var _ = require('lodash');
var DOC = require("dynamodb-doc");
var docClient = new DOC.DynamoDB();

var ROLE_TABLE = process.env.ROLE_TABLE;

module.exports.getRoles = function getRoles(uid, success, fail) {
    var params = { TableName: ROLE_TABLE };
    params.KeyConditions = [docClient.Condition('userId', 'EQ', uid)];

    docClient.query(params, function(err, res) {
        if (err) {
            fail(err);
        } else {
            success(res.Items);
        }
    });
};
