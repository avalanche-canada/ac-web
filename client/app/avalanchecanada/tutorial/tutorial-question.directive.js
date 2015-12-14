'use strict';

angular.module('avalancheCanadaApp')
  .directive('acTutorialQuestion', function(){
    return {
      templateUrl: 'app/avalanchecanada/tutorial/tutorial-question.html',
      scope: {
        question: '='
      },
      controller: function($scope){
        $scope.dummy = {
            response: null
        };
      }
    };
  });
