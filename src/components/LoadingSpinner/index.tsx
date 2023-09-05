import styles from './LoadingSpinner.module.scss';

function LoadingSpinner({ scroll }: { scroll?: boolean }) {
	return (
		<div className={`${!scroll && styles.loadingContainer}`}>
			<div className={styles.loading}>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
}

export default LoadingSpinner;
