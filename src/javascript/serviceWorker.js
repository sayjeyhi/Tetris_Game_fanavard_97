console.log('Started', self);

const CACHE_NAME = 'persian-tetris-v1';


const urlsToCache = [
	'/',
	'/assets/css/app/tetris.css',
	'/bundle.js',
	'/assets/localization/lang.en.json',
	'/assets/localization/lang.fa.json',
	'/assets/localization/lang.ja.json',
	'/assets/en/animals.json',
	'/assets/en/colors.json',
	'/assets/en/fruits.json',
	'/assets/en/things.json',
    '/assets/fa/animals.json',
    '/assets/fa/colors.json',
    '/assets/fa/fruits.json',
    '/assets/fa/things.json',
    '/assets/ja/animals.json',
    '/assets/ja/colors.json',
    '/assets/ja/fruits.json',
    '/assets/ja/things.json',
    '/assets/mp3/background.mp3',
    '/assets/mp3/explode.mp3',
    '/assets/mp3/finishGame.mp3',
    '/assets/mp3/foundWord.mp3',
    '/assets/mp3/loading.mp3',
    '/assets/mp3/moveChar.mp3',
    '/assets/mp3/pause.mp3',
    '/assets/mp3/start.mp3',
    '/assets/img/background.png',
];

self.addEventListener('install', event => {
	// Perform install steps
	event.waitUntil(
		caches.open(CACHE_NAME)
			.then(cache => {
				console.log('Opened cache');
				return cache.addAll(urlsToCache);
			})
	);
});


self.addEventListener('fetch', event => {
	event.respondWith(
		caches.match(event.request)
			.then(response => {
				// Cache hit - return response
				if (response) {
					return response;
				}

				// IMPORTANT: Clone the request. A request is a stream and
				// can only be consumed once. Since we are consuming this
				// once by cache and once by the browser for fetch, we need
				// to clone the response.
				const fetchRequest = event.request.clone();

				return fetch(fetchRequest).then(
					response => {
						// Check if we received a valid response
						if (!response || response.status !== 200 || response.type !== 'basic') {
							return response;
						}

						// IMPORTANT: Clone the response. A response is a stream
						// and because we want the browser to consume the response
						// as well as the cache consuming the response, we need
						// to clone it so we have two streams.
						const responseToCache = response.clone();

						caches.open(CACHE_NAME)
							.then(cache => {
								cache.put(event.request, responseToCache);
							});

						return response;
					}
				);
			})
	);
});


self.addEventListener('activate', event => {
	const cacheWhitelist = ['persian-tetris-v1', 'blog-posts-cache-v1'];

	event.waitUntil(
		caches.keys().then(cacheNames => {
			return Promise.all(
				cacheNames.map(cacheName => {
					if (cacheWhitelist.indexOf(cacheName) === -1) {
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});
