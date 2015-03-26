'use strict';

angular.module('avalancheCanadaApp')
  .controller('NewsItemCtrl', function ($scope, Prismic, $log, $rootScope, $stateParams, $location, urlBuilder) {
    $scope.url = urlBuilder.get();
    Prismic.ctx().then(function(ctx) {
        $scope.ctx = ctx;
        Prismic.document($stateParams.id).then(function(doc){
            if (doc.slug === $stateParams.slug) {
                    $scope.tags         = doc.tags;
                    $scope.documentHtml =  doc.getStructuredText('news.body').asHtml(ctx);//doc.asHtml(ctx);
                    $scope.header       = doc.getText('news.title');
                    $scope.date         = doc.getDate('news.date');
                    $scope.vid1         = doc.getText('news.video1-source');
                    $scope.vid2         = doc.getText('news.video2-source');

                    $rootScope.ogTitle = $scope.header;
                    $rootScope.ogImage = doc.getImageView('news.featured_image', 'main') ? doc.getImageView('news.featured_image', 'main').url : 'http://www.avalanche.ca/assets/avalanche_canada.png';
                    $rootScope.ogDescription = doc.getStructuredText('news.body').asText(ctx);
            }
            else if (doc.slugs.indexOf($stateParams.slug) >= 0) {
                $location.path('/news/'+doc.id+'/'+doc.slug);
            }
            else {
                // Should display some kind of error; will just redirect to / for now
                $location.path('/');
            }
        });
    });

  });
