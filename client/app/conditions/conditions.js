'use strict';

angular.module('avalancheCanadaApp')
.config(function ($stateProvider) {
    $stateProvider
      .state('ac.conditions', {
        url: '^/conditions',
        templateUrl: 'app/conditions/conditions.html',
        controller: 'ConditionsCtrl'
      })
      .state('ac.condtionsItem', {
        url: '^/conditions/:date/:category',
        templateUrl: 'app/conditions/conditionsItem.html',
        controller: 'ConditionsItemCtrl'
      });

  });

