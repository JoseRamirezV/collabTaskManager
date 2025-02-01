import { BrowserRouter, Route, Routes } from 'react-router';

import { Helmet } from 'react-helmet-async';
import AuthRouter from './auth/AuthRouter';
import DashboardRouter from './dashboard/DashboardRouter';

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
        </Routes>
      </BrowserRouter>
    </>
  );
}
