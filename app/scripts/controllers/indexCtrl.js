(function() {
	'use strict';

	app.controller('indexCtrl', ['$scope', '$state', function($scope, $state) {
		$state.go('home');
	}]);
})();