angular.module( 'avalancheCanada.bulletin', [
  'ui.router',
  'placeholders',
  'ui.bootstrap',
  'ngResource'
])

.config(function config( $stateProvider ) {
  $stateProvider
    //! Abstract top level bulletin State.
    .state( 'bulletin', {
      abstract: true,
      url: '/bulletin',
      data:{ pageTitle: 'Bulletin' }
    })

    //! Bulletin Map State
    .state( 'bulletin.map', {
      //! Empty URL means that this state is active when its parent URL is navigated to
      url: '',
      views: {
        "main": {
          controller: 'MapCtrl',
          templateUrl: 'bulletin/map.tpl.html'
        }
      }
    })

    //! Bulletin Regional View State
    .state( 'bulletin.region', {
      //! URL Param regionName
      url: '/{regionName}',
      views: {
        "main": {
          controller: 'BulletinCtrl',
          templateUrl: 'bulletin/bulletin.tpl.html'
        }
      }
    });
})

.controller( 'MapCtrl', function MapCtrl( $scope ) {

})


.controller( 'BulletinCtrl', function BulletinCtrl( $scope ) {

});
