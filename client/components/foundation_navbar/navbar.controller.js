/*jshint unused:vars*/
'use strict';

angular.module('avalancheCanadaApp')

  .directive('foundationNavbarHeaderMenu', function() {
      return {
          //restrict: 'E',
          templateUrl: 'components/foundation_navbar/header.html',
          link: function(scope, ele, attrs) {
          }
      };
  })

  .controller('FoundationNavbarCtrl', function ($rootScope, $scope, $location, $document) {

    $scope.env = $rootScope.env;

    $scope.about = [{'name':'mission','display':'Mission'},
                            {'name':'reports','display':'Annual Reports and Financial Statements'},
                            {'name':'board','display':'Board Of Directors'},
                            {'name':'honourary','display':'Honourary Directors'},
                            {'name':'contact','display':'Contact'},
                            {'name':'subscribe','display':'Subscribe to newsletter'}];


    $scope.programs = [{'name':'ac','display':'Avalanche Canada'},
                            {'name':'memorialFunds','display':'Memorial Funds and Scholarships'},
                            {'name':'memorialDonations','display':'Memorial Donations'}];

    //$scope.contributors = [{'name':'donors','display':'Donors'}];

  });
