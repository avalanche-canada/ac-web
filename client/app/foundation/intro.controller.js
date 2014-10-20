
angular.module('foundation')

  .controller('IntroCtrl', function ($scope, $location, $rootScope, $log) {

        $scope.showMore = function () {
            $rootScope.pageClass = 'page-down';
            $location.path('/foundation/more');
        };
    });
