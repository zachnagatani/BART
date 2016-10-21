(function() {
	'use strict';

	app.controller('indexCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
		// Receive the trips from plannerCtrl and broadcast them
		// to be received by tripCtrl
		$rootScope.$on('tripEvent', function(event, newEvent) {
			$scope.trips = newEvent;
			$scope.$broadcast('trips', newEvent);
		});
	}]);
})();