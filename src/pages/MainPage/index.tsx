import styles from './Main.module.scss';
import { useEffect, useRef, useState } from 'react';
import SearchResults from '../../components/SearchResults/SearchResults';

import useDebounce from '../../hooks/useDebounce';

import { removeExpiredCacheData } from '../../utils/functions/CatchStorageCache';
import { handleKeyDown } from '../../utils/functions/KeyDown';
import handleInputChange from '../../utils/functions/ChangeInput';
import { fetchClinicalTrialData } from '../../utils/functions/FetchDataCache';

import { BiSearch } from 'react-icons/bi';

export default function MainPage() {
	const [input, setInput] = useState('');
	const debouncedInput = useDebounce(input, 500);

	const [searchResults, setSearchResults] = useState<any[]>([]);
	const [showRecommendations, setShowRecommendations] = useState(false);

	const [focusedIndex, setFocusedIndex] = useState(-1);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const resultRefs = useRef<(HTMLDivElement | null)[]>([]);

	const [cachedData, setCachedData] = useState<{ [key: string]: any }>({});
	const [cacheExpireTimes, setCacheExpireTimes] = useState<{ [key: string]: number }>({});

	useEffect(() => {
		handleRemoveExpiredCacheData();
		const expirationCheckInterval = setInterval(() => {
			handleRemoveExpiredCacheData();
		}, 70000);

		return () => {
			clearInterval(expirationCheckInterval);
		};
	}, [cacheExpireTimes]);

	useEffect(() => {
		if (debouncedInput) {
			if (cachedData[debouncedInput] && cacheExpireTimes[debouncedInput] > Date.now()) {
				setSearchResults(cachedData[debouncedInput]);
			} else {
				fetchData(debouncedInput);
			}
		} else {
			setSearchResults([]);
		}
	}, [debouncedInput]);

	useEffect(() => {
		resultRefs.current = Array(searchResults.length)
			.fill(null)
			.map((_, i) => resultRefs.current[i] || null);
	}, [searchResults]);

	useEffect(() => {
		if (focusedIndex >= 0 && focusedIndex < resultRefs.current.length) {
			resultRefs.current[focusedIndex]?.focus();
		}
	}, [focusedIndex]);

	const fetchData = async (query: string) => {
		await fetchClinicalTrialData(
			query,
			cachedData,
			setCachedData,
			setCacheExpireTimes,
			setSearchResults,
		);
	};

	const handleRemoveExpiredCacheData = async () => {
		await removeExpiredCacheData(cacheExpireTimes);
	};

	return (
		<div className={styles.container}>
			<div className={styles.searchContainer}>
				<div className={styles.inputContainer}>
					<input
						className={styles.input}
						value={input}
						onChange={e => handleInputChange(e, setInput, setSearchResults)}
						onKeyDown={e => handleKeyDown(e, searchResults, resultRefs, setFocusedIndex, inputRef)}
						onFocus={() => setShowRecommendations(true)}
						onBlur={() => setShowRecommendations(false)}
						placeholder="검색어를 입력해주세요."
						ref={inputRef}
					></input>
					<button onClick={() => fetchData(debouncedInput)}>
						<BiSearch />
					</button>
				</div>

				<SearchResults
					searchResults={searchResults}
					focusedIndex={focusedIndex}
					inputRef={inputRef}
					showRecommendations={showRecommendations}
					resultRefs={resultRefs}
					setFocusedIndex={setFocusedIndex}
					setInput={setInput}
				/>
			</div>
		</div>
	);
}
