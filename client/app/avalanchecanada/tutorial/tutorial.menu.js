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

          //CUSTOM PAGES

          slugs.push('avalanche-terrain/avalanche-terrain-exposure-scale/ates-exercise');
          slug2title['avalanche-terrain/avalanche-terrain-exposure-scale/ates-exercise'] = 
            'ATES Exercises';

          var menuTree = makeTree(slugs, tutorialContentsFlat, slug2title);


         return menuTree;
     });
     TutorialMenuCache.put('menu-tree', tree);
     return tree;
})
.factory('getTutorialContentsPrune', function (TutorialContents) {
  
  return function(slug) {
    var prunedTree =
    TutorialContents
    .then(function(content){
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
      return content;
    });
    return prunedTree;
  };
});

