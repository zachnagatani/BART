var app = angular.module('app', ['ui.router', 'ngAnimate']);

(function(){
	'use strict';

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
