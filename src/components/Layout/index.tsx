import { Outlet } from 'react-router-dom';

import { URL_INFO } from '../../utils/constants/constants';
import styles from './Layout.module.scss';

function Layout() {
	const { OWNER, REPO } = URL_INFO;

	return (
		<div className={styles.header}>
			<header>
				<h1>
					{OWNER} / {REPO}
				</h1>
			</header>
			<Outlet />
		</div>
	);
}
export default Layout;
