'use strict';
var _ = require('lodash');
var DOC = require("dynamodb-doc");
var docClient = new DOC.DynamoDB();
var logger = require('../../logger');
var ROLE_TABLE = process.env.ROLE_TABLE || 'ast-roles-dev';

module.exports.getRoles = function getRoles(uid, success, fail) {
    var params = { TableName: ROLE_TABLE };

    params.KeyConditions = [docClient.Condition('userId', 'EQ', uid)];

    docClient.query(params, function(err, res) {
        if (err) {
            fail(err);
        } else {
            if(res.Count <= 0) {
              fail('User not found uid=<' + uid + '>');
            }
            success(res.Items[0].roles);
        }
    });
};
