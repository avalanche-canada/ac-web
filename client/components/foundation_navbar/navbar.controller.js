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


    $scope.about = [{'name':'mission','display':'Missions'},
                            {'name':'reports','display':'Annual Reports and Financial Statements'},
                            {'name':'board','display':'Board Of Directors'},
                            {'name':'honorary','display':'Honorary Directors'}];

    $scope.programs = [{'name':'application','display':'Application'},
                            {'name':'hugh','display':'Hugh and Helen Hincks Memorial Fund'},
                            {'name':'kelly','display':'Craig Kelly Memorial Fund'},
                            {'name':'ac','display':'Avalanche Canada Fund'},
                            {'name':'cora','display':'Cora Shea Memorial Fund'},
                            {'name':'al','display':'Al Hodgson Memorial Fund'}];

    $scope.contributors = [{'name':'sponsors','display':'Sponsors'},
                            {'name':'donors','display':'Donors'},
                            {'name':'partners','display':'Partners'}];

  });
