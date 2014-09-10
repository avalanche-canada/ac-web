'use strict';

angular.module('avalancheCanadaApp')

  .directive('fullPage', function() {
      return {
          restrict: 'E',
          link: function(scope, ele, attrs) {
              angular.element(ele).fullpage({
                //anchors: ['firstPage', 'secondPage', '3rdPage', '4thPage'],
                //sectionsColor: ['#4A6FB1', '#939FAA', '#323539'],
                scrollOverflow: true
            });
          }
      };
  })

  .controller('MainCtrl', function ($scope, $http) {

    /*$('#fullpage').fullpage({
                anchors: ['firstPage', 'secondPage', '3rdPage', '4thPage'],
                sectionsColor: ['#4A6FB1', '#939FAA', '#323539'],
                scrollOverflow: true
            });*/

    //$scope.awesomeThings = [];

    //$http.get('/api/things').success(function(awesomeThings) {
    //  $scope.awesomeThings = awesomeThings;
    //});

  });
