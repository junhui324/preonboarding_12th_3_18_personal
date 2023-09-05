import styles from './AdBanner.module.scss';
import AdImage from '../../assets/adimage.png';

const AdBanner = () => {
	const banner = {
		url: 'https://www.wanted.co.kr/',
		img: AdImage,
		alt: '원티드 배너 광고 이미지',
	};
	return (
		<a className={styles.banner} href={banner.url} target="_blank" rel="noopener noreferrer">
			<img src={banner.img} alt={banner.alt} />
		</a>
	);
};

export default AdBanner;
