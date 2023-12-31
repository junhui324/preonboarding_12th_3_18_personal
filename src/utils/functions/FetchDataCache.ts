import React from 'react';
import { getClinicalTrial } from '../../api/Api';
import { setCacheData } from './CatchStorageCache';

export async function fetchClinicalTrialData(
	query: string,
	cachedData: { [key: string]: any },
	setCachedData: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>,
	setCacheExpireTimes: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>,
	setSearchResults: React.Dispatch<React.SetStateAction<any[]>>,
) {
	try {
		const res = await getClinicalTrial(query);
		const cacheKey = encodeURIComponent(query.replace(/^https?:\/\/[^/]+/, ''));

		const cacheData = { data: res, expires: Date.now() + 60000 };

		await setCacheData(cacheKey, cacheData.data, cacheData.expires);

		setCacheExpireTimes(prevCacheExpireTimes => ({
			...prevCacheExpireTimes,
			[decodeURIComponent(cacheKey)]: cacheData.expires,
		}));

		setCachedData({ ...cachedData, [query]: res });
		setSearchResults(res);
		console.info('calling api');
	} catch (error) {
		console.error(error);
	}
}
