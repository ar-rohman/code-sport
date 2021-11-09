importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if(workbox) {
    console.log('Workbox loaded successfully.');
}
else {
    console.log('Failed to load Workbox.');
}

workbox.precaching.precacheAndRoute([
    { url: '/club-detail.html', revision: '1' },
	{ url: '/index.html', revision: '1' },
	{ url: '/manifest.json', revision: '1' },
	{ url: '/nav.html', revision: '1' },
	{ url: '/pages/club.html', revision: '1' },
	{ url: '/pages/home.html', revision: '1' },
	{ url: '/pages/saved.html', revision: '1' },
	{ url: '/pages/scores.html', revision: '1' },
	{ url: '/pages/standings.html', revision: '1' },
	{ url: '/assets/images/CodeSport.png', revision: '1' },
	{ url: '/assets/images/icon-72x72.png', revision: '1' },
	{ url: '/assets/images/icon-96x96.png', revision: '1' },
	{ url: '/assets/images/icon-128x128.png', revision: '1' },
	{ url: '/assets/images/icon-144x144.png', revision: '1' },
	{ url: '/assets/images/icon-152x152.png', revision: '1' },
	{ url: '/assets/images/icon-192x192.png', revision: '1' },
	{ url: '/assets/images/icon-384x384.png', revision: '1' },
	{ url: '/assets/images/icon-512x512.png', revision: '1' },
	{ url: '/assets/fonts/codesport.eot', revision: '1' },
	{ url: '/assets/fonts/codesport.svg', revision: '1' },
	{ url: '/assets/fonts/codesport.ttf', revision: '1' },
	{ url: '/assets/fonts/codesport.woff', revision: '1' },
	{ url: '/assets/css/materialize.min.css', revision: '1' },
	{ url: '/assets/css/style.css', revision: '1' },
    { url: '/assets/js/api.js', revision: '1' },
	{ url: '/assets/js/club-detail.js', revision: '1' },
	{ url: '/assets/js/club.js', revision: '1' },
	{ url: '/assets/js/db.js', revision: '1' },
	{ url: '/assets/js/helper.js', revision: '1' },
	{ url: '/assets/js/home.js', revision: '1' },
	{ url: '/assets/js/idb.js', revision: '1' },
	{ url: '/assets/js/materialize.min.js', revision: '1' },
	{ url: '/assets/js/saved.js', revision: '1' },
	{ url: '/assets/js/scores.js', revision: '1' },
	{ url: '/assets/js/script.js', revision: '1' },
	{ url: '/assets/js/spinner.js', revision: '1' },
	{ url: '/assets/js/standings.js', revision: '1' },
	{ url: '/assets/js/sw-register.js', revision: '1' },
], {
	ignoreUrlParametersMatching: [/.*/]
});

workbox.routing.registerRoute(
	new RegExp('^https://api.football-data.org/v2'),
	workbox.strategies.staleWhileRevalidate({
		cacheName: 'CodeSport',
		cacheableResponse: {
			statuses: [0, 200]
		}
	})
);

self.addEventListener('push', event => {
    let body;
    if(event.data) {
        body = event.data.text();
    }
    else {
        body = 'Push message no payload';
    }
    let options = {
        body: body,
        icon: '/assets/images/icon-512x512.png',
        vibrarte: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('CodeSport', options)
    );
});