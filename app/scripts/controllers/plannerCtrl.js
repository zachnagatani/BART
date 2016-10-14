(function() {
	'use strict';

	app.controller('plannerCtrl', ['$scope', 'apiCalls', 'xmlToJSON', function($scope, apiCalls, xmlToJSON) {
			(function() {
				apiCalls.makeCall('http://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V')
					.then(function(response) {
						return xmlToJSON.dataToDoc(response.data);
					})
					.then(function(data) {
						console.log(JSON.stringify(xmlToJSON.xmlToJSON(data)));
					});
			})();
	}]);
})();