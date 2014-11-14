'use strict';

angular.module('avalancheCanadaApp')
  .controller('SponsorsCtrl', function ($scope, Prismic) {

Prismic.ctx().then(function(ctx){

        $scope.ctx = ctx;
        var partner = '',
            founding = '',
            supplier= '',
            associate = '';

        var getSponsor = function (tag)
        {
            var query  = '[[:d = at(document.type, "sponsor")] [:d = any(document.tags, ["'+tag+'"])]]';
            ctx.api.form('everything').query(query)
                    .ref(ctx.ref).submit(function(err, documents){
                if (err) {
                    $log.error('error getting '+ tag +' from prismic');
                }
                else {
                    switch(tag){
                        case 'partner':
                            $scope.partner = documents.results;
                            break;
                        case 'founding sponsor':
                            $scope.founding = documents.results;
                            break;
                        case 'supplier':
                            $scope.supplier = documents.results;
                            break;
                        case 'associate':
                            $scope.associate = documents.results;
                            break;
                        default:
                            $log.error('unknown type encountered');
                            break;
                    }
                }
            });
        }

        getSponsor('partner');
        getSponsor('founding sponsor');
        getSponsor('supplier');
        getSponsor('associate');
    });
/*
    Prismic.ctx().then(function(ctx){

        $scope.ctx = ctx;

        Prismic.bookmark('sponsor-associate').then(function(doc){
                $scope.associate =  doc.getStructuredText('generic.body').asHtml(ctx);
        });

        Prismic.bookmark('sponsor-brand').then(function(doc){
                $scope.brand =  doc.getStructuredText('generic.body').asHtml(ctx);
        });

        Prismic.bookmark('sponsor-founding').then(function(doc){
                $scope.founding =  doc.getStructuredText('generic.body').asHtml(ctx);
        });

        Prismic.bookmark('sponsor-partner').then(function(doc){
                $scope.partner =  doc.getStructuredText('generic.body').asHtml(ctx);
        });

        Prismic.bookmark('sponsor-programs').then(function(doc){
                $scope.programs =  doc.getStructuredText('generic.body').asHtml(ctx);
        });

        Prismic.bookmark('sponsor-supplier').then(function(doc){
                $scope.supplier =  doc.getStructuredText('generic.body').asHtml(ctx);
        });

    });*/

  });
