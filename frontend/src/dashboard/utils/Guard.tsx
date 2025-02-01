import { useUserStore } from '@/auth/store/user';
import { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router';
import { verifyToken } from '@/auth/services/user.service';

export default function Guard() {
  const { session, login, logout } = useUserStore();
  const token = window.localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (!token) return session.isLogged && logout();
      try {
        const res = await verifyToken();
        if (!res) throw new Error('Hubo una falla de conexión con el servidor');
        const { error, user } = res;
        if (error) throw new Error(error);
        if(!session.isLogged) login({ ...user, isLogged: true });
      } catch (error) {
        logout();
        navigate('/auth/', {
          state: {
            error: (error as Error).message,
          },
        });
        return;
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return session.isLogged ? <Outlet /> : <Navigate to={'/auth/'} />;
}
