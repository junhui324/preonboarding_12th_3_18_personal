import styles from './Main.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import { getClinicalTrial } from '../../api/Api';

import { BiSearch } from 'react-icons/bi';

export default function MainPage() {
	const [input, setInput] = useState('');
	const [debouncedInput, setDebouncedInput] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [searchStatus, setSearchStatus] = useState('');
	const [showRecommendations, setShowRecommendations] = useState(false);

	const [focusedIndex, setFocusedIndex] = useState(-1);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const resultRefs = useRef<(HTMLDivElement | null)[]>([]);

	// 캐시된 데이터와 만료 시간을 저장하는 상태
	const [cachedData, setCachedData] = useState<{ [key: string]: any }>({});
	const [cacheExpireTimes, setCacheExpireTimes] = useState<{ [key: string]: number }>({});

	useEffect(() => {
		removeExpiredCacheData(); // 만료된 캐시 데이터 제거

		// 1분 30초마다 만료된 데이터 제거
		const expirationCheckInterval = setInterval(() => {
			removeExpiredCacheData();
		}, 90000);

		// 컴포넌트 언마운트 시에 타이머 정리
		return () => {
			clearInterval(expirationCheckInterval);
		};
	}, [cacheExpireTimes]);

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedInput(input);
		}, 500);

		return () => {
			clearTimeout(timer);
		};
	}, [input]);

	useEffect(() => {
		if (debouncedInput) {
			// 캐싱된 데이터가 있는지 확인
			if (cachedData[debouncedInput] && cacheExpireTimes[debouncedInput] > Date.now()) {
				setSearchResults(cachedData[debouncedInput]);
				setSearchStatus('');
			} else {
				getClinicalTrialData(debouncedInput);
			}
		} else {
			setSearchResults([]);
			setSearchStatus('검색어 없음');
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

	const getClinicalTrialData = async (query: string) => {
		try {
			// API 호출
			const res = await getClinicalTrial(query);
			const cacheKey = 'clinicalTrialCache_' + query;
			const cacheData = { data: res, expires: Date.now() + 60000 };

			localStorage.setItem(cacheKey, JSON.stringify(cacheData));

			setCachedData({ ...cachedData, [query]: res });
			setCacheExpireTimes({ ...cacheExpireTimes, [query]: cacheData.expires });
			setSearchResults(res);
			setSearchStatus('');

			console.info('calling api');
		} catch (error) {
			console.error(error);
		}
	};

	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;
		setInput(inputValue);
		if (!inputValue) {
			setSearchResults([]);
			setSearchStatus('검색어 없음');
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (searchResults.length === 0) return;

		if (e.key === 'ArrowDown') {
			e.preventDefault();
			setFocusedIndex(0);
			inputRef.current?.blur();
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			setFocusedIndex(-1);
			inputRef.current?.focus();
		}
	};

	const handleResultKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, index: number) => {
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			const nextIndex = (index + 1) % searchResults.length;
			setFocusedIndex(nextIndex);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			const prevIndex = (index - 1 + searchResults.length) % searchResults.length;
			setFocusedIndex(prevIndex);
		} else if (e.key === 'Enter') {
			inputRef.current?.focus();
		}
	};

	const removeExpiredCacheData = () => {
		const currentTimestamp = Date.now();
		for (const key in cacheExpireTimes) {
			if (cacheExpireTimes[key] <= currentTimestamp) {
				delete cachedData[key];
				delete cacheExpireTimes[key];
				const cacheKey = 'clinicalTrialCache_' + key;
				localStorage.removeItem(cacheKey);
			}
		}
	};

	const handleInputFocus = () => {
		setShowRecommendations(true);
	};

	const handleInputBlur = () => {
		setShowRecommendations(false);
	};

	return (
		<div className={styles.container}>
			<div className={styles.searchContainer}>
				<div className={styles.inputContainer}>
					<input
						className={styles.input}
						value={input}
						onChange={handleChangeInput}
						onKeyDown={handleKeyDown}
						onFocus={handleInputFocus}
						onBlur={handleInputBlur}
						placeholder="검색어를 입력해주세요."
						ref={inputRef}
					></input>
					<button onClick={() => getClinicalTrialData(debouncedInput)}>
						<BiSearch />
					</button>
				</div>

				<div className={styles.resultsContainer}>
					{showRecommendations ? <span>추천 검색어</span> : ''}
					{showRecommendations && (searchStatus || searchResults.length === 0) ? (
						<div className={styles.resultItem}>{searchStatus}</div>
					) : (
						searchResults.map((result: any, index) => (
							<div
								key={index}
								className={`${styles.resultItem} ${
									focusedIndex === index ? styles.focusedItem : ''
								}`}
								tabIndex={0}
								onKeyDown={e => handleResultKeyDown(e, index)}
								ref={ref => (resultRefs.current[index] = ref)}
							>
								<BiSearch />
								{' ' + result.sickNm}
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
}
