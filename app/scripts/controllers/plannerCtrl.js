(function() {
	'use strict';

	app.controller('plannerCtrl', ['$scope', 'apiCalls', function($scope, apiCalls) {
			(function() {
				apiCalls.makeCall('http://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V')
					.then(function(response) {
						console.log(response.status);
					});
			})();
	}]);
})();