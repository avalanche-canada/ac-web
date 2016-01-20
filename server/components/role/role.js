'use strict';
var _ = require('lodash');
var AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-2'});
var dynamodb = new AWS.DynamoDB.DocumentClient();
var logger = require('../../logger');
var ROLE_TABLE = process.env.ROLE_TABLE || 'ast-roles-dev';
var Q = require('q');

module.exports.getRoles = function getRoles(uid, success, fail) {
    var params = { TableName: ROLE_TABLE };

    params.KeyConditionExpression = 'userId = :userId';
    params.ExpressionAttributeValues = {
        ':userId': uid
    };
    dynamodb.query(params, function(err, res) {
        if (err) {
            fail(err);
        } else {
            if(res.Count <= 0) {
              success([]);
            } else {
              success(res.Items[0].roles);
            }
        }
    });
};

module.exports.isRole = function isRole(uid, role) {
  return Q.Promise(function(resolve, reject){
    module.exports.getRoles(uid, function(roles){
      resolve(roles.indexOf(role) > -1);
    }, function(err){
      logger.error("Error accessing role for uid='" + uid +"'", err);
      resolve(false);
    });
  });
};

