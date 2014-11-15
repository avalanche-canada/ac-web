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
                            {'name':'honourary','display':'Honourary Directors'}];

    $scope.programs = [{'name':'application','display':'Application'},
                            {'name':'hincks','display':'Hugh and Helen Hincks Memorial Fund'},
                            {'name':'kelly','display':'Craig Kelly Memorial Fund'},
                            {'name':'ac','display':'Avalanche Canada Fund'},
                            {'name':'shea','display':'Cora Shea Memorial Fund'},
                            {'name':'hodgson','display':'Al Hodgson Memorial Fund'}];

    $scope.contributors = [{'name':'donors','display':'Donors'},
                            {'name':'partners','display':'Partners'}];

  });
