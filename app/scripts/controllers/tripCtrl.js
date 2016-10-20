(function() {
	'use strict';

	app.controller('tripCtrl',['$scope', '$rootScope', '$timeout', function($scope, $rootScope, $timeout) {
		$rootScope.$on('trips', function(event, newEvent) {
			$scope.trips = newEvent;
		});

  		$scope.addID = function() {
			var id = 1;
			$scope.trips.forEach(function(trip) {
				trip.id = id;
				id++;
			});

			$('ul.tabs').tabs();	
  		};

		$timeout($scope.addID, 1000);

	}]);
})();