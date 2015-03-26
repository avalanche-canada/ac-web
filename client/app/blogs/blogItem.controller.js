'use strict';

angular.module('avalancheCanadaApp')
  .controller('BlogItemCtrl', function ($scope, $rootScope, Prismic, $log, $stateParams, $location) {
    Prismic.ctx().then(function(ctx) {
        $scope.ctx = ctx;
        $scope.iFrameCount = 4;
        Prismic.document($stateParams.id).then(function(doc){
            if (doc.slug === $stateParams.slug) {
                $scope.documentHtml = doc.getStructuredText('blog.body').asHtml(ctx);
                $scope.header       = doc.getText('blog.title');
                $scope.date         = doc.getDate('blog.date');
                $scope.category     = doc.getText('blog.category');

                $rootScope.ogTags  = [ {type: 'title', value: $scope.header},
                    {type: 'image', value: doc.getImageView('blog.preview_image', 'main') ? doc.getImageView('blog.preview_image', 'main').url : 'http://www.avalanche.ca/assets/avalanche_canada.png'},
                    {type: 'description', value: doc.getStructuredText('blog.body').asText(ctx)}];

                if(doc.getText('blog.video1-source') && doc.getText('blog.video1-source') !== ''){
                    $rootScope.ogTags.push({type: 'video', value: doc.getText('blog.video1-source')})
                }

                var list = [];
                for(var i = 0; i < $scope.iFrameCount; ++i){
                    var frameSource = doc.getText('blog.video'+i+'-source');
                    var frameText = doc.getStructuredText('blog.video'+i+'-desc');
                    if(frameText){
                        frameText = frameText.asHtml(ctx);
                    }
                    list.push({source: frameSource, text: frameText});

                }
                $scope.iFrameList = list;
            }
            else if (doc.slugs.indexOf($stateParams.slug) >= 0) {
                $location.path('/blogs/'+doc.id+'/'+doc.slug);
            }
            else {
                // Should display some kind of error; will just redirect to / for now
                $log.error('error document slug not found');
                $location.path('/');
            }
        });
    });

  });
