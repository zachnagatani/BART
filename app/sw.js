var staticCache = 'static-cache-v5';

this.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(staticCache)
			.then(function(cache) {
				return cache.addAll([
					'http://localhost:9000/index.html',
					'http://localhost:9000/sw.js',
					'http://localhost:9000/styles/main.css',
					'http://localhost:9000/scripts/idbp.js',
					'http://localhost:9000/scripts/main.js',
					'http://localhost:9000/scripts/services/services.js',
					'http://localhost:9000/scripts/controllers/indexCtrl.js',
					'http://localhost:9000/scripts/controllers/homeCtrl.js',
					'http://localhost:9000/scripts/controllers/plannerCtrl.js',
					'http://localhost:9000/scripts/controllers/tripCtrl.js',
					'http://localhost:9000/scripts/controllers/scheduleCtrl.js',
					'http://localhost:9000/templates/home.html',
					'http://localhost:9000/templates/planner.html',
					'http://localhost:9000/templates/trip.html',
					'http://localhost:9000/templates/schedule.html',
					'http://localhost:9000/images/bridge1.png',
					'http://localhost:9000/images/bartmap.png',
					'http://localhost:9000/bower_components/materialize/bin/materialize.css',
					'http://localhost:9000/bower_components/jquery/dist/jquery.js',
					'http://localhost:9000/bower_components/angular/angular.js',
					'http://localhost:9000/bower_components/angular-ui-router/release/angular-ui-router.js',
					'http://localhost:9000/bower_components/angular-aria/angular-aria.js',
					'http://localhost:9000/bower_components/angular-animate/angular-animate.js',
					'http://localhost:9000/bower_components/materialize/bin/materialize.js',
					'http://localhost:9000/bower_components/materialize/fonts/roboto/Roboto-Regular.woff2'
				])
			})
	);
});

function fetchAndCache(myCache, request) {
	return caches.open(myCache).then(function(cache) {
		return cache.match(request.url).then(function(response) {
			if (response) return response;
			
			return fetch(request).then(function(networkResponse) {
				cache.put(request.url, networkResponse.clone());
				return networkResponse;
			});
		});
	});
}

this.addEventListener('fetch', function(event) {
	var requestURL = new URL(event.request.url);

	if(requestURL.href.startsWith('http://localhost:9000/') && !requestURL.href.startsWith('http://localhost:9000/browser-sync/')) {
		event.respondWith(fetchAndCache(staticCache, event.request));
	}
});