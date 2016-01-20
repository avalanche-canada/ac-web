'use strict';


angular.module('avalancheCanadaApp')
.config(function($stateProvider, $urlMatcherFactoryProvider) {

  function valToString(val) {
    return (val !== null && typeof(val) !== 'undefined') ? val.toString() : val;
  }
  
  $urlMatcherFactoryProvider.type('nonURIEncoded', {
      encode: valToString,
      decode: valToString,
      is: function () { return true; }
  });
  $stateProvider
    .state('ac.atesQuiz', {
      url: '^/tutorial/avalanche-terrain/avalanche-terrain-exposure-scale/ates-exercise',
      templateUrl: 'app/avalanchecanada/tutorial/ates.html',
      controller: 'AtesCtrl'
    })
    .state('ac.tutorial', {
      url: '^/tutorial/{slug:nonURIEncoded}',
      templateUrl: 'app/avalanchecanada/tutorial/template.html',
      controller: 'TutorialCtl'
    })
    .state('ac.tutorialHome', {
      url: '^/tutorial',
      templateUrl: 'app/avalanchecanada/tutorial/home.html',
      controller: 'TutorialHomeCtl',
    });


})
.directive('tutorialMenu', function() {
  return {
    restrict: 'E',
    scope: {
      currentSlug: '='
    },
    templateUrl: 'app/avalanchecanada/tutorial/_menu.html',
    controller: function($scope, TutorialContents, getTutorialContentsPrune) {

      $scope.isActive = function(linkSlug) {
        return (linkSlug === $scope.currentSlug) ? 'active' : '';
      };

      getTutorialContentsPrune($scope.currentSlug)
        .then(function(contents){
          $scope.menuItems = contents;
        });
    }
  };
})
.controller('TutorialHomeCtl', function ($scope, $q, Prismic, TutorialContents) {
  $q.all({
    homepage: Prismic.bookmark('tutorial-home'),
    contents: TutorialContents,
  }).then(function(results){
    $scope.title = results.homepage.getText('generic.title');
    $scope.body  = results.homepage.getStructuredText('generic.body').asHtml();
    $scope.next =  results.contents[0];
  });
})
.controller('TutorialCtl', function ($q, $scope, $http, Prismic, $state, $stateParams, $log, TutorialContents, getTutorialContentsPrune, TutorialPageList, $anchorScroll) {

    // Scroll to top when loaded to fix issue with the long menu
    $anchorScroll();


    var slug = $stateParams.slug || 'EMPTY';

    $scope.currentSlug = slug; 

    var menuWalk = function(node, fn) {
      fn(node);
      _.each(node.children, function(n){
        menuWalk(n, fn);
      });
    };

    TutorialContents
      .then(function(contents){

        var me = [];
        menuWalk({children:contents}, function(n){me.push(n);});
        me = me.slice(1);

        for(var i=0; i < me.length; i++) {
          if(me[i].slug === slug && i+1 < me.length) {
            $scope.next = me[i + 1];
            break;
          }
        }

      });

    Prismic.ctx().then(function(ctx){

        ctx.api
           .form('everything')
           .query(['at', 'document.type', 'tutorial-page'],
                  ['at', 'my.tutorial-page.slug', slug])
           .ref(ctx.ref)
           .fetchLinks('slug')
           .submit(function(err, documents){
               if (err) {
                   $log.error('error getting tutorial page from prismic');
               } else {
                   if (documents.results_size <= 0) {
                       //$state.go('ac.404');
                   }


                   var doc = documents.results[0];

                   var galleryObj = doc.getGroup('tutorial-page.gallery');
                   var galleryA  = galleryObj ? galleryObj.toArray() : [];
                   var gallery = [];

                   for(var i=0; i < galleryA.length; i++)
                   {
                     var img = galleryA[i];
                     var pic = img.getImage('picture');
                     var main = pic ? pic.main : null;
                     gallery.push({
                       url: main ? main.url : null,
                       caption: img.getText('caption'),
                       credit: img.getText('credit')
                     });
                   }

                  TutorialPageList.then(function(results){
                    var id_to_slug = {};
                    _.each(results.results, function(d){
                      id_to_slug[d.id] = d.fragments['tutorial-page.slug'].value;
                    });
                    return id_to_slug;
                  }).then(function(idToSlug){

                   var maybeHtml = function(doc, key) {
                     var txt = doc.getStructuredText(key);
                     if(txt){
                       return txt.asHtml({
                         linkResolver: function linkResolver(ctx,doc,isBroken){
                           if(isBroken) {
                             return '#broken-link';
                           }
                           return '/tutorial/' + idToSlug[doc.id];
                         }
                       });
                     } else {
                       return undefined;
                     }
                   };

                   $scope.doc = {
                     title:        doc.getText('tutorial-page.title'),
                     text1:        maybeHtml(doc,'tutorial-page.text1'),
                     text2:        maybeHtml(doc, 'tutorial-page.text2'),
                     gallery:      gallery,
                     text3:        maybeHtml(doc,'tutorial-page.text3'),
                     embedded:     doc.getText('tutorial-page.embedded_content'),
                     text4:        maybeHtml(doc, 'tutorial-page.text4')
                   };

                   var videoSource = doc.getText('tutorial-page.video-source');
                   if(videoSource) {
                    $http
                      .jsonp('https://vimeo.com/api/oembed.json', {params:{url: videoSource, callback:'JSON_CALLBACK'}})
                      .then(function(result){
                        $scope.doc.videoSource = result.data.html;
                      });
                   }

                  });
               }
           });
    });

});
