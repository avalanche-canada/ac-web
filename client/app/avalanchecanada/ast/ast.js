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
.controller('AstProvidersCtrl', function ($scope, $log) {
  $log.debug("AstProvidersCtrl Initialized")
})
.controller('AstCoursesCtrl', function ($scope, $log) {
  $log.debug("AstCoursesCtrl Initialized")
});
