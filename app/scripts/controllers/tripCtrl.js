(function() {
	'use strict';

	app.controller('tripCtrl',['$scope', '$state', '$rootScope', '$timeout', function($scope, $state, $rootScope, $timeout) {
		(function(){
			if (!$scope.trips) {
				$state.go('planner');
			} else {
				return;
			}
		})();

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