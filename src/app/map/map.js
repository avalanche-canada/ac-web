/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

 /**
 * Homepage module
 */
angular.module( 'avalancheCanada.map', [
  'ui.router',
  'plusOne',
  'directives.interactiveMap'
])

.config(function config( $stateProvider) {
  $stateProvider

  .state( 'map', {
    abstract: true,
    url: '/map',
    views: {
      "main": {
        controller: 'MapCtrl',
        templateUrl: 'map/map.tpl.html'
      }
    },
    data:{ pageTitle: 'Avalanche Canada' }
  })

  .state( 'map.home', {
      url: '^/home',
      data:{ pageTitle: 'Home' },
      views: {
        "": {
          controller: 'HomeCtrl',
          templateUrl: 'map/home.tpl.html'
        }
      }
    })

  .state( 'map.bulletin', {
      url: '^/bulletin/{region}',
      data:{ pageTitle: 'Bulletin' },
      views: {
        "": {
          controller: 'BulletinCtrl',
          templateUrl: 'map/bulletin.tpl.html'
        }
      }
    })

    .state( 'map.incident', {
      url: '^/incident',
      views: {
        "": {
          controller: 'IncidentCtrl',
          templateUrl: 'map/incident.tpl.html'
        }
      }
    });

})


/**
 * Map Controller
 * $log angular log service
 * ENV environment constants
 * $scope application model object
 */
.controller( 'MapCtrl', function ( $scope, ENV, $log, $location ) {
})


/**
 * Bulletin Controller
 * $log angular log service
 * ENV environment constants
 * $scope application model object
 */
.controller( 'BulletinCtrl', function ( $scope, ENV, $log, $location, $stateParams ) {
   $scope.bulletintext = "Bulletin Text for" + $stateParams.regionName;
})

/**
 * Incident Controller
 * $log angular log service
 * ENV environment constants
 * $scope application model object
 */
.controller( 'IncidentCtrl', function ( $scope, ENV, $log, $location ) {
   $scope.incidenttext = "Incident Text";
})

/**
 * Home Controller
 * $log angular log service
 * ENV environment constants
 * $scope application model object
 */
.controller( 'HomeCtrl', function ( $scope, ENV, $log, $location ) {

});

