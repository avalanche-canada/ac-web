//! this file defines constants for the project
angular.module('constants', [])

.constant('ENV', {
    imageDir: 'assets/images/',
    sponsorApi: 'https://avalancheca-sponsors.herokuapp.com/sponsor/'
})
.constant('MAPBOX_ACCESS_TOKEN', 'pk.eyJ1IjoiYXZhbGFuY2hlY2FuYWRhIiwiYSI6Im52VjFlWW8ifQ.-jbec6Q_pA7uRgvVDkXxsA#4')
.constant('MAPBOX_MAP_ID', 'avalanchecanada.k8o347c9')
.constant('AC_API_ROOT_URL', 'http://avalanche.ca');
