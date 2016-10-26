(function() {
	'use strict';

	app.controller('tripCtrl',['$scope', '$state', '$rootScope', '$timeout', function($scope, $state, $rootScope, $timeout) {
		// Makes sure $scope.trips exists; if not, go back to the planner
		(function(){
			if (!$scope.trips) {
				$state.go('planner');
			} else {
				return;
			}
		})();

		// Receive the trips from indexCtrl
		$rootScope.$on('trips', function(event, newEvent) {
			$scope.trips = newEvent;
		});

		// Add an ID property to each trip to allow for tabbed navigation
  		function addID() {
  			// Returning a promise allows us to show the first trip
  			return new Promise(function(resolve) {
	  			// Initiate ID at 1
				var id = 1;
				// Increment and add the ID for each trip
				$scope.trips.forEach(function(trip) {
					trip.id = id;
					id++;
				});

				// Wait to intialize tabs until trips have ID's
				$('ul.tabs').tabs();
				resolve();
  			})
  			.then(function() {
  				showTrip1();
  			});
  		};

  		function showTrip1() {
  			$('#trip1').css('display', 'block');
  		};

  		// Use $timeout to allow for the controller to receive the trips
		$timeout(addID, 1000);
	}]);
})();