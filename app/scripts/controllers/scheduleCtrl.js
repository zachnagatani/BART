(function() {
	'use strict';

	app.controller('scheduleCtrl', ['$scope', '$timeout', 'apiCalls', 'xmlToJSON', function($scope, $timeout, apiCalls, xmlToJSON) {
		$(document).ready(function(){
			$('.materialboxed').materialbox();
		});

		$(document).ready(function(){
			$('ul.tabs').tabs();
		});

		$scope.getSchedule = function(routeNum) {
			$scope.schedule = null;
			
			apiCalls.makeCall('http://api.bart.gov/api/sched.aspx?cmd=routesched&route=' + routeNum + '&key=MW9S-E7SL-26DU-VV8V')
				.then(function(response) {
					return xmlToJSON.dataToDoc(response.data);
				})
				.then(function(xml) {
					return xmlToJSON.xmlToJSON(xml);
				})
				.then(function(json) {
					$scope.schedule = json;
				}).then(function() {
					console.log($scope.schedule);
				});
			};

		$scope.hideTables = function() {
			$('.table--schedule').hide();
		};
	}]);	
})();