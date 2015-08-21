
'use strict';

//TODO(wnh): Encapulate this a bit better
function makeTree(stuffs, titleMap) {

  var blank = function(){
    return {
      title: null,
      slug: '',
      children: []
    };
  };

  var mkSlug = function(parentSlug, key) {
    if(parentSlug !== '') {
      parentSlug += '/';
    }
    return parentSlug + key;
  };

  var getChild = function(key, parent) {
    return _.find(parent.children, function(ch){ 
      return ch.slug === mkSlug(parent.slug, key);
    });
  };

  var paths = _.map(stuffs, function(p){ return p.split('/'); }),
      root = blank();

  _.each(paths, function(p){
    var parent = root;
    _.each(p, function(elem){
      var child = getChild(elem, parent);
      if(!child) {
        child = blank();
        child.slug = mkSlug(parent.slug, elem);
        child.title = titleMap[child.slug];
        parent.children.push(child);
      }
      parent = child;
    });
  });
  return root.children;
}

angular.module('avalancheCanadaApp')
.config(function($stateProvider) {
    $stateProvider
        .state('ac.tutorial', {
            url: '^/tutorial/*slug',
            templateUrl: 'app/avalanchecanada/tutorial/template.html',
            controller: 'TutorialCtl'
        });
})
.controller('TutorialCtl', function ($rootScope, $scope, Prismic, $state, $stateParams, $log) {
    var slug = $stateParams.slug || 'empty';

    $scope.isActive = function(linkSlug) {
      return (linkSlug === slug) ? 'active' : '';
    };
    
    Prismic.ctx().then(function(ctx){
      ctx.api.form('everything')
        .ref(ctx.ref)
        .query(['at', 'document.type', 'tutorial-page'])
        .pageSize(100)
        .submit(function(err, response){
          var slugs = [],
              slug2title = {};

          _.map(response.results, function(res){
            var slug  = res.fragments['tutorial-page.slug'].value,
                title = res.fragments['tutorial-page.title'].value;

            slugs.push(slug);
            slug2title[slug] = title;
          });

          var menuTree = makeTree(slugs, slug2title);


          $scope.menuItems = menuTree;
        });
    });
    Prismic.ctx().then(function(ctx){

        ctx.api
           .form('everything')
           .query(['at', 'document.type', 'tutorial-page'],
                  ['at', 'my.tutorial-page.slug', slug])
           .ref(ctx.ref)
           .submit(function(err, documents){
               if (err) {
                   $log.error('error getting tutorial page from prismic');
               } else {
                   if (documents.results_size <= 0) {
                       $state.go('ac.404');
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
                       
                   $scope.doc = {
                     title:        doc.getText('tutorial-page.title'),

                     text1:        doc.getText('tutorial-page.text1'),
                     videoSource:  doc.getText('tutorial-page.video-source'),
                     text2:        doc.getText('tutorial-page.text2'),
                     gallery:      gallery,
                     text3:        doc.getText('tutorial-page.text3'),
                     embedded:     doc.getText('tutorial-page.embedded_content'),
                     text4:        doc.getText('tutorial-page.text4')

                   };
               }
           });
    });

});
