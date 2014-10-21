'use strict';

angular.module('foundation')

  .controller('FoundationIntroCtrl', function ($scope, $state, $rootScope) {

        $scope.showMore = function () {
            $rootScope.pageClass = 'page-down';
             $state.go('foundation.more');
        };
    });
