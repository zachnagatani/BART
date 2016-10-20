var app = angular.module('app', ['ui.router', 'ngAnimate']);

var dbPromise = idb.open('bart', 2, function(upgradeDb) {
	switch(upgradeDb.oldVersion) {
		case 0:
			var keyValStore = upgradeDb.createObjectStore('keyval');
			keyValStore.put('world', 'hello');
		case 1:
			var stations = upgradeDb.createObjectStore('stations');
	}
});

(function(){
	'use strict';

	// if (navigator.serviceWorker) {
	// 	navigator.serviceWorker.register('sw.js').then(function(reg) {
	// 		console.log('YOU DID IT!!!' + reg.scope);
	// 	}).catch(function(error) {
	// 		console.log('Nope you made a boo boo and uh baa-baa and a ' + error);
	// 	});
	// }

	app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: 'templates/home.html',
				controller: 'homeCtrl'
			})
			.state('planner', {
				url: '/planner',
				templateUrl: 'templates/planner.html',
				controller: 'plannerCtrl'
			})
			.state('trip', {
				url: '/trip',
				templateUrl: 'templates/trip.html',
				controller: 'tripCtrl'
			})
			.state('schedule', {
				url: '/schedule',
				templateUrl: 'templates/schedule.html',
				controller: 'scheduleCtrl'
			});

    	$urlRouterProvider.otherwise('/home');
	}]);

})();
