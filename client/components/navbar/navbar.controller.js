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

              scope.multiExpand = function() { angular.element(ele).multilevelpushmenu('expand'); };

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

  .controller('NavbarCtrl', function ($scope, $location, $document) {

    /*$scope.navItems = [{'title':'Avalanche Information', 'link':'' ,
                            'data':[{'title':'Forecasts', 'link':'forecasts' , 'data':[
                                        {'title':'Banff Yoho & Kootenay', 'link':'banff-yoho-kootenay' , 'data':[]}
                                        ]}
                                    ]}
                      ];*/

    $scope.forecastRegions = [{'name':'banff-yoho-kootenay','display':'Banff Yoho And Kootenay'},
                            {'name':'banff-yoho-kootenay','display':'Banff Yoho And Kootenay'},
                            {'name':'banff-yoho-kootenay','display':'Banff Yoho And Kootenay'},
                            {'name':'banff-yoho-kootenay','display':'Banff Yoho And Kootenay'}];

    $scope.dataMenu = [{'display':'Observations','url':'/observations'},
                       {'display':'Incidents','url':'/incidents'},
                       {'display':'Webcams','url':'/webcams'},
                       {'display':'Weather Forecasts','url':'/weather'}];

    $scope.blogs = [{'name':'all','display':'All'},
                            {'name':'forecaster','display':'Forecaster'},
                            {'name':'north-rockies','display':'North Rockies'},
                            {'name':'south-rockies','display':'South Rockies'},
                            {'name':'summary','display':'Summaries and Outlooks'},
                            {'name':'conditions','display':'Conditions Outlook'},
                            {'name':'conditions-summary','display':'Conditions Summary'},
                            {'name':'weather','display':'Weather Outlook'},
                            {'name':'tech','display':'Tech and Talk'}];

    $scope.training =  [{'name':'find','display':'Find a course'},
                            {'name':'ast1','display':'Avalanche Skills Training 1'},
                            {'name':'ast2','display':'Avalanche Skills Training 2'},
                            {'name':'companion-rescue','display':'Companion Rescue Skills'},
                            {'name':'why','display':'Why should I take an avalanche course ?'},
                            {'name':'what','display':'What course should I take'},
                            {'name':'calendar','display':'Calendar'}];

    $scope.online_course =  [{'name':'formation','display':'Avalanche Formation'},
                            {'name':'terrain','display':'Avalanche Terrain'},
                            {'name':'planning','display':'Pre-trip Planning'},
                            {'name':'reducing-risk','display':'Reducing Risk in the Field'},
                            {'name':'rescue','display':'Rescue'},
                            {'name':'report','display':'Reporting Observation'}];

    $scope.parents_educators = [{'name':'mentors','display':'Mentors'},
                            {'name':'youth-guidelines','display':'Guidelines for Youth Education'},
                            {'name':'youth-programs','display':'Existing Youth Programs'},
                            {'name':'curriculum','display':'Curriculum Ideas/Lesson Plans'},
                            {'name':'materials','display':'Resource Materials'},
                            {'name':'grants','display':'School Programs - Grants'},
                            {'name':'toolbox','display':'Tool Box - Safety gear loans'}];



  });
