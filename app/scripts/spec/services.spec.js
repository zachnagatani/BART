(function() {
	'use strict';

	describe('apiCalls service', function() {
		var apiCalls;

		var URL = 'http://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V';

		var badURL = 'http://thekittycatoverloads.dslkfjasdkfaewirjfadskljf';

		// Inject our module
		beforeEach(module('app'));

		beforeEach(inject(function(_apiCalls_) {
			apiCalls = _apiCalls_;
		}));

		it('should exist', function() {
			expect(apiCalls).toBeDefined();
		});

		it('should return a status of 200 when a valid request is made', function() {
			apiCalls.makeCall(URL)
				.then(function(response) {
					expect(response.status).toEqual(200);
				});
		});

		it('should return a status of 400 when an invalid request is made', function() {
			apiCalls.makeCall(badURL)
				.then(function(response) {
					expect(response.status).toEqual(400);
				});
		});
	});
})();