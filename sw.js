var staticCache = 'static-cache-v16';

this.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(staticCache)
			.then(function(cache) {
				return cache.addAll([
					'/BART/',
					'/BART/index.html',
					'/BART/styles/vendor.css',
					'/BART/styles/main.css',
					'/BART/scripts/vendor.js',
					'/BART/scripts/main.js',
					'/BART/templates/home.html',
					'/BART/templates/planner.html',
					'/BART/templates/trip.html',
					'/BART/templates/schedule.html',
					'/BART/images/bridge1.png',
					'/BART/images/bartmap.png',
					'/BART/fonts/roboto/Roboto-Regular.ttf',
					'/BART/fonts/roboto/Roboto-Regular.woff2',
					'/BART/fonts/roboto/Roboto-Regular.woff'
				])
			})
	);
});

this.addEventListener('activate', function(event) {
	event.waitUntil(
		caches.keys()
			.then(function(cacheNames) {
				return Promise.all(
					cacheNames.filter(function(cacheName) {
					return cacheName.startsWith('static-cache') &&
						   cacheName !== staticCache;
					})
					.map(function(cacheName) {
						caches.delete(cacheName);
					})
				)
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
	
	if(requestURL.origin +'/BART/' === location.origin + '/BART/' && !requestURL.href.includes('/browser-sync/')) {
		event.respondWith(fetchAndCache(staticCache, event.request));
	}
});