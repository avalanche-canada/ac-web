/*jshint unused:vars*/
'use strict';

angular.module('avalancheCanadaApp')

  .directive('fullPage', function() {
      return {
          restrict: 'A',
          link: function(scope, ele, attrs) {
              angular.element(ele).fullpage({
                anchors: ['map', 'more'],
                scrollOverflow: true
            });

            scope.scrollPage = function(){
                angular.element(ele).fullpage.moveSectionDown();
            };

          }
      };
  })

  .controller('MainCtrl', function () {

  });
