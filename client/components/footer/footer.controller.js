'use strict';

angular.module('avalancheCanadaApp')
  .controller('FooterCtrl', function ($rootScope, $scope) {
     $scope.env = $rootScope.env;
  });
