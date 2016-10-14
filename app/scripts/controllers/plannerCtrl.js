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
		$scope.trips = null;


		(function() {
			apiCalls.makeCall('http://api.bart.gov/api/sched.aspx?cmd=arrive&orig=12TH&dest=CIVC&time=10:10+PM&date=now&key=MW9S-E7SL-26DU-VV8V&b=2&a=2&l=1')
				.then(function(response) {
					return xmlToJSON.dataToDoc(response.data);
				})
				.then(function(xml) {
					return xmlToJSON.xmlToJSON(xml);
				})
				.then(function(json) {
					$scope.trips = json.root.schedule.request.trip;
					console.log($scope.trips);
				});
		})();

		$scope.arrivalSelected = true;
		$scope.timeSelected = true;
		$scope.time = null;

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

		$scope.getInfoURL = function(time) {
			$scope.time = $scope.formatTime(time);
			var URL = 'http://api.bart.gov/api/sched.aspx?cmd=arrive&orig=' + $scope.departureStation + 
				'&dest=' + $scope.arrivalStation + '&time=' + $scope.time + '&date=now&key=MW9S-E7SL-26DU-VV8V&b=2&a=2&l=1';

			return URL;
		};

		$scope.getInfo = function(time) {
			var url = $scope.getInfoURL(time);
			console.log(url);
			apiCalls.makeCall(url)
				.then(function(response) {
					return xmlToJSON.dataToDoc(response.data);
				})
				.then(function(xml) {
					return xmlToJSON.xmlToJSON(xml);
				})
				.then(function(json) {
					$scope.trips = json.root.schedule.request.trip;
					console.log(JSON.stringify($scope.trips[0]));
				});
		};
	}]);
})();