/*jshint unused:vars*/
'use strict';

angular.module('avalancheCanadaApp')

  .directive('fullPage', function() {
      return {
          restrict: 'E',
          link: function(scope, ele, attrs) {
              /*angular.element(ele).fullpage({
                anchors: ['mapPage', 'infoPage'],
                sectionsColor: ['#4A6FB1', '#939FAA', '#323539'],
                scrollOverflow: true,
                paddingTop: '0px'
            });*/
          }
      };
  })

  .controller('MainCtrl', function () {

  });
