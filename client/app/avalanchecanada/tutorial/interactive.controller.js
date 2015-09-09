'use strict';

angular.module('avalancheCanadaApp')
.config(function($stateProvider) {
  $stateProvider
    .state('ac.atesQuiz', {
      url: '^/ates-quiz',
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
      console.log(response);
      $scope.atesContent = response.data;
    });
})

;
