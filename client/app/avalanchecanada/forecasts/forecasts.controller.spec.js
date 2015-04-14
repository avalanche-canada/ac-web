'use strict';

describe('Controller: ForecastsCtrl', function () {

  // load the controller's module
  beforeEach(module('avalancheCanadaApp'));

  var ForecastsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ForecastsCtrl = $controller('ForecastsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
