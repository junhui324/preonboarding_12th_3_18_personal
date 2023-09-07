import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from './utils/constants/constants';
import './utils/styles/reset.scss';

const MainPage = lazy(() => import('./pages/MainPage'));
const LoadingPage = lazy(() => import('./components/LoadingSpinner'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
	return (
		<>
			<Suspense fallback={<LoadingPage />}>
				<Routes>
					<Route path={ROUTES.MAIN} element={<MainPage />} />
					<Route path={ROUTES.NOTFOUND} element={<NotFoundPage />} />
				</Routes>
			</Suspense>
		</>
	);
}

export default App;
