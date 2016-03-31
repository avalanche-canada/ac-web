'use strict';

angular.module('avalancheCanadaApp')
.service('AcAppState', function () {
  var obsPeriodKey = 'ac.app.state.min.obsPeriod';
  var storage = sessionStorage;

  return {
    getObsPeriod: function() {
      return storage.getItem(obsPeriodKey) || '7:days';
    },
    setObsPeriod: function(period) {
      return storage.setItem(obsPeriodKey, period.replace('-', ':'));
    }
  };
});
