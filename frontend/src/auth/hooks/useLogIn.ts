import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

import { login as loginService, signUp } from '@/auth/services/user.service';
import { useUserStore } from '@/auth/store/user';
import type { UserSession } from '../interfaces/user.interface';

export function useLogin() {
  const [error, setError] = useState<string | null>(null);
  const { login } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    return () => {
      setError(null);
    };
  }, [error]);

  const authenticateUser = async (email: string, password: string) => {
    const { userData, error } = await loginService(email, password);
    await loginService(email, password);
    if (error) {
      setError(error);
      return;
    }
    login({
      ...userData,
      isLogged: true,
    });
  };

  const createUser = async (data: UserSession) => {
    const { error } = await signUp(data);
    if (error) {
      setError(error);
      return;
    }
    toast.info('Listo!', {
      description: 'Registrado exitosamente',
      onDismiss: () =>
        navigate('/auth', {
          state: { email: data.email },
        }),
      onAutoClose: () =>
        navigate('/auth', {
          state: { email: data.email },
        }),
    });
  };

  return {
    authenticateUser,
    createUser,
  };
}
