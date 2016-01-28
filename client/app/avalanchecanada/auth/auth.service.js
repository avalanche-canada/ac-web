'use strict';

angular.module('avalancheCanadaApp')
.service('AcAuth', function(ENV, $location, store, auth, ngToast){
    function loginCallback(profile, idToken, accessToken, state, refreshToken) {
        store.set('profile', profile);
        store.set('token', idToken);
    };

    function errorCallback(error) {
      console.log('Error authenticating user:',error);
      ngToast.create({
        content: 'Error logging in: ' + JSON.stringify(error),
        class: 'warn'
      });
    };

    function signin() {
      console.log('setting loginRedirectUrl=', $location.url());
      store.set('loginRedirectUrl', $location.url());
      auth.signin(
          {
            authParams: {scope: 'openid profile'},
            callbackURL: ENV.DOMAIN + '/login-complete',
            responseType: 'token'
          }//, 
          //loginCallback, 
          //errorCallback
      );
    };
    
    function signout() {
      auth.signout(function(){
        console.log('yayayayay');
      });
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
