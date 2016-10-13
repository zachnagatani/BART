(function() {
	'use strict';

	app.controller('scheduleCtrl', ['$scope', function($scope) {
	  $(document).ready(function(){
	    $('.materialboxed').materialbox();
	  });
	  
	  $(document).ready(function(){
	    $('ul.tabs').tabs();
	  });
	}]);
})();