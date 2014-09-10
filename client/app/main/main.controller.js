'use strict';

angular.module('avalancheCanadaApp')

  .directive('fullPage', function() {
      return {
          restrict: 'E',
          link: function(scope, ele, attrs) {
              angular.element(ele).fullpage({
                anchors: ['mapPage', 'infoPage'],
                scrollOverflow: true
            });
          }
      };
  })

  .controller('MainCtrl', function ($scope, $http) {

  });
