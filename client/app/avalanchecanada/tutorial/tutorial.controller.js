
'use strict';

//TODO(wnh): Encapulate this a bit better
function makeTree(availableSlugs, allSlugs, titleMap) {

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

  availableSlugs = _.filter(allSlugs, function(s) {
    return _(availableSlugs).contains(s);
  });
  var paths = _.map(availableSlugs, function(p){ return p.split('/'); }),
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
    .state('ac.tutorial', {
      url: '^/tutorial/{slug:nonURIEncoded}',
      templateUrl: 'app/avalanchecanada/tutorial/template.html',
      controller: 'TutorialCtl'
    })
    .state('ac.tutorialHome', {
      url: '^/tutorial',
      templateUrl: 'app/avalanchecanada/tutorial/home.html',
      controller: 'TutorialHomeCtl'
    });


})
.factory('TutorialContents', function ($q,Prismic,$cacheFactory,tutorialContentsFlat) {
    var menuCache = $cacheFactory('menu-cache'),
        menuItems = menuCache.get('menu-items');

    if(menuItems) {
      return $q.resolve(menuItems);
    } else {
      var tree = Prismic.ctx().then(function(ctx){
        return $q(function(resolve, reject){
          ctx.api.form('everything')
            .ref(ctx.ref)
            .query(['at', 'document.type', 'tutorial-page'])
            .pageSize(100)
            .submit(function(err, response){
              if(err) {
                reject(err);
              } else {
                resolve(response);
              }
            });
        });
      }).then(function(response){

            var slugs = [],
                slug2title = {};

            _.map(response.results, function(res){
              var slug  = res.fragments['tutorial-page.slug'].value,
                  title = res.fragments['tutorial-page.title'].value;

              slugs.push(slug);
              slug2title[slug] = title;
            });

            var menuTree = makeTree(slugs, tutorialContentsFlat, slug2title);


            menuCache.put('menu-items', menuTree);
            return menuTree;
       });
       return tree;
     }
})
.controller('TutorialHomeCtl', function ($q,$scope, Prismic, $state, $stateParams, $log, TutorialContents) {
    $scope.isActive = function() { return false; };

    TutorialContents
      .then(function(menuTree){
        $scope.menuItems = menuTree;
        $scope.next = menuTree[0];
      });

    Prismic.bookmark('tutorial-home')
      .then(function(result){
        $scope.title = result.getText('generic.title');
        $scope.body  = result.getStructuredText('generic.body').asHtml();
      });
})
.controller('TutorialCtl', function ($q,$scope, Prismic, $state, $stateParams, $log, TutorialContents) {
    var slug = $stateParams.slug || 'empty';

    $scope.isActive = function(linkSlug) {
      return (linkSlug === slug) ? 'active' : '';
    };


    var menuWalk = function(node, fn) {
      fn(node);
      _.each(node.children, function(n){
        menuWalk(n, fn);
      });
    };

    TutorialContents
      .then(function(menuTree){
        $scope.menuItems = menuTree;
        var me = [];
        menuWalk({children:menuTree}, function(n){me.push(n);});
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

                   var maybeHtml = function(doc, key) {
                     var txt = doc.getStructuredText(key);
                     if(txt){
                       return txt.asHtml();
                     } else {
                       return undefined;
                     }
                   };
                   $scope.doc = {
                     title:        doc.getText('tutorial-page.title'),
                     text1:        maybeHtml(doc,'tutorial-page.text1'),
                     videoSource:  doc.getText('tutorial-page.video-source'),
                     text2:        maybeHtml(doc, 'tutorial-page.text2'),
                     gallery:      gallery,
                     text3:        maybeHtml(doc,'tutorial-page.text3'),
                     embedded:     doc.getText('tutorial-page.embedded_content'),
                     text4:        maybeHtml(doc, 'tutorial-page.text4')

                   };
               }
           });
    });

});
