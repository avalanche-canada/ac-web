'use strict';

angular.module('avalancheCanadaApp')
    .config(function ($routeProvider) {

        $routeProvider
            .when('/collaborators', {
                templateUrl: 'app/collaborators/collaborators.html',
                controller: 'CollaboratorsCtrl'
            });
    });
