'use strict';

angular.module('avalancheCanadaApp')
.config(function ($stateProvider) {
    $stateProvider
        .state('ac.sponsors', {
            url: '^/sponsors',
            templateUrl: 'app/avalanchecanada/sponsors/sponsors.html',
            controller: 'SponsorsCtrl',
            resolve:{
                partner: function($q, $log, Prismic){
                    var deferred = $q.defer();

                    Prismic.ctx().then(function(ctx){
                        var tag = 'partner';
                        var query  = '[[:d = at(document.type, "sponsor")] [:d = any(document.tags, ["'+tag+'"])]]';
                        ctx.api.form('everything')
                          .query(query)
                          .pageSize(40)
                          .ref(ctx.ref)
                          .submit(function(err, doc){
                            if (err) {
                                $log.error('error getting '+ tag +' from prismic');
                            }
                            else {
                                deferred.resolve(doc.results);
                            }
                        });
                    });

                    return deferred.promise;
                },

                foundingSponsor: function($q, $log, Prismic){
                    var deferred = $q.defer();

                    Prismic.ctx().then(function(ctx){
                        var tag = 'Founding Sponsor';
                        var query  = '[[:d = at(document.type, "sponsor")] [:d = any(document.tags, ["'+tag+'"])]]';
                        ctx.api.form('everything')
                          .query(query)
                          .pageSize(40)
                          .ref(ctx.ref)
                          .submit(function(err, doc){
                            if (err) {
                                $log.error('error getting '+ tag +' from prismic');
                            }
                            else {
                                deferred.resolve(doc.results);
                            }
                        });
                    });

                    return deferred.promise;
                },

                supplier: function($q, $log, Prismic){
                    var deferred = $q.defer();

                    Prismic.ctx().then(function(ctx){
                        var tag = 'supplier';
                        var query  = '[[:d = at(document.type, "sponsor")] [:d = any(document.tags, ["'+tag+'"])]]';
                        ctx.api.form('everything')
                          .query(query)
                          .pageSize(40)
                          .ref(ctx.ref)
                          .submit(function(err, doc){
                            if (err) {
                                $log.error('error getting '+ tag +' from prismic');
                            }
                            else {
                                deferred.resolve(doc.results);
                            }
                        });
                    });

                    return deferred.promise;
                },

                associate: function($q, $log, Prismic){
                    var deferred = $q.defer();

                    Prismic.ctx().then(function(ctx){
                        var tag = 'associate';
                        var query  = '[[:d = at(document.type, "sponsor")] [:d = any(document.tags, ["'+tag+'"])]]';
                        ctx.api.form('everything')
                          .query(query)
                          .pageSize(40)
                          .ref(ctx.ref)
                          .submit(function(err, doc){
                            if (err) {
                                $log.error('error getting '+ tag +' from prismic');
                            }
                            else {
                                deferred.resolve(doc.results);
                            }
                        });
                    });

                    return deferred.promise;
                }

            }

        });
})

.controller('SponsorsCtrl', function ($scope, $anchorScroll, $timeout, partner, foundingSponsor, supplier, associate) {

    function chunk(array, idx) {
        var ret = [],
            tmp = [];
        for(var i=0; i<array.length; i++) {
            if (i % 4 == 0 && i > 0) {
                ret.push(tmp);
                tmp = [];
            }
            tmp.push(array[i]);
        }
        if(tmp.length > 0) {
            ret.push(tmp);
        }
        return ret;
    }

    console.log(chunk(supplier, 4));

    $scope.partner         = chunk(partner, 4);
    $scope.foundingSponsor = chunk(foundingSponsor, 4);
    $scope.supplier        = chunk(supplier, 4);
    $scope.associate       = chunk(associate, 4);
    //! once rendered call anchor scroll
    $timeout($anchorScroll, 0, false);
});
