
angular.module('foundation')

  .controller('FoundationIntroCtrl', function ($scope, $state, $rootScope, $log) {

        $scope.showMore = function () {
            $rootScope.pageClass = 'page-down';
             $state.go('foundation.more');
        };
    });
