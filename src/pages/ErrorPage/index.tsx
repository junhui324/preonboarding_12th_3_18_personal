import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './ErrorPage.module.scss';
import { ROUTES } from '../../utils/constants/constants';

const NotFoundPage = () => {
	const [errorMsg, setErrorMsg] = useState('');
	const navigate = useNavigate();
	const { status } = useParams();

	useEffect(() => {
		switch (status) {
			case '404':
				setErrorMsg('현재 찾을 수 없는 페이지를 요청 하셨습니다.');
				break;
			case '410':
				setErrorMsg('원본 서버에서 대상 리소스에 대한 액세스를 더 이상 사용할 수 없습니다.');
				break;
			case '422':
				setErrorMsg('유효성 검사에 실패했거나 엔드포인트가 스팸 처리되었습니다.');
				break;
			default:
				setErrorMsg('예기치 못한 에러가 발생했습니다.');
				break;
		}
	}, []);

	const handleClick = (e: React.MouseEvent) => {
		e.preventDefault();
		navigate(`${ROUTES.MAIN}`);
	};

	return (
		<div className={styles.container}>
			<div className={styles.statusContainer}>
				<div className={styles.status}>{status}</div>
				<div className={styles.status}>{status}</div>
			</div>
			<div className={styles.contentContainer}>
				<div className={styles.title}>{errorMsg}</div>
				<button className={styles.button} onClick={handleClick}>
					메인으로
				</button>
			</div>
		</div>
	);
};

export default NotFoundPage;
