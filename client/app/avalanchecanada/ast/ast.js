'use strict';

angular.module('avalancheCanadaApp')
.config(function ($stateProvider) {
  $stateProvider
    .state('ac.astProviders', {
      url: '^/ast/providers',
      templateUrl: 'app/avalanchecanada/ast/providers.html',
      controller: 'AstProvidersCtrl'
    })
    .state('ac.astCourses', {
      url: '^/ast/courses',
      templateUrl: 'app/avalanchecanada/ast/courses.html',
      controller: 'AstCoursesCtrl'
    });

})
.controller('AstProvidersCtrl', function ($scope, $http, $log) {
  $scope.providers = []
  $scope.providers_page = true;

  $http.get('/api/ast/providers').then(function (res) {
    $scope.providers = res.data;
  });

  $scope.toggleMoreInfo = function(provider){
    provider.more_info = !provider.more_info
  }

})
.controller('AstCoursesCtrl', function ($scope, $http, $log) {
  $scope.courses = [];
  $scope.courses_page = true;

  $http.get('/api/ast/courses').then(function (res) {
    $scope.courses = res.data;
  });

  $scope.toggleMoreInfo = function(course){
    course.more_info = !course.more_info
  }

});
