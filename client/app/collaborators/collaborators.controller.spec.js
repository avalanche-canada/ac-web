'use strict';

describe('Controller: CollaboratorsCtrl', function () {

  // load the controller's module
  beforeEach(module('avalancheCanadaApp'));

  var AboutCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AboutCtrl = $controller('CollaboratorsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
