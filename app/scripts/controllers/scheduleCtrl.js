(function() {
	'use strict';

	app.controller('scheduleCtrl', ['$scope', '$timeout', 'apiCalls', 'xmlToJSON', function($scope, $timeout, apiCalls, xmlToJSON) {
		$(document).ready(function(){
			$('.materialboxed').materialbox();
		});

		$(document).ready(function(){
			$('ul.tabs').tabs();
		});

		$scope.getSchedule = function(routeNum, objStore) {
			// Set to null to empty out the schedule
			$scope.schedule = null;

			// Called when there is no local copy of the schedule in IDB
			function getScheduleHTTP(objStore) {
				console.log('This schedule wasn\'t in IDB... getScheduleHTTP has been invoked!');
				apiCalls.makeCall('http://api.bart.gov/api/sched.aspx?cmd=routesched&route=' + routeNum + '&key=MW9S-E7SL-26DU-VV8V')
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
						return json.root.route.train;
					}).then(function(schedule) {
						dbPromise
							.then(function(db) {
								var tx = db.transaction(objStore, 'readwrite');
								var objectStore = tx.objectStore(objStore);
								schedule.forEach(function(stop) {
									objectStore.put(stop);
								});
							});

						$scope.schedule = schedule;
						console.log($scope.schedule);
					});
			};

			// Called when there is a local schedule stored in IDB
			function getScheduleIDB(objStore) {
				console.log('This schedule was in IDB... getScheduleIDB has been invoked!');
				dbPromise
					.then(function(db) {
						var tx = db.transaction(objStore);
						var objectStore = tx.objectStore(objStore);
						return objectStore.getAll();
					})
					.then(function(schedule) {
						$scope.schedule = schedule;
					})
					.then(function() {
						$scope.$apply();
					});
			};

			// Open up IDB
			dbPromise
				.then(function(db) {
					// Check for an existing object in our objectstore
					var tx = db.transaction(objStore);
					var objectStore = tx.objectStore(objStore);
					return objectStore.get('object:96');
				})
				.then(function(val) {
					// If an object exists, we have a copy of the schedule
					// in IDB
					if (val) {
						getScheduleIDB(objStore);
					// If no object exists, we don't have a copy in IDB
					} else {
						getScheduleHTTP(objStore);
					}
				});
			};

		$scope.hideTables = function() {
			$('.table--schedule').hide();
		};
	}]);	
})();