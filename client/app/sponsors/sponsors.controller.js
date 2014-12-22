'use strict';

angular.module('avalancheCanadaApp')
  .controller('SponsorsCtrl', function ($scope, Prismic) {

    Prismic.ctx().then(function(ctx){

        $scope.ctx = ctx;

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
                        case 'Founding Sponsor':
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
        };

        getSponsor('partner');
        getSponsor('Founding Sponsor');
        getSponsor('supplier');
        getSponsor('associate');
    });

  });
