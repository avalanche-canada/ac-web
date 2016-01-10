
angular.module('avalancheCanadaApp')
.config(function ($stateProvider) {
  $stateProvider
    .state('ac.ambassadors', {
      url: '^/ambassadors',
      templateUrl: 'app/avalanchecanada/ambassadors/ambassadors.html',
      controller: 'AmbassadorsCtrl',
      resolve: {
        page: function(Prismic) { return Prismic.bookmark('ambassadors'); }
      }
    })
    .state('ac.ambassadors_anchor', {
      url: '^/ambassadors/:anchor',
      templateUrl: 'app/avalanchecanada/ambassadors/ambassadors.html',
      controller: 'AmbassadorsCtrl',
      resolve: {
        page: function(Prismic) { return Prismic.bookmark('ambassadors'); }
      }
    });
});
