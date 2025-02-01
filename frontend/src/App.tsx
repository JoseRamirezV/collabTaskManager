import { BrowserRouter, Route, Routes } from 'react-router';

import DashboardRouter from './dashboard/DashboardRouter';
import AuthRouter from './auth/AuthRouter';
import { Helmet } from 'react-helmet-async';
import NotFound from './NotFound';

export default function App() {
  return (
    <>
      <Helmet>
        <title>TeamFlow</title>
      </Helmet>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<DashboardRouter />} />
          <Route path='/auth/*' element={<AuthRouter />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
