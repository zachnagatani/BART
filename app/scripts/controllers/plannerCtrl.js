(function() {
	'use strict';

	app.controller('plannerCtrl', ['$scope', '$filter', 'apiCalls', 'xmlToJSON', function($scope, $filter, apiCalls, xmlToJSON) {
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
				console.log(JSON.stringify($scope.stations[0]));
			});
		};

		$scope.init();
		$scope.arrivalSelected = true;
		$scope.timeSelected = true;

		$scope.setDepartureStation = function(station) {
				$scope.departureStation = station.abbr['#text'];
				$scope.departureSelectedtoTrue();
				$scope.arrivalSelectedtoFalse();
		};

		$scope.setArrivalStation = function(station) {
				$scope.arrivalStation = station.abbr['#text'];
				$scope.arrivalSelectedtoTrue();
				$scope.timeSelectedtoFalse();
		};

		$scope.departureSelectedtoTrue = function() {
			$scope.departureSelected = true;
		};

		$scope.arrivalSelectedtoFalse = function() {
			$scope.arrivalSelected = false;
		};

		$scope.arrivalSelectedtoTrue = function() {
			$scope.arrivalSelected = true;
		};

		$scope.timeSelectedtoFalse = function() {
			$scope.timeSelected = false;
		};

		$scope.formatTime = function(time) {
			// Initialize our AM/PM marker variable
			var marker;
			// filter it to minimum necessary to check for AM/PM presence
			var arrivalTime = $filter('date')(time, 'hh:mma');
			// If the value of arrival time includes PM
			if (arrivalTime.includes('PM')) {
				marker = 'PM';
			} else {
				marker = 'AM'
			}

			// strip the AM/PM marker from the time in order to concatenate the '+' symbol
			arrivalTime = $filter('date')(time, 'hh:mm');
			// set time up in proper format for API
			arrivalTime = arrivalTime + '+' + marker;

			return arrivalTime;
		};
	}]);
})();