
'use strict';

angular.module('avalancheCanadaApp')
.config(function ($stateProvider) {
  $stateProvider
    .state('ac.loginComplete', {
      url: '^/login-complete',
      controller: 'AcAuthCtl',
    });
})
.controller('AcAuthCtl', function ($state, store) {
  var redir = store.get('loginRedirect');
  store.remove('loginRedirect');
  if (redir) {
      console.log('AcAuthCtl:: redirecting to:', redir);
      $state.go(redir);
  } else {
      $state.go('ac.map');
  }

});
