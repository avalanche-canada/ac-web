'use strict';
angular.module('avalancheCanadaApp')
.config(function (authProvider, $httpProvider, jwtInterceptorProvider) {

    authProvider.init({
        domain: 'avalancheca.auth0.com',
        clientID: 'mcgzglbFk2g1OcjOfUZA1frqjZdcsVgC'
    });

    authProvider.on('logout', ['store', '$state', 'ngToast', function onLogout(store, $state){
        store.remove('profile');
        store.remove('token');
        //$state.go('ac.map');
    }]);

    $httpProvider.interceptors.push(function() {
        return {
            request: function(config) {
                config.skipAuthorization = /^https:\/\/avalancheca.prismic.io\/api/.test(config.url);
                return config;
            }
        };
    });

    jwtInterceptorProvider.tokenGetter = ['store', function (store) {
        return store.get('token');
    }];

    $httpProvider.interceptors.push('jwtInterceptor');
});
