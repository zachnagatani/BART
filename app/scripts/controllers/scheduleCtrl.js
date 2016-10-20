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
			$scope.schedule = null;

			function getScheduleHTTP(objStore) {
				console.log('This schedule wasn\'t in IDB... getScheduleHTTP has been invoked!');
				apiCalls.makeCall('http://api.bart.gov/api/sched.aspx?cmd=routesched&route=' + routeNum + '&key=MW9S-E7SL-26DU-VV8V')
					.then(function(response) {
						return xmlToJSON.dataToDoc(response.data);
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

			dbPromise
				.then(function(db) {
					var tx = db.transaction(objStore);
					var objectStore = tx.objectStore(objStore);
					return objectStore.get('object:96');
				})
				.then(function(val) {
					if (val) {
						getScheduleIDB(objStore);
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