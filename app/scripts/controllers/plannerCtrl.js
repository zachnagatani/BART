(function() {
	'use strict';

	app.controller('plannerCtrl', ['$scope', '$filter', '$state', 'apiCalls', 'xmlToJSON', function($scope, $filter, $state, apiCalls, xmlToJSON) {
		$scope.trips = null;
		$scope.arrivalSelected = true;
		$scope.timeSelected = true;
		$scope.time = null;

		// Functions to manipulate ng-show
		function departureSelectedtoTrue() {
			$scope.departureSelected = true;
		};

		function arrivalSelectedtoFalse() {
			$scope.arrivalSelected = false;
		};

		function arrivalSelectedtoTrue() {
			$scope.arrivalSelected = true;
		};

		function timeSelectedtoFalse() {
			$scope.timeSelected = false;
		};

		// Formats time for API
		function formatTime(time) {
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

		// Formats URL for the API
		function getInfoURL(time) {
			// Pass user inputted time into formatTime
			$scope.time = formatTime(time);
			var URL = 'https://api.bart.gov/api/sched.aspx?cmd=arrive&orig=' + $scope.departureStation + 
				'&dest=' + $scope.arrivalStation + '&time=' + $scope.time + '&date=now&key=MW9S-E7SL-26DU-VV8V&b=2&a=2&l=1';

			return URL;
		};

		// Initialization function to populate stations
		$scope.init = (function(){
			function getStationsHTTP() {
				console.log('There were no stations in IDB... getStationsHTTP has been invoked!');
				// makes call to the stations endpoint of the BART API
				apiCalls.makeCall('https://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V').then(function(response) {
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
					$scope.stations = stations;
				});
			};

			// Invoked if IDB is populated with stations
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
					return stationsStore.getAllKeys();
				})
				.then(function(val) {
					// Check if an object exists in stations
					if (val.length !== 0) {
						getStationsIDB();
					} else {
						getStationsHTTP();
					}
				});
		})();

		// Reloads the state if user chooses to plan a new trip
		$scope.reload = function() {
			$state.reload();
		};

		// Sets the departure station for the API
		$scope.setDepartureStation = function(station) {
				$scope.departureStation = station.abbr['#text'];
				departureSelectedtoTrue();
				arrivalSelectedtoFalse();
		};

		// Sets the arrival station for the API
		$scope.setArrivalStation = function(station) {
				$scope.arrivalStation = station.abbr['#text'];
				if ($scope.arrivalStation === $scope.departureStation) {
					Materialize.toast('Arrival station must be different than departure station', 4000);
					return;				
				} else {
					arrivalSelectedtoTrue();
					timeSelectedtoFalse();
				}
		};

		// Gets the trips from the API
		$scope.getInfo = function(time) {
			// Grab the url from getInfoURL
			var url = getInfoURL(time);

			// Grab the current time in military format
			var currentTime = $filter('date')(new Date(), 'HH:mm:ss');
			var userTime = $filter('date')(time, 'HH:mm:ss');

			// Convert into new date (Jan 1 1970 works because trips are automatically sent
			// using today's date) and convert to milliseconds for comparison
			var current = new Date('Thu Jan 1 1970 ' + currentTime + ' GMT-0800' ).getTime();
			// We do this for the user's inputted time, just in case the app is being used
			// in a timezone other than PST (though BART is on the West Coast)
			var pacificTime = new Date('Thu Jan 1 1970 ' + userTime + ' GMT-0800');

			// Convert the user's input time into milliseconds for comparison
			var timeMil = new Date(pacificTime).getTime();

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
						// Alert the user of error
						Materialize.toast('Please reconnect to the internet', 4000);
					})
					.then(function(xml) {
						return xmlToJSON.xmlToJSON(xml);
					})
					.then(function(json) {
						$scope.trips = json.root.schedule.request.trip;
					}).then(function() {
						// Send the trips up to be received by index and sent
						// to trips
						$scope.$emit('tripEvent', $scope.trips);
						// Navigate to the trip state
						$state.go('trip');
					});			
			}
		};
	}]);
})();