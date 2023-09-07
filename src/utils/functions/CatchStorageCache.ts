async function setCacheData(key: string, data: any, expires: number) {
	const cache = await caches.open('searchCache');
	const cacheData = { data, expires };
	const response = new Response(JSON.stringify(cacheData), {
		headers: { 'Content-Type': 'application/json' },
	});
	await cache.put(key, response);
	return;
}

async function removeExpiredCacheData(cacheExpireTimes: any) {
	const cache = await caches.open('searchCache');
	const currentTimestamp = Date.now();

	const keys = await cache.keys();
	for (const key of keys) {
		const cachedResponse = await cache.match(key);
		if (cachedResponse) {
			const urlWithoutDomain = key.url.replace(/^https?:\/\/[^/]+/, '').replace(/\//g, '');
			const url = decodeURIComponent(urlWithoutDomain);
			if (cacheExpireTimes[url] <= currentTimestamp) {
				await cache.delete(key);
				delete cacheExpireTimes[key.url];
			}
		}
	}
}

export { setCacheData, removeExpiredCacheData };
