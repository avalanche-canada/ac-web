'use strict';

angular.module('avalancheCanadaApp')
  .controller('AmbassadorsCtrl', function ($scope, $location, $timeout, $anchorScroll, page) {
    $scope.intro = page.getStructuredText('ambassador-page.intro').asText();


    $scope.ambassadors = 
      page
        .getGroup('ambassador-page.ambassadors')
        .toArray()
        .map(function(a){

          var name = a.getText('name'),
              anchor = name.replace(/ /g, '-');

          return {
            name: name,
            anchor: anchor,
            headshot: a.getText('headshot'),
            bio: a.getStructuredText('bio').asText(),
            actionshot: {
              img: a.getText('action_img'),
              credit: a.getText('action_credit')
            },
            facebook:  a.getText('facebook'),
            instagram: a.getText('instagram'),
            twitter:   a.getText('twitter'),
            website:   a.getText('website')
          };
        });


    if($location.hash()) {
      $timeout(function(){ $anchorScroll(); }, 1000);
    }

  });
