(function() {
	'use strict';
	
	describe('Trip controller', function() {
		// Inject our module before each test
		beforeEach(module('app'));

		// Grab $controller service
		var $controller, $timeout;
		// Instantiate controller variable
		var controller;
		var $scope = {};

		// Inject tripCtrl 
		beforeEach(inject(function(_$controller_, _$timeout_){
			$controller = _$controller_;
			$timeout = _$timeout_;
			controller = $controller('tripCtrl', {$scope: $scope});
		}));

		it('should exist', function() {
			expect(controller).toBeDefined();
		});

		it('should be initialized with $scope.trips', function() {
			var apiCalls, xmlToJSON;

			inject(function(_apiCalls_, _xmlToJSON_) {
				apiCalls = _apiCalls_;
				xmlToJSON = _xmlToJSON_;
			});

			$scope.trips = null;

			var URL = 'http://api.bart.gov/api/sched.aspx?cmd=arrive&orig=12TH&dest=16TH&time=01:00+PM&date=now&key=MW9S-E7SL-26DU-VV8V&b=2&a=2&l=1';

			var trips = [{
				'@attributes': {
					'origin': '12TH',
					'destination': '16TH',
					'fare': '3.60',
					'origTimeMin': '12:28 PM',
					'origTimeDate': '10/18/2016 ',
					'destTimeMin': '12:46 PM',
					'destTimeDate': '10/18/2016',
					'clipper': '1.35',
					'tripTime': '18',
					'co2': '9.03'
				},
				'fares': {
					'@attributes': {
						'level': 'normal'
					},
					'fare': [{
						'@attributes': {
							'amount': '3.60',
							'class': 'cash'
						}
					}, {
						'@attributes': {
							'amount': '1.35',
							'class': 'rtcclipper'
						}
					}]
				},
				'leg': {
					'@attributes': {
						'order': '1',
						'transfercode': '',
						'origin': '12TH',
						'destination': '16TH',
						'origTimeMin': '12:28 PM',
						'origTimeDate': '10/18/2016',
						'destTimeMin': '12:46 PM',
						'destTimeDate': '10/18/2016',
						'line': 'ROUTE 1',
						'bikeflag': '1',
						'trainHeadStation': 'SFIA',
						'trainId': '371051147',
						'trainIdx': '46'
					}
				}
			}, {
				'@attributes': {
					'origin': '12TH',
					'destination': '16TH',
					'fare': '3.60',
					'origTimeMin': '12:36 PM',
					'origTimeDate': '10/18/2016 ',
					'destTimeMin': '12:54 PM',
					'destTimeDate': '10/18/2016',
					'clipper': '1.35',
					'tripTime': '18',
					'co2': '9.03'
				},
				'fares': {
					'@attributes': {
						'level': 'normal'
					},
					'fare': [{
						'@attributes': {
							'amount': '3.60',
							'class': 'cash'
						}
					}, {
						'@attributes': {
							'amount': '1.35',
							'class': 'rtcclipper'
						}
					}]
				},
				'leg': {
					'@attributes': {
						'order': '1',
						'transfercode': '',
						'origin': '12TH',
						'destination': '16TH',
						'origTimeMin': '12:36 PM',
						'origTimeDate': '10/18/2016',
						'destTimeMin': '12:54 PM',
						'destTimeDate': '10/18/2016',
						'line': 'ROUTE 7',
						'bikeflag': '1',
						'trainHeadStation': 'MLBR',
						'trainId': '441051212',
						'trainIdx': '33'
					}
				}
			}, {
				'@attributes': {
					'origin': '12TH',
					'destination': '16TH',
					'fare': '3.60',
					'origTimeMin': '12:43 PM',
					'origTimeDate': '10/18/2016 ',
					'destTimeMin': '1:01 PM',
					'destTimeDate': '10/18/2016',
					'clipper': '1.35',
					'tripTime': '18',
					'co2': '9.03'
				},
				'fares': {
					'@attributes': {
						'level': 'normal'
					},
					'fare': [{
						'@attributes': {
							'amount': '3.60',
							'class': 'cash'
						}
					}, {
						'@attributes': {
							'amount': '1.35',
							'class': 'rtcclipper'
						}
					}]
				},
				'leg': {
					'@attributes': {
						'order': '1',
						'transfercode': '',
						'origin': '12TH',
						'destination': '16TH',
						'origTimeMin': '12:43 PM',
						'origTimeDate': '10/18/2016',
						'destTimeMin': '1:01 PM',
						'destTimeDate': '10/18/2016',
						'line': 'ROUTE 1',
						'bikeflag': '1',
						'trainHeadStation': 'SFIA',
						'trainId': '373101202',
						'trainIdx': '47'
					}
				}
			}, {
				'@attributes': {
					'origin': '12TH',
					'destination': '16TH',
					'fare': '3.60',
					'origTimeMin': '12:51 PM',
					'origTimeDate': '10/18/2016 ',
					'destTimeMin': '1:09 PM',
					'destTimeDate': '10/18/2016',
					'clipper': '1.35',
					'tripTime': '18',
					'co2': '9.03'
				},
				'fares': {
					'@attributes': {
						'level': 'normal'
					},
					'fare': [{
						'@attributes': {
							'amount': '3.60',
							'class': 'cash'
						}
					}, {
						'@attributes': {
							'amount': '1.35',
							'class': 'rtcclipper'
						}
					}]
				},
				'leg': {
					'@attributes': {
						'order': '1',
						'transfercode': '',
						'origin': '12TH',
						'destination': '16TH',
						'origTimeMin': '12:51 PM',
						'origTimeDate': '10/18/2016',
						'destTimeMin': '1:09 PM',
						'destTimeDate': '10/18/2016',
						'line': 'ROUTE 7',
						'bikeflag': '1',
						'trainHeadStation': 'MLBR',
						'trainId': '443051227',
						'trainIdx': '34'
					}
				}
			}];

			apiCalls.makeCall(URL)
				.then(function(response) {
					return xmlToJSON.dataToDoc(response.data);
				})
				.then(function(xml) {
					return xmlToJSON.xmlToJSON(xml);
				})
				.then(function(json) {
					$scope.trips = json.root.schedule.request.trip;
				})
				.then(function() {
					expect($scope.trips).toEqual(trips);
				});
		});

		describe('addID method', function() {
			it('should add incremental ID\'s to each trip', function() {
				var tripsWithID = [{
					'id': 1,
				}, {
					'id': 2,
				}, {
					'id': 3
				}];

				$scope.trips = [{}, {}, {}];

				$scope.addID();

				expect($scope.trips).toEqual(tripsWithID);
			});
		})
	});
})();