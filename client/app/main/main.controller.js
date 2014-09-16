/*jshint unused:vars*/
'use strict';

angular.module('avalancheCanadaApp')

  .directive('fullPage', function() {
      return {
          restrict: 'E',
          link: function(scope, ele, attrs) {
              angular.element(ele).fullpage({
                anchors: ['mapPage', 'infoPage'],
                scrollOverflow: true
                //menu: '#navbar',
                //fixedElements: '#navbar'
            });
          }
      };
  })

  .controller('MainCtrl', function () {

  });
