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

		// Inject plannerCtrl 
		beforeEach(inject(function(_$controller_){
			$controller = _$controller_;
			controller = $controller('plannerCtrl', {$scope: $scope});
		}));

		it('should exist', function() {
			expect(controller).toBeDefined();
		});

		describe('init method', function() {
			it('should return an array of stations objects', function() {
				// Call the init function to grab stations
				$scope.init();

				// $scope.stations should be an array
				expect(Array.isArray($scope.stations)).toBeTruthy();
				
				// Each item in $scope.station should be an object
				$scope.stations.forEach(function(station) {
					expect(typeof station).toEqual('object');
				});
			});
		});
	});
})();