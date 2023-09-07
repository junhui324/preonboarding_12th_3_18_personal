import React from 'react';

function handleKeyDown(
	e: React.KeyboardEvent<HTMLDivElement>,
	searchResults: any[],
	resultRefs: React.MutableRefObject<(HTMLDivElement | null)[]>,
	setFocusedIndex: React.Dispatch<React.SetStateAction<number>>,
	inputRef: React.RefObject<HTMLInputElement | null>,
) {
	if (searchResults.length === 0) return;

	if (e.key === 'ArrowDown') {
		e.preventDefault();
		if (resultRefs.current[0]) {
			resultRefs.current[0].focus();
		}
		setFocusedIndex(0);
		inputRef.current?.blur();
	}
}

function handleResultKeyDown(
	e: React.KeyboardEvent<HTMLDivElement>,
	index: number,
	searchResults: any[],
	inputRef: React.RefObject<HTMLInputElement | null>,
	result: any,
	setFocusedIndex: React.Dispatch<React.SetStateAction<number>>,
	setInput: React.Dispatch<React.SetStateAction<string>>,
) {
	if (e.key === 'ArrowDown') {
		e.preventDefault();
		const nextIndex = (index + 1) % searchResults.length;
		setFocusedIndex(nextIndex);
	} else if (e.key === 'ArrowUp') {
		e.preventDefault();
		const prevIndex = (index - 1 + searchResults.length) % searchResults.length;
		setFocusedIndex(prevIndex);
	} else if (e.key === 'Enter') {
		setInput(result.sickNm);
		inputRef.current?.focus();
		//setFocusedIndex(0);
	}
}

export { handleKeyDown, handleResultKeyDown };
