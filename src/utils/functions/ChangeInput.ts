import React from 'react';

export default function handleInputChange(
	e: React.ChangeEvent<HTMLInputElement>,
	setInput: React.Dispatch<React.SetStateAction<string>>,
	setSearchResults: React.Dispatch<React.SetStateAction<any[]>>,
	setSearchStatus: React.Dispatch<React.SetStateAction<string>>,
) {
	const inputValue = e.target.value;
	setInput(inputValue);
	if (!inputValue) {
		setSearchResults([]);
		setSearchStatus('검색어 없음');
	}
}
