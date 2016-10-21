var app = angular.module('app', ['ui.router', 'ngAnimate']);

var dbPromise = idb.open('bart', 2, function(upgradeDb) {
	switch(upgradeDb.oldVersion) {
		case 0:
			var keyValStore = upgradeDb.createObjectStore('keyval');
			keyValStore.put('world', 'hello');
		case 1:
			var stations = upgradeDb.createObjectStore('stations', {keyPath: '$$hashKey'});
		case 2:
			var pittSFO = upgradeDb.createObjectStore('pittSFO', {keyPath: '$$hashKey'});
			var SFOpitt = upgradeDb.createObjectStore('SFOpitt', {keyPath: '$$hashKey'});
			var fremRich = upgradeDb.createObjectStore('fremRich', {keyPath: '$$hashKey'});
			var richFrem = upgradeDb.createObjectStore('richFrem', {keyPath: '$$hashKey'});
			var richMill = upgradeDb.createObjectStore('richMill', {keyPath: '$$hashKey'});
			var millRich = upgradeDb.createObjectStore('millRich', {keyPath: '$$hashKey'});
			var dubDaly = upgradeDb.createObjectStore('dubDaly', {keyPath: '$$hashKey'});
			var dalyDub = upgradeDb.createObjectStore('dalyDub', {keyPath: '$$hashKey'});
			var fremDaly = upgradeDb.createObjectStore('fremDaly', {keyPath: '$$hashKey'});
			var dalyFrem = upgradeDb.createObjectStore('dalyFrem', {keyPath: '$$hashKey'});
			var colOak = upgradeDb.createObjectStore('colOak', {keyPath: '$$hashKey'});
			var oakCol = upgradeDb.createObjectStore('oakCol', {keyPath: '$$hashKey'});
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
