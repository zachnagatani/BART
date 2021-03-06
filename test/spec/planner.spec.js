(function() {
	'use strict';

	describe('Planner controller', function() {
		// Inject our module before each test
		beforeEach(module('app'));

		// Grab $controller service
		var $controller;
		// Instantiate controller variable
		var controller;
		var $scope = {};

		// Inject plannerCtrl 
		beforeEach(inject(function(_$controller_){
			$controller = _$controller_;
			controller = $controller('plannerCtrl', {$scope: $scope});
		}));

		it('should exist', function() {
			expect(controller).toBeDefined();
		});

		describe('init method', function() {
			it('should return an array of stations objects', function() {
				// Call the init function to grab stations
				$scope.init();

				// $scope.stations should be an array
				expect(Array.isArray($scope.stations)).toBeTruthy();

				// Each item in $scope.station should be an object
				$scope.stations.forEach(function(station) {
					expect(typeof station).toEqual('object');
				});
			});
		});

		describe('setDepartureStation method', function() {
			it('should set $scope.departureStation to the abbreviation of the clicked station', function() {	
				var currentStation = {
	'name': {
		'#text': '12th St. Oakland City Center'
	},
	'abbr': {
		'#text': '12TH'
	},
	'gtfs_latitude': {
		'#text': '37.803664'
	},
	'gtfs_longitude': {
		'#text': '-122.271604'
	},
	'address': {
		'#text': '1245 Broadway'
	},
	'city': {
		'#text': 'Oakland'
	},
	'county': {
		'#text': 'alameda'
	},
	'state': {
		'#text': 'CA'
	},
	'zipcode': {
		'#text': '94612'
	}
				}

				$scope.setDepartureStation(currentStation);	

				expect($scope.departureStation).toEqual('12TH');
			});
		});

		describe('setArrivalStation method', function() {
			it('should set $scope.arrivalStation to the abbreviation of the clicked station', function() {	
				var currentStation = {
					'name': {
						'#text': '12th St. Oakland City Center'
					},
					'abbr': {
						'#text': '12TH'
					},
					'gtfs_latitude': {
						'#text': '37.803664'
					},
					'gtfs_longitude': {
						'#text': '-122.271604'
					},
					'address': {
						'#text': '1245 Broadway'
					},
					'city': {
						'#text': 'Oakland'
					},
					'county': {
						'#text': 'alameda'
					},
					'state': {
						'#text': 'CA'
					},
					'zipcode': {
						'#text': '94612'
					}
				}

				$scope.setArrivalStation(currentStation);	

				expect($scope.arrivalStation).toEqual('12TH');
			});
		});

		describe('departureSelectedtoTrue', function() {
			it('should set $scope.departureSelected to true', function() {
				it('should change $scope.departureSelected from false to true', function() {
					expect($scope.departureSelected).toEqual(false);
					$scope.departureSelectedtoTrue();
					expect($scope.departureSelected).toEqual(true);
				});
			});
		});

		describe('arrivalSelectedtoFalse', function() {
			it('should set $scope.arrivalSelected to false', function() {
				it('should change $scope.arrivalSelected from true to false', function() {
					expect($scope.arrivalSelected).toEqual(true);
					$scope.arrivalSelectedtoFalse();
					expect($scope.arrivalSelected).toEqual(false);
				});
			});
		});

		describe('arrivalSelectedtoTrue', function() {
			it('should set $scope.arrivalSelected to true', function() {
				it('should change $scope.arrivalSelected from false to true', function() {
					$scope.arrivalSelectedtoFalse();
					expect($scope.arrivalSelected).toEqual(false);
					$scope.arrivalSelectedtoTrue();
					expect($scope.arrivalSelected).toEqual(true);
				});
			});
		});

		describe('timeSelectedtoFalse', function() {
			it('should set $scope.timeSelected to false', function() {
				it('should change $scope.timeSelected from true to false', function() {
					expect($scope.timeSelected).toEqual(true);
					$scope.timeSelectedtoFalse();
					expect($scope.timeSelected).toEqual(false);
				});
			});
		});

		describe('formatTime', function() {
			it('should return a properly formatted time (HH:MM+PM) for the BART api', function() {
				var time = '2016-10-07T22:10';
				expect($scope.formatTime(time)).toEqual('10:10+PM');
			});
		});

		describe('getInfoURL', function() {
			it('should receive the formatted time from formatTime', function() {
				var time = '2016-10-07T22:10';
				$scope.getInfoURL(time);
				expect($scope.time).toEqual('10:10+PM');
			});

			it('should create a properly formatted URL for the BART api', function() {
				$scope.departureStation = '12TH';
				$scope.arrivalStation = 'CIVC';
				var time = '2016-10-07T22:10';
				var testURL = 'http://api.bart.gov/api/sched.aspx?cmd=arrive&orig=12TH&dest=CIVC&time=10:10+PM&date=now&key=MW9S-E7SL-26DU-VV8V&b=2&a=2&l=1';
				
				expect($scope.getInfoURL(time)).toEqual(testURL);
			});
		});

		describe('getInfo', function() {
				it('should set $scope.trips to the trips from the BART api in JSON form', function() {
					$scope.departureStation = '12TH';
					$scope.arrivalStation = 'CIVC';	
					var time = '2016-10-07T22:10';
					var trips = [{
						'@attributes': {
							'origin': '12TH',
							'destination': 'CIVC',
							'fare': '3.45',
							'origTimeMin': '9:20 PM',
							'origTimeDate': '10/13/2016 ',
							'destTimeMin': '9:36 PM',
							'destTimeDate': '10/13/2016',
							'clipper': '1.25',
							'tripTime': '16',
							'co2': '8.54'
						},
						'fares': {
							'@attributes': {
								'level': 'normal'
							},
							'fare': [{
								'@attributes': {
									'amount': '3.45',
									'class': 'cash'
								}
							}, {
								'@attributes': {
									'amount': '1.25',
									'class': 'rtcclipper'
								}
							}]
						},
						'leg': {
							'@attributes': {
								'order': '1',
								'transfercode': '',
								'origin': '12TH',
								'destination': 'CIVC',
								'origTimeMin': '9:20 PM',
								'origTimeDate': '10/13/2016',
								'destTimeMin': '9:36 PM',
								'destTimeDate': '10/13/2016',
								'line': 'ROUTE 1',
								'bikeflag': '1',
								'trainHeadStation': 'MLBR',
								'trainId': '363102037',
								'trainIdx': '86'
							}
						}
					}, {
						'@attributes': {
							'origin': '12TH',
							'destination': 'CIVC',
							'fare': '3.45',
							'origTimeMin': '9:40 PM',
							'origTimeDate': '10/13/2016 ',
							'destTimeMin': '9:56 PM',
							'destTimeDate': '10/13/2016',
							'clipper': '1.25',
							'tripTime': '16',
							'co2': '8.54'
						},
						'fares': {
							'@attributes': {
								'level': 'normal'
							},
							'fare': [{
								'@attributes': {
									'amount': '3.45',
									'class': 'cash'
								}
							}, {
								'@attributes': {
									'amount': '1.25',
									'class': 'rtcclipper'
								}
							}]
						},
						'leg': {
							'@attributes': {
								'order': '1',
								'transfercode': '',
								'origin': '12TH',
								'destination': 'CIVC',
								'origTimeMin': '9:40 PM',
								'origTimeDate': '10/13/2016',
								'destTimeMin': '9:56 PM',
								'destTimeDate': '10/13/2016',
								'line': 'ROUTE 1',
								'bikeflag': '1',
								'trainHeadStation': 'MLBR',
								'trainId': '367102057',
								'trainIdx': '87'
							}
						}
					}, {
						'@attributes': {
							'origin': '12TH',
							'destination': 'CIVC',
							'fare': '3.45',
							'origTimeMin': '10:00 PM',
							'origTimeDate': '10/13/2016 ',
							'destTimeMin': '10:16 PM',
							'destTimeDate': '10/13/2016',
							'clipper': '1.25',
							'tripTime': '16',
							'co2': '8.54'
						},
						'fares': {
							'@attributes': {
								'level': 'normal'
							},
							'fare': [{
								'@attributes': {
									'amount': '3.45',
									'class': 'cash'
								}
							}, {
								'@attributes': {
									'amount': '1.25',
									'class': 'rtcclipper'
								}
							}]
						},
						'leg': {
							'@attributes': {
								'order': '1',
								'transfercode': '',
								'origin': '12TH',
								'destination': 'CIVC',
								'origTimeMin': '10:00 PM',
								'origTimeDate': '10/13/2016',
								'destTimeMin': '10:16 PM',
								'destTimeDate': '10/13/2016',
								'line': 'ROUTE 1',
								'bikeflag': '1',
								'trainHeadStation': 'MLBR',
								'trainId': '369102117',
								'trainIdx': '88'
							}
						}
					}, {
						'@attributes': {
							'origin': '12TH',
							'destination': 'CIVC',
							'fare': '3.45',
							'origTimeMin': '10:20 PM',
							'origTimeDate': '10/13/2016 ',
							'destTimeMin': '10:36 PM',
							'destTimeDate': '10/13/2016',
							'clipper': '1.25',
							'tripTime': '16',
							'co2': '8.54'
						},
						'fares': {
							'@attributes': {
								'level': 'normal'
							},
							'fare': [{
								'@attributes': {
									'amount': '3.45',
									'class': 'cash'
								}
							}, {
								'@attributes': {
									'amount': '1.25',
									'class': 'rtcclipper'
								}
							}]
						},
						'leg': {
							'@attributes': {
								'order': '1',
								'transfercode': '',
								'origin': '12TH',
								'destination': 'CIVC',
								'origTimeMin': '10:20 PM',
								'origTimeDate': '10/13/2016',
								'destTimeMin': '10:36 PM',
								'destTimeDate': '10/13/2016',
								'line': 'ROUTE 1',
								'bikeflag': '1',
								'trainHeadStation': 'MLBR',
								'trainId': '371052137',
								'trainIdx': '89'
							}
						}
					}];

					$scope.getInfo(time);

					// Use setTimeout for async simulation
					setTimeout(function() {
							expect($scope.trips).toEqual(trips);
					}, 5000);
				});

				it('should contain an array with trip objects', function() {
					$scope.departureStation = '12TH';
					$scope.arrivalStation = 'CIVC';
					var URL = 'http://api.bart.gov/api/sched.aspx?cmd=arrive&orig=12TH&dest=CIVC&time=10:10+PM&date=now&key=MW9S-E7SL-26DU-VV8V&b=2&a=2&l=1';
					var time = '2016-10-07T22:10';
					var trip = {
						'@attributes': {
							'origin': '12TH',
							'destination': 'CIVC',
							'fare': '3.45',
							'origTimeMin': '9:20 PM',
							'origTimeDate': '10/13/2016 ',
							'destTimeMin': '9:36 PM',
							'destTimeDate': '10/13/2016',
							'clipper': '1.25',
							'tripTime': '16',
							'co2': '8.54'
						},
						'fares': {
							'@attributes': {
								'level': 'normal'
							},
							'fare': [{
								'@attributes': {
									'amount': '3.45',
									'class': 'cash'
								}
							}, {
								'@attributes': {
									'amount': '1.25',
									'class': 'rtcclipper'
								}
							}]
						},
						'leg': {
							'@attributes': {
								'order': '1',
								'transfercode': '',
								'origin': '12TH',
								'destination': 'CIVC',
								'origTimeMin': '9:20 PM',
								'origTimeDate': '10/13/2016',
								'destTimeMin': '9:36 PM',
								'destTimeDate': '10/13/2016',
								'line': 'ROUTE 1',
								'bikeflag': '1',
								'trainHeadStation': 'MLBR',
								'trainId': '363102037',
								'trainIdx': '86'
							}
						}
					};

					$scope.getInfo(time);

					// Use setTimeout for async simulation
					setTimeout(function() {
						expect($scope.trips[0]).toEqual(trip);
					}, 5000);
				});
		});
	});
})();