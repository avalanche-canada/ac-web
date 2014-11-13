'use strict';
/*
angular.module('avalancheCanadaApp')
    .config(function ($routeProvider) {

        $routeProvider
            .when('/collaborators', {
                templateUrl: 'app/collaborators/collaborators.html',
                controller: 'CollaboratorsCtrl'
            });
    });
*/
angular.module('avalancheCanadaApp')
.config(function ($stateProvider) {
    $stateProvider
      .state('ac.collaborators', {
        url: '^/collaborators',
        templateUrl: 'app/collaborators/collaborators.html',
        controller: ['Prismic', '$scope',
            function (Prismic, $scope) {

                Prismic.ctx().then(function(ctx){

                    $scope.ctx = ctx;

                    Prismic.bookmark('collaborators-government').then(function(result){
                            $scope.government = result.getStructuredText('generic.body').asHtml(ctx);
                    });

                    Prismic.bookmark('collaborators-other').then(function(result){
                            $scope.other = result.getStructuredText('generic.body').asHtml(ctx);
                    });


                });
            }]
      });
  });
