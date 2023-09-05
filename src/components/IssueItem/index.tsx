import { useNavigate } from 'react-router-dom';
import styles from './IssueItem.module.scss';
import { getDate } from '../../utils/functions/getDate';
import { IssueType } from '../../utils/types/Issue.interface';

function IssueItem({ item }: { item: IssueType }) {
	const navigate = useNavigate();
	const showIssueDetail = (issue_number: number) => {
		navigate(`/issues/${issue_number}`);
	};
	return (
		<>
			<li
				className={styles.item}
				key={item.number}
				onClick={() => {
					showIssueDetail(item.number);
				}}
			>
				<div className={styles.info}>
					<h2>
						<span className={styles.issueNumber}>#{item.number}</span> {item.title}
					</h2>
					<span className={styles.subInfo}>
						작성자: {item.user.login}, 작성일: {getDate(item.created_at)}
					</span>
				</div>
				<span className={styles.subInfo}>댓글수: {item.comments}</span>
			</li>
		</>
	);
}
export default IssueItem;
