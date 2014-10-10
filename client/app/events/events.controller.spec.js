'use strict';

describe('Controller: EventsCtrl', function () {

  // load the controller's module
  beforeEach(module('avalancheCanadaApp'));

  var NewsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewsCtrl = $controller('EventsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
