var staticCache = 'static-cache-v5';

this.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(staticCache)
			.then(function(cache) {
				return cache.addAll([
					'http://localhost:9000/index.html',
					'http://localhost:9000/sw.js',
					'http://localhost:9000/styles/main.css',
					'http://localhost:9000/styles/vendor.css',
					'http://localhost:9000/scripts/main.js',
					'http://localhost:9000/scripts/vendor.js',
					'http://localhost:9000/templates/home.html',
					'http://localhost:9000/templates/planner.html',
					'http://localhost:9000/templates/trip.html',
					'http://localhost:9000/templates/schedule.html',
					'http://localhost:9000/images/bridge1.png',
					'http://localhost:9000/images/bartmap.png',
					'http://localhost:9000/fonts/roboto/Roboto-Regular.ttf',
					'http://localhost:9000/fonts/roboto/Roboto-Regular.woff2',
					'http://localhost:9000/fonts/roboto/Roboto-Regular.woff'
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