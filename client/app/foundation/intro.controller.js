'use strict';

angular.module('avalancheCanadaApp')

  .controller('FoundationIntroCtrl', function ($scope, $state, $rootScope) {

        $scope.showMore = function () {
            $rootScope.pageClass = 'page-down';
             $state.go('foundation.more');
        };
    });
