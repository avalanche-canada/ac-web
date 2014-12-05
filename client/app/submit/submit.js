'use strict';

angular.module('avalancheCanadaApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('ac.submit', {
                url: '^/submit',
                templateUrl: 'app/submit/submit.html',
                controller: 'SubmitCtrl',
                data: {
                  requiresLogin: true
                }
            });
    });
