/* js-hint hacks. */
/* jshint unused:false  */
'use strict';

angular.module('acComponents')
    .directive('acLoadingIndicator', function () {
        return {
            templateUrl: 'components/loading-indicator/loading-indicator.html',
            replace: true,
            link: function ($scope, el, attrs) {

            }
        };
    });