angular.module( 'avalancheCanada', [
  'templates-app',
  'templates-common',
  'avalancheCanada.home',
  'avalancheCanada.about',
  'avalancheCanada.bulletin',
  'ui.router',
  'constants'
])


.run(
  [ '$rootScope', '$state', '$stateParams', 'ENV',
    function ($rootScope, $state, $stateParams, ENV) {

      // It's very handy to add references to $state and $stateParams to the $rootScope
      // so that you can access them from any scope within your applications.
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
      $rootScope.ENV = ENV;

    }
  ]
)

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/home' );
})


.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | Avalanche Canada' ;
    }
  });
})

;

