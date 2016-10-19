(function() {
	'use strict';

	app.controller('scheduleCtrl', ['$scope', '$timeout', 'apiCalls', 'xmlToJSON', function($scope, $timeout, apiCalls, xmlToJSON) {
	  // $(document).ready(function(){
	  //   $('.materialboxed').materialbox();
	  // });
	  
	  // $(document).ready(function(){
	  //   $('ul.tabs').tabs();
	  // });

		$scope.test = function() {
			console.log('test');
		};

		$scope.getSchedule = function(routeNum) {
		  apiCalls.makeCall('http://api.bart.gov/api/sched.aspx?cmd=routesched&route=1&key=MW9S-E7SL-26DU-VV8V')
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

		$scope.getSchedule();


	}]);	
})();