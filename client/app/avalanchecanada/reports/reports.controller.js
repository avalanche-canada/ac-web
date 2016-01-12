'use strict';

angular.module('avalancheCanadaApp')
    .controller('ReportsCtrl', function ($scope, Prismic, report) {
        $scope.report = report;

        Prismic.ctx().then(function(ctx){

            $scope.ctx = ctx;

            var query  = '[[:d = at(document.type, "sponsor")] [:d = any(document.tags, ["forecast-sponsor"])]]';
            ctx.api.form('everything').query(query)
                .ref(ctx.ref).submit(function(err, documents){
                    if (err) {
                        $log.error('error getting sponsor from prismic');
                    }
                    else {
                        $scope.sponsor = documents.results[0];
                    }
                });

            Prismic.bookmark('forecast-danger-rating').then(function(doc){
                $scope.dangerRating = doc;
            });

            Prismic.bookmark('forecast-disclaimer').then(function(doc){
                $scope.disclaimer = doc;
            });

            //set the proper height of the window container. this can't be 100% without properly
            //restructuring the dom.
            angular.element(document).ready(function () {
                jQuery('#inner-forecast').css('min-height', jQuery(window).height() + 'px');
            });
        });


    });
