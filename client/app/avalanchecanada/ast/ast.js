'use strict';

angular.module('avalancheCanadaApp')

.config(function ($stateProvider, $urlRouterProvider) {

  //! redirect /ast to ast/courses
  $urlRouterProvider.when('/ast', '/ast/courses');

  $stateProvider
    .state('ac.astProviders', {
      url: '^/ast/providers',
      templateUrl: 'app/avalanchecanada/ast/providers.html',
      controller: 'AstProvidersCtrl'
    })
    .state('ac.astCourses', {
      url: '^/ast/courses',
      templateUrl: 'app/avalanchecanada/ast/courses.html',
      controller: 'AstCoursesCtrl'
    });

})

.factory('geocode', function (MAPBOX_ACCESS_TOKEN, $http, $q){
    return function (location){
        var deferred = $q.defer();
        var queryStr = 'http://api.tiles.mapbox.com/v4/geocode/mapbox.places/'+location+'.json?access_token='+MAPBOX_ACCESS_TOKEN;
        console.log(queryStr);
        //! convert location to coords (forward geocode)
        // http://api.tiles.mapbox.com/v4/geocode/{dataset}/{query}.json?proximity={longitude},{latitude}&access_token=<your access token>
        $http.get(queryStr).
            success(function(data) {
                deferred.resolve(data);
            }).
            error(function() {
                deferred.reject('error getting coords from name (forward geocode)');
            });

        return deferred.promise;
    };
})

.controller('AstProvidersCtrl', function ($scope, $http, $log, geocode) {
  $scope.providers_page = true;
  $scope.loading = true;
  $scope.providers = [];
  $scope.unfiltered_providers = [];
  $scope.courses = [];
  $scope.levels = [];
  $scope.current_level = null;

  var getProviders = function(pos){

       var queryStr = '/api/ast/providers';

       if($scope.location && pos && pos.latitude && pos.longitude){
            queryStr = queryStr + '?latitude=' + pos.latitude + '&longitude=' + pos.longitude;
       }

      $http.get(queryStr).then(function (res) {
        $scope.providers = res.data;

        $http.get('/api/ast/courses').then(function (res) {
            $scope.levels = _.unique(_.pluck(res.data, 'level'));

          res.data.forEach(function(course){
            var provider = _.find($scope.providers, {providerid: course.providerid});

            if(provider){
              if(typeof provider.courses === 'undefined'){
                provider.courses = [];
              }
              provider.courses.push(course);
            }

          });

          $scope.unfiltered_providers = $scope.providers;
          $scope.loading = false;
        });

      });

        $http.get('/api/ast/courses/tags').then(function (res) {
            $scope.specialities = res.data;
        });
  };


  $scope.toggleMoreInfo = function(provider){
    provider.more_info = !provider.more_info;
  };

  $scope.selectLevel = function(level){
    $scope.current_level = level;
    return false;
  };

  var geocodeSuccess = function(data){

    if(data.features.length > 0){
        //! update location name to the resolved location name
        $scope.location =  data.features[0].place_name;

        //! call get providers with updated geometry
        var longitude = data.features[0].geometry.coordinates[0];
        var latitude  = data.features[0].geometry.coordinates[1];
        getProviders({'latitude':latitude,'longitude':longitude});
    }
    else{
        $log.error('geolocation error: unable to resolve data for' + $scope.location);
        getProviders();
    }


  };

  $scope.search = function() {
    $scope.providers = $scope.unfiltered_providers;

    if($scope.location){
      geocode($scope.location).then(geocodeSuccess,
                                    function(err){
                                        $log.error(err);
                                    });
    }

    //! Filter out course_level (aka AST1, AST2)
    if($scope.current_level !== null){
      $scope.providers = _.where($scope.providers, function(provider){
        return _.where(provider.courses, {level: $scope.current_level}).length > 0;
      });
    }
  };

  //! run stuff
  getProviders();



})

.controller('AstCoursesCtrl', function ($scope, $http, geocode, $log) {
  $scope.courses_page = true;
  $scope.loading = true;
  //$scope.courses = [];
  $scope.distanceList = [25,50,100,500];
  $scope.sponsored_courses = [];
  $scope.unsponsoured_courses = [];
  $scope.unfiltered_courses = [];
  $scope.providers = [];
  $scope.levels = [];
  $scope.current_level = null;
  $scope.date_from = null;
  $scope.date_to = null;
  $scope.current_distance = 25;


  //! Setup calendar
  $scope.maxDate = moment.utc(moment().startOf('day').add(1,'year')).format('YYYY-MM-DD'); // Ideally this is the last course date the api returns.
  $scope.minDate = moment.utc(moment().startOf('day').subtract(12, 'months')).format('YYYY-MM-DD');  // Ideally this is the first course date the api returns.

  $scope.today = function() {
    $scope.current_date = new Date();
  };

  $scope.opened = {'to':false,'from':false};

  $scope.format = 'dd-MMMM-yyyy';

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };


  $scope.openCalendar = function($event, calendar) {

    if($scope.current_date === null){
      $scope.today();
    }

    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened[calendar] = ! $scope.opened[calendar];
  };

  var getCourses = function(pos){

    $scope.sponsored_courses = [];
    $scope.unsponsoured_courses = [];

    var queryStr = '/api/ast/courses';
    if($scope.location && pos && pos.latitude && pos.longitude){
        queryStr = queryStr + '?latitude=' + pos.latitude + '&longitude=' + pos.longitude;
    }

    $http.get(queryStr).then(function (res) {
        $scope.unfiltered_courses = res.data;
        $scope.levels = _.unique(_.pluck(res.data, 'level'));

        $http.get('/api/ast/providers').then(function (res) {
              var providers = res.data;
              $scope.unfiltered_courses.forEach(function(course){
                course.provider = _.find(providers, {providerid: course.providerid});

                if(course.provider.sponsor === true){
                    $scope.sponsored_courses.push(course);
                }
                else{
                    $scope.unsponsoured_courses.push(course);
                }

                applyFilters();

              });

              //$scope.courses = $scope.unfiltered_courses;
              $scope.loading = false;
            });
    });
  };

  var geocodeSuccess = function(data){

    if(data.features.length > 0){
        //! update location name to the resolved location name
        $scope.location =  data.features[0].place_name;

        //! call get providers with updated geometry
        var longitude = data.features[0].geometry.coordinates[0];
        var latitude  = data.features[0].geometry.coordinates[1];
        getCourses({'latitude':latitude,'longitude':longitude});
    }
    else{
        $log.error('unable to geo reference location');
        getCourses();
    }

  };

  $scope.toggleMoreInfo = function(course){
    course.more_info = !course.more_info;
  };

  $scope.selectLevel = function(level){
    $scope.current_level = level;
    return false;
  };

  $scope.setDistance = function(distance){
    $scope.current_distance = distance;
  };

  $scope.search = function() {

    //! If location is specified then perform geocoding
    if($scope.location){
      geocode($scope.location).then(geocodeSuccess,
                                    function(err){
                                        $log.error(err);
                                    });
    }
    else{
      getCourses();
    }
  };

  var applyFilters = function(){

    var distanceFilter = function(course){
        //! if no distance for course then show it. Else if distance is less than requested show it
        return (!course.distance || (course.distance && (course.distance/1000) <= $scope.current_distance));
    };

    var dateFilter = function(course){
        return (course.date <= $scope.date_to && course.date >= $scope.date_from);
    };

    //! filter courses by distance
    if($scope.current_distance && $scope.location){
      $scope.sponsored_courses = _.filter($scope.sponsored_courses, distanceFilter);
      $scope.unsponsoured_courses = _.filter($scope.unsponsoured_courses, distanceFilter);
    }

    //! Filter courses by current_date
    if($scope.date_from !== null && $scope.date_to !== null){
      $scope.sponsored_courses = _.where($scope.sponsored_courses, dateFilter);
      $scope.unsponsoured_courses = _.where($scope.unsponsoured_courses, dateFilter);
    }

    //! Filter out course_level (aka AST1, AST2)
    if($scope.current_level !== null){
      $scope.sponsored_courses = _.where($scope.sponsored_courses, {level: $scope.current_level});
      $scope.unsponsoured_courses = _.where($scope.unsponsoured_courses, {level: $scope.current_level});
    }
  };

  //! do stuff
  getCourses();

});
