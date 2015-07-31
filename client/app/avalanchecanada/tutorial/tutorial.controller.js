
'use strict';

angular.module('avalancheCanadaApp')
.config(function($stateProvider) {
    $stateProvider
        .state('ac.tutorial', {
            url: '^/tutorial/{slug}',
            templateUrl: 'app/avalanchecanada/tutorial/template.html',
            controller: 'TutorialCtl'
        });
})
.controller('TutorialCtl', function ($scope, Prismic, $state, $stateParams, $log) {
    var slug = $stateParams.slug || 'empty';

    
    Prismic.ctx().then(function(ctx){

        var query =  '[[:d = at(document.type, "tutorial-page")]';
            query += ' [:d = at(my.tutorial-page.slug,"'+slug+'")]]';

        ctx.api
            .form('everything')
            .query(query)
            .ref(ctx.ref)
            .submit(function(err, documents){
                if (err) {
                    $log.error('error getting tutorial page from prismic');
                } else {
                    if (documents.results_size <= 0) {
                        $state.go('ac.404');
                    }
                    var doc = documents.results[0];

                    $scope.page_header  = doc.getText('tutorial-page.title');
                    $scope.body_content = doc.getStructuredText('tutorial-page.body').asHtml(ctx);
                    $scope.video_source = doc.getText('tutorial-page.video-source');
                }
            });
    });

});
