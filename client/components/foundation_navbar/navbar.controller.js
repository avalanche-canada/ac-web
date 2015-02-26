/*jshint unused:vars*/
'use strict';

angular.module('avalancheCanadaApp')

    /*
  .directive('multiLevelPushMenu', function($document) {
      return {
          //restrict: 'E',
          templateUrl: 'components/foundation_navbar/pushmenu.html',
          link: function(scope, ele, attrs) {


              angular.element(ele).multilevelpushmenu({
                  containersToPush: [$('#page-wrap')],
                  menuWidth: '320px',
                  menuHeight: '100%',
                  collapsed: true,
                  fullCollapse: true,
                  backText: '',
                  overlapWidth:60
              });

              scope.pushMenuOpen = false;
              scope.multiExpand = function() { scope.pushMenuOpen = true; angular.element(ele).multilevelpushmenu('expand'); };
              scope.multiCollapse = function() { scope.pushMenuOpen = false; angular.element(ele).multilevelpushmenu('collapse'); };

              //! \todo is this nescessary ?
              angular.element(ele).multilevelpushmenu('option', 'menuHeight', $document.height());
              angular.element(ele).multilevelpushmenu('redraw');
          }
      };
  })*/



  .directive('foundationNavbarHeaderMenu', function() {
      return {
          //restrict: 'E',
          templateUrl: 'components/foundation_navbar/header.html',
          link: function(scope, ele, attrs) {
          }
      };
  })

  .controller('FoundationNavbarCtrl', function ($scope, $location, $document) {


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
