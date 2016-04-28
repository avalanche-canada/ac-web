'use strict';

angular.module('avalancheCanadaApp')
.value('WeatherForecast', window.ReactWeatherForecast.default)
.value('WeatherPage', window.ReactPages.Weather)
.value('Staff', window.ReactAbout.Staff);
