(function() {
	'use strict';

	app.controller('indexCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
		$rootScope.$on('tripEvent', function(event, newEvent) {
			$scope.trips = newEvent;
			$scope.$broadcast('trips', newEvent);
		});
	}]);
})();