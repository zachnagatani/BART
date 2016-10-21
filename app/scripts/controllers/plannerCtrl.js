(function() {
	'use strict';

	app.controller('plannerCtrl', ['$scope', '$filter', '$state', 'apiCalls', 'xmlToJSON', function($scope, $filter, $state, apiCalls, xmlToJSON) {
		// Initialization function
		$scope.init = function(){
			function getStationsHTTP() {
				console.log('There were no stations in IDB... getStationsHTTP has been invoked!');
				// makes call to the stations endpoint of the BART API
				apiCalls.makeCall('http://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V').then(function(response) {
					return response.data;
				}).then(function(data) {
					// turns the data into an XML node
					return xmlToJSON.dataToDoc(data);
				}, function(error) {
					// Materialize.toast(message, displayLength, className, completeCallback);
					Materialize.toast('Please reconnect to the internet', 4000);					
				}).then(function(XML) {
					// converts the xml into JSON
					return xmlToJSON.xmlToJSON(XML);
				}).then(function(json) {
					// return the stations from the JSON
					return json.root.stations.station;
				}).then(function(stations) {
					// Push stations in IDB
					dbPromise
						.then(function(db) {
							var tx = db.transaction('stations', 'readwrite');
							var store = tx.objectStore('stations');
							stations.forEach(function(station) {
								store.put(station);
							});
						});

					// Push each station into the empty stations array
					console.log(stations);
					$scope.stations = stations;
				});
			};

			function getStationsIDB() {
				console.log('There were stations in IDB... getStationsIDB has been invoked!');
				dbPromise
					.then(function(db) {
						// Begin another transaction
						var tx = db.transaction('stations');
						var stationsStore = tx.objectStore('stations');
						// Read all the stations from the object store
						return stationsStore.getAll();
					})
					.then(function(stations) {
						// Push the stations onto $scope
						$scope.stations = stations;
					})
					.then(function() {
						// Add this to the digest cycle
						$scope.$apply();
					});				
			};

			// Open up indexedDB
			dbPromise
				.then(function(db) {
					// Access the stations object store
					var tx = db.transaction('stations');
					var stationsStore = tx.objectStore('stations');
					return stationsStore.get('object:21');
				})
				.then(function(val) {
					// Check if an object exists in stations
					if (val) {
						getStationsIDB();
					} else {
						getStationsHTTP();
					}
				});
		};

		// Call the init function
		$scope.init();

		$scope.trips = null;

		$scope.arrivalSelected = true;
		$scope.timeSelected = true;
		$scope.time = null;

		$scope.reload = function() {
			$state.reload();
		};

		$scope.setDepartureStation = function(station) {
				$scope.departureStation = station.abbr['#text'];
				$scope.departureSelectedtoTrue();
				$scope.arrivalSelectedtoFalse();
		};

		$scope.setArrivalStation = function(station) {
				$scope.arrivalStation = station.abbr['#text'];
				if ($scope.arrivalStation === $scope.departureStation) {
					Materialize.toast('Arrival station must be different than departure station', 4000);
					return;				
				} else {
					$scope.arrivalSelectedtoTrue();
					$scope.timeSelectedtoFalse();
				}
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
			// Grab the url from getInfoURL
			var url = $scope.getInfoURL(time);

			// Grab the current time in military format
			var currentTime = $filter('date')(new Date(), 'HH:mm:ss');

			// Convert into new date (Jan 1 1970 works because trips are automatically sent
			// using today's date) and convert to milliseconds for comparison
			var current = new Date('Thu Jan 1 1970 ' + currentTime + ' GMT-0800' ).getTime();

			// Convert the user's input time into milliseconds for comparison
			var timeMil = new Date(time).getTime();

			// If the input time is prior to the current time
			if (timeMil <= current) {
				// alert the user and return
				Materialize.toast('Arrival time cannot be in the past', 4000);
				return;
			} else {
				// else go get the trips from the API
				apiCalls.makeCall(url)
					.then(function(response) {
						return xmlToJSON.dataToDoc(response.data);
					}, function(error) {
						// Materialize.toast(message, displayLength, className, completeCallback);
						Materialize.toast('Please reconnect to the internet', 4000);
					})
					.then(function(xml) {
						return xmlToJSON.xmlToJSON(xml);
					})
					.then(function(json) {
						$scope.trips = json.root.schedule.request.trip;
					}).then(function() {
						console.log($scope.trips);
						$scope.$emit('tripEvent', $scope.trips);
						$state.go('trip');
					});			
			}
		};
	}]);
})();