import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { LoadingIcon } from './components/LoadingIcon';
import { useUserStore } from '@/auth/store/user';

const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignUpPage = lazy(() => import('./pages/SignUpPage'));

export default function AuthRouter() {
  const { session } = useUserStore();

  if (session.isLogged) return <Navigate to={'/'} />;
  
  return (
    <div className='grid place-items-center h-screen w--screen bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]'>
      <Routes>
        <Route
          index
          element={
            <Suspense fallback={<LoadingIcon className={'size-20 m-auto'} />}>
              <LoginPage />
            </Suspense>
          }
        />
        <Route
          path={'sign-up'}
          element={
            <Suspense fallback={<LoadingIcon className={'size-20 m-auto'} />}>
              <SignUpPage />
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
}
