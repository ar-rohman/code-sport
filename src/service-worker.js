/* eslint-disable no-undef */
workbox.core.setCacheNameDetails({
    prefix: 'code-sport',
});

self.addEventListener('install', () => {
    self.skipWaiting();
});

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(
    new RegExp('https://crests.football-data\\.org/*'),
    new workbox.strategies.CacheFirst()
);
