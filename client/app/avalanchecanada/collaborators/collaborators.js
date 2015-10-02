'use strict';
angular.module('avalancheCanadaApp')
.config(function ($stateProvider) {
    $stateProvider
        .state('ac.collaborators', {
            url: '^/collaborators',
            templateUrl: 'app/avalanchecanada/collaborators/collaborators.html',
            controller: 'CollaboratorsCtrl',
            resolve:{
                government: function($q, $log, Prismic){
                    var deferred = $q.defer();
                    Prismic.ctx().then(function(ctx){
                        Prismic.bookmark('collaborators-government').then(function(result){
                            deferred.resolve(result.getStructuredText('generic.body').asHtml(ctx));
                        });
                    });
                    return deferred.promise;
                },
                contribution: function($q, $log, Prismic){
                    var deferred = $q.defer();
                    Prismic.ctx().then(function(ctx){
                        Prismic.bookmark('collaborators-contribution').then(function(result){
                            deferred.resolve(result.getStructuredText('generic.body').asHtml(ctx));
                        });
                    });
                    return deferred.promise;
                },
                other: function($q, $log, Prismic){
                    var deferred = $q.defer();
                    Prismic.ctx().then(function(ctx){
                        Prismic.bookmark('collaborators-other').then(function(result){
                            deferred.resolve(result.getStructuredText('generic.body').asHtml(ctx));
                        });
                    });
                    return deferred.promise;
                },
            }
        });
})
.controller('CollaboratorsCtrl', function ($scope, $anchorScroll, $timeout, government, contribution, other) {
    $scope.government   = government;
    $scope.contribution = contribution;
    $scope.other        = other;
    //! once rendered call anchor scroll
    $timeout($anchorScroll, 0, false);
});

