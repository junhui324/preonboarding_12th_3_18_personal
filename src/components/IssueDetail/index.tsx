import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getIssueDetail } from '../../api/Api';
import { IssueType } from '../../utils/types/Issue.interface';
import ReactMarkdown from 'react-markdown';
import IssueItem from '../IssueItem';
import LoadingSpinner from '../LoadingSpinner';
import styles from './IssueDetail.module.scss';
import { ROUTES } from '../../utils/constants/constants';

function IssueDetail() {
	const [detail, setDetail] = useState<IssueType>();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const { issue_number } = useParams();
	const navigate = useNavigate();

	const getIssueData = async () => {
		setIsLoading(true);
		try {
			const res = await getIssueDetail(Number(issue_number));
			setDetail(res.data);
		} catch (error: any) {
			if (error.response && error.response.status) {
				navigate(`/error/${error.response.status}`);
			}
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (issue_number) {
			getIssueData();
		}
	}, [issue_number]);

	if (isLoading) return <LoadingSpinner />;

	return (
		<>
			{detail && (
				<>
					<div className={styles.moveList}>
						<button className={styles.moveButton} onClick={() => navigate(ROUTES.LIST)}>
							리스트로 돌아가기
						</button>
					</div>
					<div className={styles.detailInfo}>
						<img src={detail.user?.avatar_url} alt="user-avatar-img" />
						<IssueItem item={detail} key={detail.id} />
					</div>
					<div className={styles.markdownContainer}>
						<ReactMarkdown>{detail.body}</ReactMarkdown>
					</div>
				</>
			)}
		</>
	);
}

export default IssueDetail;
