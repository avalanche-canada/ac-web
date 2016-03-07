
'use strict';

angular.module('avalancheCanadaApp')
.config(function ($stateProvider) {
    $stateProvider
      .state('ac.redirectKakwa', {
        url: '^/kakwa',
        controller: function($window) {
          $window.location.href = 'http://www.yukonavalanche.ca/wx/weatherCAC.php?station=CACKAK';
        }
      })
      .state('ac.redirectResources', {
        url: '^/fxresources/:filename',
        controller: function($window, $stateParams) {
          $window.location.href = 'https://avalancheca-assets.s3.amazonaws.com/' + $stateParams.filename;
        }
      });
  });
