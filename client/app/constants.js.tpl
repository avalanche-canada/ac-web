angular.module('constants', [])

.constant('ENV', {
    imageDir: '<%- imageDir %>',
    DOMAIN: '<%- DOMAIN %>',
})
.constant('MAPBOX_ACCESS_TOKEN', '<%- MAPBOX_ACCESS_TOKEN %>')
.constant('MAPBOX_MAP_ID', '<%- MAPBOX_MAP_ID %>')
.constant('AC_API_ROOT_URL', '<%- AC_API_ROOT_URL %>');
