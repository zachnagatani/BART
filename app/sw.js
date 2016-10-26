var staticCache = 'static-cache-v16';

this.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(staticCache)
			.then(function(cache) {
				return cache.addAll([
					'/',
					'/index.html',
					'/styles/vendor.css',
					'/styles/main.css',
					'/scripts/vendor.js',
					'/scripts/main.js',
					'/templates/home.html',
					'/templates/planner.html',
					'/templates/trip.html',
					'/templates/schedule.html',
					'/images/bridge1.png',
					'/images/bartmap.png',
					'/fonts/roboto/Roboto-Regular.ttf',
					'/fonts/roboto/Roboto-Regular.woff2',
					'/fonts/roboto/Roboto-Regular.woff'
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
	
	if(requestURL.origin === location.origin && !requestURL.href.includes('/browser-sync/')) {
		event.respondWith(fetchAndCache(staticCache, event.request));
	}
});