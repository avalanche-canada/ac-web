'use strict';

angular.module('avalancheCanadaApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('ac.hotzone', {
                url: 'hotzone',
                templateUrl: 'app/avalanchecanada/hotzone/hotzone.html',
                controller: 'HotZoneCtrl',
                data: {
                  requiresLogin: true,
                  roles: ['FORECASTER']
                }
            });
    });
