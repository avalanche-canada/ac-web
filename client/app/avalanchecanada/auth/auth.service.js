
'use strict';
angular.module('avalancheCanadaApp')
.service('AcAuth', function(store, auth, ngToast){
    function loginCallback(profile, idToken, accessToken, state, refreshToken) {
        console.log('Using My new callback');

        store.set('profile', profile);
        store.set('token', idToken);
    };

    function errorCallback(error) {
      console.log('Error logging in:',error);
      ngToast.create({
        content: 'Error logging in: ' + JSON.stringify(error),
        class: 'warn'
      });
    };

    function signin() {
      auth.signin(
          {authParams: {scope: 'openid profile'}}, 
          loginCallback, 
          errorCallback
      );
    };
    
    function signout() {
      console.log("In custom signout");
      auth.signout(function(){
        console.log('yayayayay');
      });
      ngToast.create({
        class: 'success',
        content: 'You have been logged out'
      });
    } 

    return {
      signin:        signin,
      signout:       signout,
      loginCallback: loginCallback,
      errorCallback: errorCallback
    };
});
