'use strict';

angular.module('avalancheCanadaApp')
.service('AcAuth', function(ENV, $location, $timeout, store, auth, ngToast, $state){

    function signin() {
      auth.signin({
        authParams: {scope: 'openid profile'},
        callbackURL: ENV.DOMAIN + '/login-complete',
        responseType: 'token'
      });
    }

    function signout() {
      auth.signout();
      store.remove('profile');
      store.remove('token');
      ngToast.create({
        class: 'success',
        content: 'You have been logged out'
      });
      if ($state.current.name !== 'ac.map') {
        $timeout(function () {
          $state.go('ac.map', {}, {reload: true});
        }, 10);
      }
    }

    function profile() {
      if(auth.isAuthenticated) {
        return auth.profile;
      } else {
        return {};
      }
    }

    function isForecaster() {
        return auth.isAuthenticated &&
            auth.profile &&
            auth.profile.app_metadata &&
            auth.profile.app_metadata.roles &&
            _.find(auth.profile.app_metadata.roles, function (role) {
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
