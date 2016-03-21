'use strict';

angular.module('avalancheCanadaApp')
.service('AcAuth', function(ENV, $location, store, auth){

    function signin() {
      auth.signin({
        authParams: {scope: 'openid profile'},
        callbackURL: ENV.DOMAIN + '/login-complete',
        responseType: 'token'
      });
    }

    function signout() {
      auth.signout();
    }

    function profile() {
      if(auth.isAuthenticated) {
        return auth.profile;
      } else {
        return {};
      }
    }

    function isForecaster() {
        return auth.isAuthenticated && _.find(auth.profile.app_metadata.roles, function (role) {
            return role.toLowerCase() === 'forecaster';
        }) !== undefined;
    }

    return {
      signin:        signin,
      signout:       signout,
      profile:       profile,
      isForecaster:  isForecaster
    };
});
