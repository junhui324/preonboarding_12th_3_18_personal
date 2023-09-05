import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../utils/constants/constants';
import styles from './Main.module.scss';

export default function MainPage() {
	const navigate = useNavigate();
	return (
		<div className={styles.container}>
			<button onClick={() => navigate(ROUTES.LIST)}>이슈리스트</button>
		</div>
	);
}
