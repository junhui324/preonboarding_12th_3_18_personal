import React from 'react';

export default function handleInputChange(
	e: React.ChangeEvent<HTMLInputElement>,
	setInput: React.Dispatch<React.SetStateAction<string>>,
	setSearchResults: React.Dispatch<React.SetStateAction<any[]>>,
) {
	const inputValue = e.target.value;
	setInput(inputValue);
	if (!inputValue) {
		setSearchResults([]);
	}
}
