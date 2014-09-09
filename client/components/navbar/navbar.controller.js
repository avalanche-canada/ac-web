'use strict';

angular.module('avalancheCanadaApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];

   $('#menu').multilevelpushmenu({
        containersToPush: [$('#page-wrap')],
        menuWidth: '320px',
        menuHeight: '100%',
        collapsed: true,
        fullCollapse: true,
        backText: '',
        overlapWidth:60
    });
    $('#menu').multilevelpushmenu('option', 'menuHeight', $(document).height());
    $('#menu').multilevelpushmenu('redraw');
    //Multi Menu Expand
    $('#multi-expand').click(function(){
      $('#menu').multilevelpushmenu('expand');
    });


    //! \todo get this working
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

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
