'use strict';

angular.module('avalancheCanadaApp')
.service('AcAuth', function(ENV, $location, store, auth, ngToast){

    function signin() {
      console.log('setting loginRedirectUrl=', $location.url());
      store.set('loginRedirectUrl', $location.url());
      auth.signin({
        authParams: {scope: 'openid profile'},
        callbackURL: ENV.DOMAIN + '/login-complete',
        responseType: 'token'
      });
    };
    
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

    return {
      signin:        signin,
      signout:       signout,
      profile:       profile
    };
});
