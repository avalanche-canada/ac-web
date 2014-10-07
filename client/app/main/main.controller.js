/*jshint unused:vars*/
'use strict';

angular.module('avalancheCanadaApp')

  .controller('MoreCtrl', function ($scope, $rootScope, $location) {
    $scope.showMap = function () {
        $rootScope.pageClass = 'page-up';
        $location.path('/');
    };
  })
  .controller('MapCtrl', function ($scope) {
    $scope.scrollPage = function(){};
  });
