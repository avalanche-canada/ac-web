'use strict';

angular.module('avalancheCanadaApp')
.config(function($stateProvider) {
  $stateProvider
    .state('ac.atesQuiz', {
      url: '^/tutorial/ates-quiz',
      templateUrl: 'app/avalanchecanada/tutorial/ates.html',
      controller: 'AtesCtrl'
    });
})
.controller('AtesCtrl', function($scope, $http){


  $scope.isCorrect = function(img) {
    return  typeof(img.current_answer) !== 'undefined' && 
            img.current_answer === img.answer;
  };

  $scope.isNotCorrect = function(img) {
    return typeof img.current_answer !== 'undefined' && 
           img.current_answer !== img.answer;
  };

  $http
    .get('/app/avalanchecanada/tutorial/ates_exercise.json')
    .then(function(response){
      $scope.atesContent = response.data;
    });
})

;
