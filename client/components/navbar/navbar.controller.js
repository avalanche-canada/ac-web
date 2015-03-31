/*jshint unused:vars*/
'use strict';

angular.module('avalancheCanadaApp')
  
  .directive('responsivePushMenu', function($document) {
      return {
          //restrict: 'E',
          templateUrl: 'components/navbar/pushmenu.html',
          link: function(scope, ele, attrs) {
            window.slideoutPushmenu = new Slideout({
              'panel': document.getElementById('app-body'),
              'menu': document.getElementById('app-pushmenu'),
              'padding': 256,
              'tolerance': 70
            });

          }
      };
  })



  .directive('navbarHeaderMenu', function() {
      return {
          //restrict: 'E',
          templateUrl: 'components/navbar/header.html',
          link: function(scope, ele, attrs) {

            //! \todo i cant get this working spent to long already must be missing something
            //scope.pageWith = '{"width":"'+$document.width()+'px"}';


             //custom js for the left of the mega menu fun
              /*$("ul.nav > li").each(function(){
                  //assign li id and rebuild for jquery
                  li_id = "#" + this.id;
                  //get left position of li parent
                  yamm_offset = $(li_id).offset();
                  yamm_left = "-=" + yamm_offset.left;
                  //rebuild jquery element id
                  li_id_drop_down = li_id + " .dropdown-menu";
                  //assign the left position to the mega menu
                  $(li_id_drop_down).css("left", yamm_left);
              });
              //Returns width of browser viewport
              var browser_viewport = $(window).width();
              //set the yamm - mega menu width
              $(".dropdown-menu").width(browser_viewport);
              //weird hover off bug. Need to apply open class and remove - http://stackoverflow.com/questions/8878033/how-to-make-twitter-bootstrap-menu-dropdown-on-hover-rather-than-click
              $('ul.nav li.dropdown').hover(function() {
                $(this).addClass('open');
              }, function() {
                $(this).removeClass('open');
              });
              /**/
          }
      };
  })

  .controller('NavbarCtrl', function ($scope, $rootScope, $location, $document, auth, store) {
    $scope.env = $rootScope.env;
    $scope.auth = auth;
    $scope.forecastRegions = [{'name':'Banff Yoho & Kootenay National Park', 'link':'<a href="http://avalanche.pc.gc.ca/bulletin-eng.aspx?r=1&d=TODAY" target="_blank" data-toggle="collapse" data-target=".navbar-collapse" >Banff Yoho & Kootenay National Park</a>'},
                            {'name':'Glacier National Park', 'link':'<a href="http://avalanche.pc.gc.ca/bulletin-eng.aspx?r=3&d=TODAY" target="_blank" data-toggle="collapse" data-target=".navbar-collapse" >Glacier National Park</a>'},
                            {'name':'Chic-Chocs, CAHG', 'link':'<a href="http://www.centreavalanche.qc.ca/conditions/bulletins-avalanche/bulletin-en" target="_blank" data-toggle="collapse" data-target=".navbar-collapse" >Chic-Chocs, CAHG</a>'},
                            {'name':'Jasper National Park', 'link':'<a href="http://avalanche.pc.gc.ca/bulletin-eng.aspx?d=TODA&r=2" data-toggle="collapse" data-target=".navbar-collapse" target="_blank">Jasper National Park</a>'},
                            {'name':'Kananaskis Country, Alberta Parks', 'link':'<a href="'+$scope.env.DOMAIN+'/forecasts/kananaskis" data-toggle="collapse" data-target=".navbar-collapse" >Kananaskis Country, Alberta Parks</a>'},
                            {'name':'Kootenay Boundary', 'link':'<a href="'+$scope.env.DOMAIN+'/forecasts/kootenay-boundary" data-toggle="collapse" data-target=".navbar-collapse"> Kootenay Boundary</a>'},
                            {'name':'Lizard Range and Flathead', 'link':'<a href="'+$scope.env.DOMAIN+'/forecasts/lizard-range" data-toggle="collapse" data-target=".navbar-collapse">Lizard Range and Flathead</a>'},
                            {'name':'North Columbia', 'link':'<a href="'+$scope.env.DOMAIN+'/forecasts/north-columbia" data-toggle="collapse" data-target=".navbar-collapse">North Columbia</a>'},
                            {'name':'Northwest Coastal', 'link':'<a href="'+$scope.env.DOMAIN+'/forecasts/northwest-coastal" data-toggle="collapse" data-target=".navbar-collapse">Northwest Coastal</a>'},
                            {'name':'Northwest Inland', 'link':'<a href="'+$scope.env.DOMAIN+'/forecasts/northwest-inland" data-toggle="collapse" data-target=".navbar-collapse">Northwest Inland</a>'},
                            {'name':'Cariboos', 'link':'<a href="'+$scope.env.DOMAIN+'/forecasts/cariboos" data-toggle="collapse" data-target=".navbar-collapse">Cariboos</a>'},
                            {'name':'North Rockies', 'link':'<a href="'+$scope.env.DOMAIN+'/blogs/north-rockies" data-toggle="collapse" data-target=".navbar-collapse">North Rockies</a>'},
                            {'name':'South Rockies', 'link':'<a href="'+$scope.env.DOMAIN+'/forecasts/south-rockies" data-toggle="collapse" data-target=".navbar-collapse">South Rockies</a>'},
                            {'name':'North Shore', 'link':'<a href="'+$scope.env.DOMAIN+'/forecasts/north-shore" data-toggle="collapse" data-target=".navbar-collapse">North Shore</a>'},
                            {'name':'Purcells', 'link':'<a href="'+$scope.env.DOMAIN+'/forecasts/purcells" data-toggle="collapse" data-target=".navbar-collapse">Purcells</a>'},
                            {'name':'Sea-to-Sky', 'link':'<a href="'+$scope.env.DOMAIN+'/forecasts/sea-to-sky" data-toggle="collapse" data-target=".navbar-collapse">Sea-to-Sky</a>'},
                            {'name':'South Columbia', 'link':'<a href="'+$scope.env.DOMAIN+'/forecasts/south-columbia" data-toggle="collapse" data-target=".navbar-collapse">South Columbia</a>'},
                            {'name':'South Coast Inland', 'link':'<a href="'+$scope.env.DOMAIN+'/forecasts/south-coast-inland" data-toggle="collapse" data-target=".navbar-collapse">South Coast Inland</a>'},
                            {'name':'Vancouver Island, VIAC', 'link':'<a href="http://www.islandavalanchebulletin.com/" data-toggle="collapse" data-target=".navbar-collapse" target="_blank">Vancouver Island, VAIC</a>'},
                            {'name':'Whistler Blackcomb', 'link':'<a href="http://www.whistlerblackcomb.com/the-mountain/backcountry/avalanche-advisory.aspx" data-toggle="collapse" data-target=".navbar-collapse" target="_blank">Whistler Blackcomb</a>'},
                            {'name':'Waterton Lakes National Park', 'link':'<a href="http://avalanche.pc.gc.ca/bulletin-eng.aspx?d=TODA&r=4" target="_blank" data-toggle="collapse" data-target=".navbar-collapse">Waterton Lakes National Park</a>'},
                            {'name':'Little Yoho', 'link':'<a href="http://avalanche.pc.gc.ca/bulletin-eng.aspx?r=5&d=TODAY" target="_blank" data-toggle="collapse" data-target=".navbar-collapse">Little Yoho</a>'},
                            {'name':'Yukon', 'link':'<a href="'+$scope.env.DOMAIN+'/forecasts/yukon" data-toggle="collapse" data-target=".navbar-collapse">Yukon</a>'}];

    $scope.forecastRegions = _.sortBy($scope.forecastRegions, 'name');

    var length = $scope.forecastRegions.length;
    var third   = (length/3);

    $scope.forecastRegionList1 = $scope.forecastRegions.slice(0, (third -1));
    $scope.forecastRegionList2 = $scope.forecastRegions.slice((third -1), (third*2));
    $scope.forecastRegionList3 = $scope.forecastRegions.slice((third*2), length+1);

    $scope.dataMenu = [
        {'link':'<a href="'+$scope.env.DOMAIN+'/blogs" data-toggle="collapse" data-target=".navbar-collapse"><h2>Blogs<i class="fa fa-angle-right"></i></h2></a>'},
        {'link':'<a href="http://old.avalanche.ca/cac/library/incident-report-database/view" data-toggle="collapse" data-target=".navbar-collapse" target="_blank"><h2>Historic Incidents<i class="fa fa-angle-right"></i></h2></a>'},
        {'link':'<a href="'+$scope.env.DOMAIN+'/conditions" data-toggle="collapse" data-target=".navbar-collapse"><h2>Summaries & Outlooks<i class="fa fa-angle-right"></i></h2></a>'},
        {'link':'<a href="'+$scope.env.DOMAIN+'/weather" data-toggle="collapse" data-target=".navbar-collapse"><h2>Mountain Weather Forecast<i class="fa fa-angle-right"></i></h2></a>'}
    ];

    $scope.togglePushmenu = function($event) {
      window.slideoutPushmenu.toggle();
      // $event.preventDefault()
      false
    }

    $scope.$on('$locationChangeStart', function(event) {
      window.slideoutPushmenu.close();
    });

    $scope.youth = [{'url':'#overview','display':'Overview'},
                    {'url':'#programs','display':'Programs'},
                    {'url':'#resources','display':'Resources'},
                    {'url':'#curriculum','display':'Curriculum'}];

  });
