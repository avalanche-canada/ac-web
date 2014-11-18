'use strict';

angular.module('avalancheCanadaApp.filters')
    .filter('dateUtc', function () {
        return function (datePST) {
            if (datePST) {
                return moment.utc(datePST).format('YYYY-MM-DD') ;
            }
        };
    });