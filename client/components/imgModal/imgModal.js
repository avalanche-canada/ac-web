'use strict';

angular.module('avalancheCanadaApp')

  .directive('imgModal', function($modal) {
      return {
          restrict: 'E',
          scope:{
              thumb: '=thumb',
              highRes: '=high'
          },
          template: '<div class="imgModal"><a href="" ng-click="openModal()"><img src="{{thumb}}" class="img-responsive"/></a></div>',
          link: function(scope) {

            scope.openModal = function () {
              $modal.open({
                  template: '<img class="img-responsive" src="{{highRes}}" ng-click="close()">',
                  controller: ['$scope', 'highRes',
                    function ($scope, highRes) {
                      $scope.highRes = highRes;
                    }],
                  size: 'lg',
                  resolve: {
                    highRes: function () {
                      return scope.highRes;
                    }
                  }
                });
            };
          }
      };
  });

