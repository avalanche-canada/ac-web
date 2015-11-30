
angular.module('avalancheCanadaApp')
.config(function ($stateProvider) {
  $stateProvider
    .state('ac.ambassadors', {
      url: '^/ambassadors',
      templateUrl: 'app/avalanchecanada/ambassadors/ambassadors.html',
      controller: 'AmbassadorsCtrl'
    });
});
