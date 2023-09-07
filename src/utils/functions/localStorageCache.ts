function setCacheData(key: string, data: any, expires: number) {
	const cacheData = { data, expires };
	localStorage.setItem(key, JSON.stringify(cacheData));
}

function removeExpiredCacheData(cacheData: any, cacheExpireTimes: any) {
	const currentTimestamp = Date.now();
	for (const key in cacheExpireTimes) {
		if (cacheExpireTimes[key] <= currentTimestamp) {
			delete cacheData[key];
			delete cacheExpireTimes[key];
			const cacheKey = 'clinicalTrialCache_' + key;
			localStorage.removeItem(cacheKey);
		}
	}
}

export { setCacheData, removeExpiredCacheData };
