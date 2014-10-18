/* js-hint hacks. */
/* jshint unused:false  */
'use strict';

angular.module('acComponents')
    .directive('acDrawer', function () {
        return {
            replace: true,
            transclude: true,
            templateUrl: 'components/drawer/drawer.html',
            link: function ($scope, el, attrs) {
                
            }
        };
    });