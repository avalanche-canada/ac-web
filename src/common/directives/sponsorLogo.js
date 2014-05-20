angular.module('directives.sponsorLogo', [])

.directive('sponsorLogo', function($http, $log, ENV) {
    return {
        restrict: 'E',
        template: '<figure><img/></figure>',
        replace: true,

        link: function($scope, element, attrs) {

          var today   = new Date();
          var url     = ENV.sponsorApi + today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate() + ".json" ; //! month is 0 indexed so + 1

          //! Get the sponsor from the restful api
          $http.get(url).
            success(function(sponsor) {
                $log.info("sponsor retrieved");
                element.find('img').attr('src', sponsor.links.logo.href);
            }).
            error(function(error) {
                $log.error("Error getting sponsor from url" + url + "recieved error" + error);
            });

        }
    };
});
