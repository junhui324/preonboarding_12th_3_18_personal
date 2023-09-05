import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from './utils/constants/constants';
import './utils/styles/reset.scss';

const Layout = lazy(() => import('./components/Layout'));
const MainPage = lazy(() => import('./pages/MainPage'));
const LoadingPage = lazy(() => import('./components/LoadingSpinner'));
const IssuesListPage = lazy(() => import('./pages/IssueListPage'));
const IssuesDetailPage = lazy(() => import('./pages/IssueDetailPage'));
const ErrorPage = lazy(() => import('./pages/ErrorPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
	return (
		<>
			<Suspense fallback={<LoadingPage />}>
				<Routes>
					<Route path={ROUTES.MAIN}>
						<Route index element={<MainPage />} />
						<Route element={<Layout />}>
							<Route path={ROUTES.LIST} element={<IssuesListPage />} />
							<Route path={ROUTES.DETAIL} element={<IssuesDetailPage />} />
						</Route>
						<Route path={`${ROUTES.ERROR}/:status`} element={<ErrorPage />} />
						<Route path={ROUTES.NOTFOUND} element={<NotFoundPage />} />
					</Route>
				</Routes>
			</Suspense>
		</>
	);
}

export default App;
