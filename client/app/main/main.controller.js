/*jshint unused:vars*/
'use strict';

angular.module('avalancheCanadaApp')

  .directive('fullPage', function() {
      return {
          restrict: 'E',
          link: function(scope, ele, attrs) {
              angular.element(ele).fullpage({
                anchors: ['map', 'more'],
                scrollOverflow: true
                //menu: '#navbar',
                //fixedElements: '#navbar'
            });

            scope.scrollPage = function(){
                angular.element(ele).fullpage.moveSectionDown();
            };

          }
      };
  })

  .controller('MainCtrl', function () {

  });
