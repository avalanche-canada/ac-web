
'use strict';

angular.module('avalancheCanadaApp')
.config(function ($stateProvider) {
  $stateProvider
    .state('ac.loginComplete', {
      url: '^/login-complete',
      controller: 'AcAuthCtl',
    });
})
.controller('AcAuthCtl', function ($location, store) {
  var redir = store.get('loginRedirectUrl');
  if (redir) {
      console.log('AcAuthCtl:: redirecting to:', redir);
      $location.path('/' + redir);
  } else {
      $location.path('/');
  }

});
