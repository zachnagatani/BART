(function() {
	'use strict';

	app.controller('plannerCtrl', ['$scope', 'apiCalls', 'xmlToJSON', function($scope, apiCalls, xmlToJSON) {
		$scope.stations = [];

		$scope.init = function(){
			apiCalls.makeCall('http://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V').then(function(response) {
				return response.data;
			}).then(function(data) {
				return xmlToJSON.dataToDoc(data);
			}).then(function(XML) {
				return xmlToJSON.xmlToJSON(XML);
			}).then(function(json) {
				// return the stations from the JSON
				return json.root.stations.station;
			}).then(function(stations) {
				// Push each station into the empty stations array
				stations.forEach(function(station) {
					$scope.stations.push(station);
				});
				console.log($scope.stations);
			});
		};

		$scope.init();
	}]);
})();