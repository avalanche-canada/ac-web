'use strict';


angular.module('avalancheCanadaApp')
.factory('makeTree', function(){
  return function makeTree(availableSlugs, allSlugs, titleMap) {

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
  };
})
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
.factory('TutorialMenuCache', function ($cacheFactory) {
  return $cacheFactory('menu-cache');
})
.factory('TutorialPageList', function ($q, Prismic, TutorialMenuCache) {
    var menuItems = TutorialMenuCache.get('menu-items');
    var tree;

    if(menuItems) {
      return $q.resolve(menuItems);
    }
    tree = Prismic.ctx().then(function(ctx){
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
    });
    TutorialMenuCache.put('menu-items', tree);
    return tree;
})
.factory('TutorialContents', function ($q, TutorialMenuCache, Prismic, TutorialPageList, tutorialContentsFlat, makeTree) {
    var menuTree = TutorialMenuCache.get('menu-tree');
    if(menuTree) {
      return menuTree;
    }
    var tree  = TutorialPageList.then(function(response){

          var slugs = [],
              slug2title = {};

          _.map(response.results, function(res){
            var slug  = res.fragments['tutorial-page.slug'].value,
                title = res.fragments['tutorial-page.title'].value;

            slugs.push(slug);
            slug2title[slug] = title;
          });

          var menuTree = makeTree(slugs, tutorialContentsFlat, slug2title);


         return menuTree;
     });
     TutorialMenuCache.put('menu-tree', tree);
     return tree;
})
.controller('TutorialHomeCtl', function ($q,$scope, Prismic, $state, $stateParams, $log, TutorialContents) {
    $scope.isActive = function() { return false; };

    TutorialContents
      .then(function(contents){
        $scope.menuItems = _.map(contents, function(m) { return _.pick(m, 'title', 'slug'); });
        $scope.next = contents[0];
      });

    Prismic.bookmark('tutorial-home')
      .then(function(result){
        $scope.title = result.getText('generic.title');
        $scope.body  = result.getStructuredText('generic.body').asHtml();
      });
})
.controller('TutorialCtl', function ($q, $scope, $http, Prismic, $state, $stateParams, $log, TutorialContents, TutorialPageList, $anchorScroll) {

    // Scroll to top when loaded to fix issue with the long menu
    $anchorScroll();


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
      .then(function(contents){
        $scope.menuItems = contents;
        var me = [];
        menuWalk({children:contents}, function(n){me.push(n);});
        me = me.slice(1);

        for(var i=0; i < me.length; i++) {
          if(me[i].slug === slug && i+1 < me.length) {
            $scope.next = me[i + 1];
            break;
          }
        }

        return contents;
      }).then(function(content){
        content = _.cloneDeep(content);
        var containsSlug = function(slug, node) {
          if(node.slug === slug) { return true; }

          var childIsTrue = false;

          _.each(node.children, function(c){
            if(containsSlug(slug, c)) {
              childIsTrue = true;
            }
          });

          return childIsTrue;
        };


        var prune = function(nodes) {
         _.each(nodes, function(n){ 
            if(!containsSlug(slug,n)) {
              n.hasChildren = n.children.length > 0;
              n.children = [];
            } else {
              prune(n.children);
            }
          });
        };
       
        prune(content);
        $scope.menuItems = content;

      }).catch(console.log.bind(console));


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
                        console.log(result);
                        $scope.doc.videoSource = result.data.html;
                      });
                   }

                  });
               }
           });
    });

});
