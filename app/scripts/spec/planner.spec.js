(function() {
	'use strict';

	describe('Planner controller', function() {
		// Inject our module before each test
		beforeEach(module('app'));

		// Grab $controller service
		var $controller;
		// Instantiate controller variable
		var controller;
		var $scope = {};

		// Inject our 
		beforeEach(inject(function(_$controller_){
			$controller = _$controller_;
			controller = $controller('plannerCtrl', {$scope: $scope});
		}));

		it('should exist', function() {
			expect(controller).toBeDefined();
		});
	});
})();