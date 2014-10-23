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
        controller: 'CollaboratorsCtrl'
      });
  });
