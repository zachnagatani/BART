(function() {
	'use strict';

	describe('apiCalls service', function() {
		var apiCalls;
		var URL = 'http://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V';
		var badURL = 'http://thekittycatoverloads.dslkfjasdkfaewirjfadskljf';

		// Inject our module
		beforeEach(module('app'));

		// Inject the apiCalls service
		beforeEach(inject(function(_apiCalls_) {
			apiCalls = _apiCalls_;
		}));

		// Make sure it exists
		it('should exist', function() {
			expect(apiCalls).toBeDefined();
		});

		describe('makeCall method', function() {
			// Check that it returns a valid response with a valid request
			it('should return a status of 200 when a valid request is made', function() {
				apiCalls.makeCall(URL)
					.then(function(response) {
						expect(response.status).toEqual(200);
					});
			});

			// Check that it returns the proper response for an invalid request
			it('should return a status of 400 when an invalid request is made', function() {
				apiCalls.makeCall(badURL)
					.then(function(response) {
						expect(response.status).toEqual(400);
					});
			});
		});
	});

	describe('xmlToJSON service', function() {
		var xmlToJSON;
		var apiCalls;
		var URL = 'http://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V';


		// Inject our module
		beforeEach(module('app'));

		// Inject the xmlToJSON and apiCalls services
		beforeEach(inject(function(_xmlToJSON_, _apiCalls_) {
			xmlToJSON = _xmlToJSON_;
			apiCalls = _apiCalls_;
		}));

		it('should exist', function() {
			expect(xmlToJSON).toBeDefined();
		});

		describe('dataToDoc method', function() {
			it('should exist', function() {
				expect(xmlToJSON.dataToDoc).toBeDefined();
			});

			it('should turn XML data into a proper XML node', function() {
				apiCalls.makeCall(URL)
					.then(function(response) {
						// The BART api returns it's XML as a string
						expect(typeof response.data).toEqual('string');
						return response.data
					})
					.then(function(data) {
						// The dataToDoc method should convert that XML string into an object
						expect(typeof xmlToJSON.dataToDoc(data)).toEqual('object');
					});
			});
		});

		describe('xmlToJSON method', function() {
			it('should exist', function() {
				expect(xmlToJSON.xmlToJSON).toBeDefined();
			});

			// The xmlToJSON method converts an xml object to a JSON object
			it('should return a JSON object', function() {
				// The actual value of a converted object
				var JSONobject = {
					'root': {
						'uri': {
							'#cdata-section': {}
						},
						'stations': {
							'station': [{
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
							}, {
								'name': {
									'#text': '16th St. Mission'
								},
								'abbr': {
									'#text': '16TH'
								},
								'gtfs_latitude': {
									'#text': '37.765062'
								},
								'gtfs_longitude': {
									'#text': '-122.419694'
								},
								'address': {
									'#text': '2000 Mission Street'
								},
								'city': {
									'#text': 'San Francisco'
								},
								'county': {
									'#text': 'sanfrancisco'
								},
								'state': {
									'#text': 'CA'
								},
								'zipcode': {
									'#text': '94110'
								}
							}, {
								'name': {
									'#text': '19th St. Oakland'
								},
								'abbr': {
									'#text': '19TH'
								},
								'gtfs_latitude': {
									'#text': '37.80787'
								},
								'gtfs_longitude': {
									'#text': '-122.269029'
								},
								'address': {
									'#text': '1900 Broadway'
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
							}, {
								'name': {
									'#text': '24th St. Mission'
								},
								'abbr': {
									'#text': '24TH'
								},
								'gtfs_latitude': {
									'#text': '37.752254'
								},
								'gtfs_longitude': {
									'#text': '-122.418466'
								},
								'address': {
									'#text': '2800 Mission Street'
								},
								'city': {
									'#text': 'San Francisco'
								},
								'county': {
									'#text': 'sanfrancisco'
								},
								'state': {
									'#text': 'CA'
								},
								'zipcode': {
									'#text': '94110'
								}
							}, {
								'name': {
									'#text': 'Ashby'
								},
								'abbr': {
									'#text': 'ASHB'
								},
								'gtfs_latitude': {
									'#text': '37.853024'
								},
								'gtfs_longitude': {
									'#text': '-122.26978'
								},
								'address': {
									'#text': '3100 Adeline Street'
								},
								'city': {
									'#text': 'Berkeley'
								},
								'county': {
									'#text': 'alameda'
								},
								'state': {
									'#text': 'CA'
								},
								'zipcode': {
									'#text': '94703'
								}
							}, {
								'name': {
									'#text': 'Balboa Park'
								},
								'abbr': {
									'#text': 'BALB'
								},
								'gtfs_latitude': {
									'#text': '37.72198087'
								},
								'gtfs_longitude': {
									'#text': '-122.4474142'
								},
								'address': {
									'#text': '401 Geneva Avenue'
								},
								'city': {
									'#text': 'San Francisco'
								},
								'county': {
									'#text': 'sanfrancisco'
								},
								'state': {
									'#text': 'CA'
								},
								'zipcode': {
									'#text': '94112'
								}
							}, {
								'name': {
									'#text': 'Bay Fair'
								},
								'abbr': {
									'#text': 'BAYF'
								},
								'gtfs_latitude': {
									'#text': '37.697185'
								},
								'gtfs_longitude': {
									'#text': '-122.126871'
								},
								'address': {
									'#text': '15242 Hesperian Blvd.'
								},
								'city': {
									'#text': 'San Leandro'
								},
								'county': {
									'#text': 'alameda'
								},
								'state': {
									'#text': 'CA'
								},
								'zipcode': {
									'#text': '94578'
								}
							}, {
								'name': {
									'#text': 'Castro Valley'
								},
								'abbr': {
									'#text': 'CAST'
								},
								'gtfs_latitude': {
									'#text': '37.690754'
								},
								'gtfs_longitude': {
									'#text': '-122.075567'
								},
								'address': {
									'#text': '3301 Norbridge Dr.'
								},
								'city': {
									'#text': 'Castro Valley'
								},
								'county': {
									'#text': 'alameda'
								},
								'state': {
									'#text': 'CA'
								},
								'zipcode': {
									'#text': '94546'
								}
							}, {
								'name': {
									'#text': 'Civic Center/UN Plaza'
								},
								'abbr': {
									'#text': 'CIVC'
								},
								'gtfs_latitude': {
									'#text': '37.779528'
								},
								'gtfs_longitude': {
									'#text': '-122.413756'
								},
								'address': {
									'#text': '1150 Market Street'
								},
								'city': {
									'#text': 'San Francisco'
								},
								'county': {
									'#text': 'sanfrancisco'
								},
								'state': {
									'#text': 'CA'
								},
								'zipcode': {
									'#text': '94102'
								}
							}, {
								'name': {
									'#text': 'Coliseum'
								},
								'abbr': {
									'#text': 'COLS'
								},
								'gtfs_latitude': {
									'#text': '37.754006'
								},
								'gtfs_longitude': {
									'#text': '-122.197273'
								},
								'address': {
									'#text': '7200 San Leandro St.'
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
									'#text': '94621'
								}
							}, {
								'name': {
									'#text': 'Colma'
								},
								'abbr': {
									'#text': 'COLM'
								},
								'gtfs_latitude': {
									'#text': '37.684638'
								},
								'gtfs_longitude': {
									'#text': '-122.466233'
								},
								'address': {
									'#text': '365 D Street'
								},
								'city': {
									'#text': 'Colma'
								},
								'county': {
									'#text': 'sanmateo'
								},
								'state': {
									'#text': 'CA'
								},
								'zipcode': {
									'#text': '94014'
								}
							}, {
								'name': {
									'#text': 'Concord'
								},
								'abbr': {
									'#text': 'CONC'
								},
								'gtfs_latitude': {
									'#text': '37.973737'
								},
								'gtfs_longitude': {
									'#text': '-122.029095'
								},
								'address': {
									'#text': '1451 Oakland Avenue'
								},
								'city': {
									'#text': 'Concord'
								},
								'county': {
									'#text': 'contracosta'
								},
								'state': {
									'#text': 'CA'
								},
								'zipcode': {
									'#text': '94520'
								}
							}, {
								'name': {
									'#text': 'Daly City'
								},
								'abbr': {
									'#text': 'DALY'
								},
								'gtfs_latitude': {
									'#text': '37.70612055'
								},
								'gtfs_longitude': {
									'#text': '-122.4690807'
								},
								'address': {
									'#text': '500 John Daly Blvd.'
								},
								'city': {
									'#text': 'Daly City'
								},
								'county': {
									'#text': 'sanmateo'
								},
								'state': {
									'#text': 'CA'
								},
								'zipcode': {
									'#text': '94014'
								}
							}, {
								'name': {
									'#text': 'Downtown Berkeley'
								},
								'abbr': {
									'#text': 'DBRK'
								},
								'gtfs_latitude': {
									'#text': '37.869867'
								},
								'gtfs_longitude': {
									'#text': '-122.268045'
								},
								'address': {
									'#text': '2160 Shattuck Avenue'
								},
								'city': {
									'#text': 'Berkeley'
								},
								'county': {
									'#text': 'alameda'
								},
								'state': {
									'#text': 'CA'
								},
								'zipcode': {
									'#text': '94704'
								}
							}, {
								'name': {
									'#text': 'Dublin/Pleasanton'
								},
								'abbr': {
									'#text': 'DUBL'
								},
								'gtfs_latitude': {
									'#text': '37.701695'
								},
								'gtfs_longitude': {
									'#text': '-121.900367'
								},
								'address': {
									'#text': '5801 Owens Dr.'
								},
								'city': {
									'#text': 'Pleasanton'
								},
								'county': {
									'#text': 'alameda'
								},
								'state': {
									'#text': 'CA'
								},
								'zipcode': {
									'#text': '94588'
								}
							}, {
								'name': {
									'#text': 'El Cerrito del Norte'
								},
								'abbr': {
									'#text': 'DELN'
								},
								'gtfs_latitude': {
									'#text': '37.925655'
								},
								'gtfs_longitude': {
									'#text': '-122.317269'
								},
								'address': {
									'#text': '6400 Cutting Blvd.'
								},
								'city': {
									'#text': 'El Cerrito'
								},
								'county': {
									'#text': 'contracosta'
								},
								'state': {
									'#text': 'CA'
								},
								'zipcode': {
									'#text': '94530'
								}
							}, {
								'name': {
									'#text': 'El Cerrito Plaza'
								},
								'abbr': {
									'#text': 'PLZA'
								},
								'gtfs_latitude': {
									'#text': '37.9030588'
								},
								'gtfs_longitude': {
									'#text': '-122.2992715'
								},
								'address': {
									'#text': '6699 Fairmount Avenue'
								},
								'city': {
									'#text': 'El Cerrito'
								},
								'county': {
									'#text': 'contracosta'
								},
								'state': {
									'#text': 'CA'
								},
								'zipcode': {
									'#text': '94530'
								}
							}, {
								'name': {
									'#text': 'Embarcadero'
								},
								'abbr': {
									'#text': 'EMBR'
								},
								'gtfs_latitude': {
									'#text': '37.792976'
								},
								'gtfs_longitude': {
									'#text': '-122.396742'
								},
								'address': {
									'#text': '298 Market Street'
								},
								'city': {
									'#text': 'San Francisco'
								},
								'county': {
									'#text': 'sanfrancisco'
								},
								'state': {
									'#text': 'CA'
								},
								'zipcode': {
									'#text': '94111'
								}
							}, {
								'name': {
									'#text': 'Fremont'
								},
								'abbr': {
									'#text': 'FRMT'
								},
								'gtfs_latitude': {
									'#text': '37.557355'
								},
								'gtfs_longitude': {
									'#text': '-121.9764'
								},
								'address': {
									'#text': '2000 BART Way'
								},
								'city': {
									'#text': 'Fremont'
								},
								'county': {
									'#text': 'alameda'
								},
								'state': {
									'#text': 'CA'
								},
								'zipcode': {
									'#text': '94536'
								}
							}, {
								'name': {
									'#text': 'Fruitvale'
								},
								'abbr': {
									'#text': 'FTVL'
								},
								'gtfs_latitude': {
									'#text': '37.774963'
								},
								'gtfs_longitude': {
									'#text': '-122.224274'
								},
								'address': {
									'#text': '3401 East 12th Street'
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
									'#text': '94601'
								}
							}, {
								'name': {
									'#text': 'Glen Park'
								},
								'abbr': {
									'#text': 'GLEN'
								},
								'gtfs_latitude': {
									'#text': '37.732921'
								},
								'gtfs_longitude': {
									'#text': '-122.434092'
								},
								'address': {
									'#text': '2901 Diamond Street'
								},
								'city': {
									'#text': 'San Francisco'
								},
								'county': {
									'#text': 'sanfrancisco'
								},
								'state': {
									'#text': 'CA'
								},
								'zipcode': {
									'#text': '94131'
								}
							}, {
								'name': {
									'#text': 'Hayward'
								},
								'abbr': {
									'#text': 'HAYW'
								},
								'gtfs_latitude': {
									'#text': '37.670399'
								},
								'gtfs_longitude': {
									'#text': '-122.087967'
								},
								'address': {
									'#text': '699 "B" Street'
								},
								'city': {
									'#text': 'Hayward'
								},
								'county': {
									'#text': 'alameda'
								},
								'state': {
									'#text': 'CA'
								},
								'zipcode': {
									'#text': '94541'
								}
							}, {
								'name': {
									'#text': 'Lafayette'
								},
								'abbr': {
									'#text': 'LAFY'
								},
								'gtfs_latitude': {
									'#text': '37.893394'
								},
								'gtfs_longitude': {
									'#text': '-122.123801'
								},
								'address': {
									'#text': '3601 Deer Hill Road'
								},
								'city': {
									'#text': 'Lafayette'
								},
								'county': {
									'#text': 'contracosta'
								},
								'state': {
									'#text': 'CA'
								},
								'zipcode': {
									'#text': '94549'
								}
							}, {
								'name': {
									'#text': 'Lake Merritt'
								},
								'abbr': {
									'#text': 'LAKE'
								},
								'gtfs_latitude': {
									'#text': '37.797484'
								},
								'gtfs_longitude': {
									'#text': '-122.265609'
								},
								'address': {
									'#text': '800 Madison Street'
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
									'#text': '94607'
								}
							}, {
								'name': {
									'#text': 'MacArthur'
								},
								'abbr': {
									'#text': 'MCAR'
								},
								'gtfs_latitude': {
									'#text': '37.828415'
								},
								'gtfs_longitude': {
									'#text': '-122.267227'
								},
								'address': {
									'#text': '555 40th Street'
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
									'#text': '94609'
								}
							}, {
								'name': {
									'#text': 'Millbrae'
								},
								'abbr': {
									'#text': 'MLBR'
								},
								'gtfs_latitude': {
									'#text': '37.599787'
								},
								'gtfs_longitude': {
									'#text': '-122.38666'
								},
								'address': {
									'#text': '200 North Rollins Road'
								},
								'city': {
									'#text': 'Millbrae'
								},
								'county': {
									'#text': 'sanmateo'
								},
								'state': {
									'#text': 'CA'
								},
								'zipcode': {
									'#text': '94030'
								}
							}, {
								'name': {
									'#text': 'Montgomery St.'
								},
								'abbr': {
									'#text': 'MONT'
								},
								'gtfs_latitude': {
									'#text': '37.789256'
								},
								'gtfs_longitude': {
									'#text': '-122.401407'
								},
								'address': {
									'#text': '598 Market Street'
								},
								'city': {
									'#text': 'San Francisco'
								},
								'county': {
									'#text': 'sanfrancisco'
								},
								'state': {
									'#text': 'CA'
								},
								'zipcode': {
									'#text': '94104'
								}
							}, {
								'name': {
									'#text': 'North Berkeley'
								},
								'abbr': {
									'#text': 'NBRK'
								},
								'gtfs_latitude': {
									'#text': '37.87404'
								},
								'gtfs_longitude': {
									'#text': '-122.283451'
								},
								'address': {
									'#text': '1750 Sacramento Street'
								},
								'city': {
									'#text': 'Berkeley'
								},
								'county': {
									'#text': 'alameda'
								},
								'state': {
									'#text': 'CA'
								},
								'zipcode': {
									'#text': '94702'
								}
							}, {
								'name': {
									'#text': 'North Concord/Martinez'
								},
								'abbr': {
									'#text': 'NCON'
								},
								'gtfs_latitude': {
									'#text': '38.003275'
								},
								'gtfs_longitude': {
									'#text': '-122.024597'
								},
								'address': {
									'#text': '3700 Port Chicago Highway'
								},
								'city': {
									'#text': 'Concord'
								},
								'county': {
									'#text': 'contracosta'
								},
								'state': {
									'#text': 'CA'
								},
								'zipcode': {
									'#text': '94520'
								}
							}, {
								'name': {
									'#text': 'Oakland Int\'l Airport'
								},
								'abbr': {
									'#text': 'OAKL'
								},
								'gtfs_latitude': {
									'#text': '37.71297174'
								},
								'gtfs_longitude': {
									'#text': '-122.21244024'
								},
								'address': {
									'#text': '4 Airport Drive'
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
									'#text': '94621'
								}
							}, {
								'name': {
									'#text': 'Orinda'
								},
								'abbr': {
									'#text': 'ORIN'
								},
								'gtfs_latitude': {
									'#text': '37.87836087'
								},
								'gtfs_longitude': {
									'#text': '-122.1837911'
								},
								'address': {
									'#text': '11 Camino Pablo'
								},
								'city': {
									'#text': 'Orinda'
								},
								'county': {
									'#text': 'contracosta'
								},
								'state': {
									'#text': 'CA'
								},
								'zipcode': {
									'#text': '94563'
								}
							}, {
								'name': {
									'#text': 'Pittsburg/Bay Point'
								},
								'abbr': {
									'#text': 'PITT'
								},
								'gtfs_latitude': {
									'#text': '38.018914'
								},
								'gtfs_longitude': {
									'#text': '-121.945154'
								},
								'address': {
									'#text': '1700 West Leland Road'
								},
								'city': {
									'#text': 'Pittsburg'
								},
								'county': {
									'#text': 'contracosta'
								},
								'state': {
									'#text': 'CA'
								},
								'zipcode': {
									'#text': '94565'
								}
							}, {
								'name': {
									'#text': 'Pleasant Hill/Contra Costa Centre'
								},
								'abbr': {
									'#text': 'PHIL'
								},
								'gtfs_latitude': {
									'#text': '37.928403'
								},
								'gtfs_longitude': {
									'#text': '-122.056013'
								},
								'address': {
									'#text': '1365 Treat Blvd.'
								},
								'city': {
									'#text': 'Walnut Creek'
								},
								'county': {
									'#text': 'contracosta'
								},
								'state': {
									'#text': 'CA'
								},
								'zipcode': {
									'#text': '94597'
								}
							}, {
								'name': {
									'#text': 'Powell St.'
								},
								'abbr': {
									'#text': 'POWL'
								},
								'gtfs_latitude': {
									'#text': '37.784991'
								},
								'gtfs_longitude': {
									'#text': '-122.406857'
								},
								'address': {
									'#text': '899 Market Street'
								},
								'city': {
									'#text': 'San Francisco'
								},
								'county': {
									'#text': 'sanfrancisco'
								},
								'state': {
									'#text': 'CA'
								},
								'zipcode': {
									'#text': '94102'
								}
							}, {
								'name': {
									'#text': 'Richmond'
								},
								'abbr': {
									'#text': 'RICH'
								},
								'gtfs_latitude': {
									'#text': '37.936887'
								},
								'gtfs_longitude': {
									'#text': '-122.353165'
								},
								'address': {
									'#text': '1700 Nevin Avenue'
								},
								'city': {
									'#text': 'Richmond'
								},
								'county': {
									'#text': 'contracosta'
								},
								'state': {
									'#text': 'CA'
								},
								'zipcode': {
									'#text': '94801'
								}
							}, {
								'name': {
									'#text': 'Rockridge'
								},
								'abbr': {
									'#text': 'ROCK'
								},
								'gtfs_latitude': {
									'#text': '37.844601'
								},
								'gtfs_longitude': {
									'#text': '-122.251793'
								},
								'address': {
									'#text': '5660 College Avenue'
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
									'#text': '94618'
								}
							}, {
								'name': {
									'#text': 'San Bruno'
								},
								'abbr': {
									'#text': 'SBRN'
								},
								'gtfs_latitude': {
									'#text': '37.637753'
								},
								'gtfs_longitude': {
									'#text': '-122.416038'
								},
								'address': {
									'#text': '1151 Huntington Avenue'
								},
								'city': {
									'#text': 'San Bruno'
								},
								'county': {
									'#text': 'sanmateo'
								},
								'state': {
									'#text': 'CA'
								},
								'zipcode': {
									'#text': '94066'
								}
							}, {
								'name': {
									'#text': 'San Francisco Int\'l Airport'
								},
								'abbr': {
									'#text': 'SFIA'
								},
								'gtfs_latitude': {
									'#text': '37.616035'
								},
								'gtfs_longitude': {
									'#text': '-122.392612'
								},
								'address': {
									'#text': 'International Terminal, Level 3'
								},
								'city': {
									'#text': 'San Francisco Int\'l Airport'
								},
								'county': {
									'#text': 'sanmateo'
								},
								'state': {
									'#text': 'CA'
								},
								'zipcode': {
									'#text': '94128'
								}
							}, {
								'name': {
									'#text': 'San Leandro'
								},
								'abbr': {
									'#text': 'SANL'
								},
								'gtfs_latitude': {
									'#text': '37.72261921'
								},
								'gtfs_longitude': {
									'#text': '-122.1613112'
								},
								'address': {
									'#text': '1401 San Leandro Blvd.'
								},
								'city': {
									'#text': 'San Leandro'
								},
								'county': {
									'#text': 'alameda'
								},
								'state': {
									'#text': 'CA'
								},
								'zipcode': {
									'#text': '94577'
								}
							}, {
								'name': {
									'#text': 'South Hayward'
								},
								'abbr': {
									'#text': 'SHAY'
								},
								'gtfs_latitude': {
									'#text': '37.63479954'
								},
								'gtfs_longitude': {
									'#text': '-122.0575506'
								},
								'address': {
									'#text': '28601 Dixon Street'
								},
								'city': {
									'#text': 'Hayward'
								},
								'county': {
									'#text': 'alameda'
								},
								'state': {
									'#text': 'CA'
								},
								'zipcode': {
									'#text': '94544'
								}
							}, {
								'name': {
									'#text': 'South San Francisco'
								},
								'abbr': {
									'#text': 'SSAN'
								},
								'gtfs_latitude': {
									'#text': '37.664174'
								},
								'gtfs_longitude': {
									'#text': '-122.444116'
								},
								'address': {
									'#text': '1333 Mission Road'
								},
								'city': {
									'#text': 'South San Francisco'
								},
								'county': {
									'#text': 'sanmateo'
								},
								'state': {
									'#text': 'CA'
								},
								'zipcode': {
									'#text': '94080'
								}
							}, {
								'name': {
									'#text': 'Union City'
								},
								'abbr': {
									'#text': 'UCTY'
								},
								'gtfs_latitude': {
									'#text': '37.591208'
								},
								'gtfs_longitude': {
									'#text': '-122.017867'
								},
								'address': {
									'#text': '10 Union Square'
								},
								'city': {
									'#text': 'Union City'
								},
								'county': {
									'#text': 'alameda'
								},
								'state': {
									'#text': 'CA'
								},
								'zipcode': {
									'#text': '94587'
								}
							}, {
								'name': {
									'#text': 'Walnut Creek'
								},
								'abbr': {
									'#text': 'WCRK'
								},
								'gtfs_latitude': {
									'#text': '37.905628'
								},
								'gtfs_longitude': {
									'#text': '-122.067423'
								},
								'address': {
									'#text': '200 Ygnacio Valley Road'
								},
								'city': {
									'#text': 'Walnut Creek'
								},
								'county': {
									'#text': 'contracosta'
								},
								'state': {
									'#text': 'CA'
								},
								'zipcode': {
									'#text': '94596'
								}
							}, {
								'name': {
									'#text': 'West Dublin/Pleasanton'
								},
								'abbr': {
									'#text': 'WDUB'
								},
								'gtfs_latitude': {
									'#text': '37.699759'
								},
								'gtfs_longitude': {
									'#text': '-121.928099'
								},
								'address': {
									'#text': '6501 Golden Gate Drive'
								},
								'city': {
									'#text': 'Dublin'
								},
								'county': {
									'#text': 'alameda'
								},
								'state': {
									'#text': 'CA'
								},
								'zipcode': {
									'#text': '94568'
								}
							}, {
								'name': {
									'#text': 'West Oakland'
								},
								'abbr': {
									'#text': 'WOAK'
								},
								'gtfs_latitude': {
									'#text': '37.80467476'
								},
								'gtfs_longitude': {
									'#text': '-122.2945822'
								},
								'address': {
									'#text': '1451 7th Street'
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
									'#text': '94607'
								}
							}]
						},
						'message': {}
					}
				};

				apiCalls.makeCall(URL)
					.then(function(response) {
						return xmlToJSON.dataToDoc(response.data);
					})
					.then(function(xmlObject) {
						// The result of xmlToJSON should equal JSON object
						expect(xmlToJSON.xmlToJSON(xmlObject)).toEqual(JSONobject);
					});
			});

		});
	});
})();