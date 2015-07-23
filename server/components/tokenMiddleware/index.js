'use strict';

var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

// route middleware to verify a token
router.use(function (req, res, next) {


  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorization'];

  // decode token
  if (token) {

    // \todo var secret = router.get('superSecret') | add auth0 secret key as an env var
    var secret = 'pT6ehAfy_LiHB1c7-GyUJUDsEjiJUt_w0qGa10TLJUMCho8gGqUjRDVobboLdwOy';
    //var secret = 'sagjdkfasjgfaldjkvbczkxugvkzjx,vcaksugcoiaks';

    // verifies secret and checks exp
    jwt.verify(token, secret , function(err, decoded) {
      if (err) {

        res.setHeader('WWW-Authenticate', 'Basic realm="www.avalanche.ca"')
        console.log('failed to authenticate request', token);
        return res.status(401)
                  .send({
                  success: false,
                  message: 'Failed to authenticate token'
              });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {

    console.log('no token provided ', req.headers);
    // if there is no token
    // return an error
    res.setHeader('WWW-Authenticate', 'Basic realm="www.avalanche.ca"')
    return res.status(401)
              .send({
                success: false,
                message: 'No token provided.'
    });

  }
});

module.exports = router;
