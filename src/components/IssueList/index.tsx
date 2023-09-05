import React from 'react';
import { useEffect, useState, useRef, Fragment } from 'react';
import { getIssueList } from '../../api/Api';
import { IssueType } from '../../utils/types/Issue.interface';
import LoadingSpinner from '../LoadingSpinner';
import IssueItem from '../IssueItem';
import AdBanner from '../AdBanner';
import useIntersectionObserver from '../../utils/hooks/useIntersectionObserver';
import { useNavigate } from 'react-router-dom';

function IssueList() {
	const [issues, setIssues] = useState<IssueType[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const observerRef = useRef<any>(null);
	const navigate = useNavigate();

	useEffect(() => {
		getIssueList(currentPage)
			.then((issueList: any) => {
				setIssues(prevList => [...prevList, ...issueList]);
				setIsLoading(false);
			})
			.catch(error => {
				if (error.response && error.response.status) {
					navigate(`/error/${error.response.status}`);
				}
			});
	}, [currentPage]);

	useIntersectionObserver(
		observerRef,
		() => {
			setCurrentPage(currentPage + 1);
		},
		issues,
	);

	if (isLoading) return <LoadingSpinner />;

	return (
		<>
			<ul>
				{issues.map((item, index) => (
					<Fragment key={item.id}>
						<IssueItem item={item} />
						{(index + 1) % 4 === 0 && <AdBanner />}
					</Fragment>
				))}
			</ul>
			<div ref={observerRef}>
				<LoadingSpinner scroll />
			</div>
		</>
	);
}

export default IssueList;
