import styles from './Main.module.scss';
import React, { useEffect, useState } from 'react';
import { getClinicalTrial } from '../../api/Api';

import { BiSearch } from 'react-icons/bi';

export default function MainPage() {
	const [input, setInput] = useState('');
	const [debouncedInput, setDebouncedInput] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [searchStatus, setSearchStatus] = useState('');

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
			getClinicalTrialData(debouncedInput);
		} else {
			setSearchResults([]);
			setSearchStatus('검색어 없음');
		}
	}, [debouncedInput]);

	const getClinicalTrialData = async (query: string) => {
		try {
			const res = await getClinicalTrial(query);
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

	return (
		<div className={styles.container}>
			<div className={styles.searchContainer}>
				<div className={styles.inputContainer}>
					<input
						className={styles.input}
						value={input}
						onChange={handleChangeInput}
						placeholder="검색어를 입력해주세요."
					></input>
				</div>

				<div className={styles.resultsContainer}>
					<span>추천 검색어</span>
					{searchStatus || searchResults.length === 0 ? (
						<div className={styles.resultItem}>{searchStatus}</div>
					) : (
						searchResults.map((result: any, index) => (
							<div key={index} className={styles.resultItem}>
								{result.sickNm}
							</div>
						))
					)}
				</div>
			</div>
			<button onClick={() => getClinicalTrialData(debouncedInput)}>
				<BiSearch />
			</button>
		</div>
	);
}
