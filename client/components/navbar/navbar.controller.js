/*jshint unused:vars*/
'use strict';

angular.module('avalancheCanadaApp')

  .directive('multiLevelPushMenu', function($document) {
      return {
          //restrict: 'E',
          templateUrl: 'components/navbar/pushmenu.html',
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

  .controller('NavbarCtrl', function ($scope, $location, $document, auth, store) {


    $scope.forecastRegions = [{'name':'Banff Yoho & Kootenay National Park', 'link':'<a href="/forecasts/banff-yoho-kootenay" data-toggle="collapse" data-target=".navbar-collapse" >Banff Yoho & Kootenay National Park</a>'},
                            {'name':'Glacier National Park', 'link':'<a href="/forecasts/glacier" data-toggle="collapse" data-target=".navbar-collapse" >Glacier National Park</a>'},
                            {'name':'Chic-Chocs, CAHG', 'link':'<a href="todo" data-toggle="collapse" data-target=".navbar-collapse" >Chic-Chocs, CAHG</a>'},
                            {'name':'Jasper National Park', 'link':'<a href="/forecasts/jasper" data-toggle="collapse" data-target=".navbar-collapse" >Jasper National Park</a>'},
                            {'name':'Kananaskis Country, Alberta Parks', 'link':'<a href="/forecasts/kananaskis" data-toggle="collapse" data-target=".navbar-collapse" >Kananaskis Country, Alberta Parks</a>'},
                            {'name':'Kootenay Boundary', 'link':'<a href="/forecasts/kootenay-boundary" data-toggle="collapse" data-target=".navbar-collapse"> Kootenay Boundary</a>'},
                            {'name':'Lizard Range and Flathead', 'link':'<a href="/forecasts/lizard-range" data-toggle="collapse" data-target=".navbar-collapse">Lizard Range and Flathead</a>'},
                            {'name':'North Columbia', 'link':'<a href="/forecasts/north-columbia" data-toggle="collapse" data-target=".navbar-collapse">North Columbia</a>'},
                            {'name':'Northwest Coastal', 'link':'<a href="/forecasts/northwest-coastal" data-toggle="collapse" data-target=".navbar-collapse">Northwest Coastal</a>'},
                            {'name':'Northwest Inland', 'link':'<a href="/forecasts/northwest-inland" data-toggle="collapse" data-target=".navbar-collapse">Northwest Inland</a>'},
                            {'name':'Cariboos', 'link':'<a href="/forecasts/cariboos" data-toggle="collapse" data-target=".navbar-collapse">Cariboos</a>'},
                            {'name':'North Rockies', 'link':'<a href="/forecasts/north-rockies" data-toggle="collapse" data-target=".navbar-collapse">North Rockies</a>'},
                            {'name':'South Rockies', 'link':'<a href="/forecasts/south-rockies" data-toggle="collapse" data-target=".navbar-collapse">South Rockies</a>'},
                            {'name':'North Shore', 'link':'<a href="/forecasts/north-shore" data-toggle="collapse" data-target=".navbar-collapse">North Shore</a>'},
                            {'name':'Purcells', 'link':'<a href="/forecasts/purcells" data-toggle="collapse" data-target=".navbar-collapse">Purcells</a>'},
                            {'name':'Sea-to-Sky', 'link':'<a href="/forecasts/sea-to-sky" data-toggle="collapse" data-target=".navbar-collapse">Sea-to-Sky</a>'},
                            {'name':'South Columbia', 'link':'<a href="/forecasts/south-columbia" data-toggle="collapse" data-target=".navbar-collapse">South Columbia</a>'},
                            {'name':'South Coast Inland', 'link':'<a href="/forecasts/south-coast-inland" data-toggle="collapse" data-target=".navbar-collapse">South Coast Inland</a>'},
                            {'name':'Vancouver Island, VAIC', 'link':'<a href="/forecasts/south-coast-inland" data-toggle="collapse" data-target=".navbar-collapse">Vancouver Island, VAIC</a>'},
                            {'name':'Whistler Blackcomb', 'link':'<a href="/forecasts/whistler-blackcomb" data-toggle="collapse" data-target=".navbar-collapse">Whistler Blackcomb</a>'},
                            {'name':'Waterton National Park', 'link':'<a href="/forecasts/waterton" data-toggle="collapse" data-target=".navbar-collapse">Waterton National Park</a>'},
                            {'name':'Yukon', 'link':'<a href="/blogs?category=yukon" data-toggle="collapse" data-target=".navbar-collapse">Yukon</a>'}];

    $scope.forecastRegions = _.sortBy($scope.forecastRegions, 'name');

    var length = $scope.forecastRegions.length;
    var third   = (length/3);

    $scope.forecastRegionList1 = $scope.forecastRegions.slice(0, (third -1));
    $scope.forecastRegionList2 = $scope.forecastRegions.slice((third -1), (third*2));
    $scope.forecastRegionList3 = $scope.forecastRegions.slice((third*2), length+1);

    $scope.dataMenu = [//{'display':'Observations','url':'/observations'},
                       //{'display':'Incidents','url':'/incidents'},
                       {'display':'Blogs','url':'/blogs'},
                       {'display':'Summaries & Outlooks','url':'/conditions'}];//,
                       //{'display':'Weather Forecasts','url':'/weather'}];

    $scope.youth = [{'url':'#overview','display':'Overview'},
                    {'url':'#programs','display':'Programs'},
                    {'url':'#resources','display':'Resources'},
                    {'url':'#curriculum','display':'Curriculum'}];

    $scope.login = function() {
        auth.signin({}, function(profile, token) {
          // Success callback
          store.set('profile', profile);
          store.set('token', token);
          $location.path('/');
          $scope.isAuthenticated = true;
        }, function() {
          // Error callback
        });
    };

    $scope.logout = function() {
      auth.signout();
      store.remove('profile');
      store.remove('token');
      $scope.isAuthenticated = false;
    };

  });
