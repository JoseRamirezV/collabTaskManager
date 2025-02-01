import axiosInstance from '@/config/axiosInstance';
import { UserSession } from '../interfaces/user.interface';

export const login = async (email: string, password: string) => {
  try {
    const res = await axiosInstance.get(`/user/${email}&${password}`);

    if (!res) throw new Error('No pudimos conectar con el servidor');
    const { data, error, token } = res.data;
    if (error) throw new Error(error);
    window.localStorage.setItem('token', token!);
    return { userData: data };
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
    return { error: 'Algo salió mal...' };
  }
};

export const signUp = async (data: UserSession) => {
  try {
    const res = await axiosInstance.post('/user/signUp', {
      ...data,
    });
    if (!res) throw new Error('No pudimos conectar con el servidor');
    const { ok, error } = await res.data;
    if (error) throw new Error(error);
    return { ok };
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
    return { error: 'Algo salió mal...' };
  }
};

export const update = async ({
  id,
  data,
}: {
  id: string;
  data: UserSession;
}) => {
  try {
    const res = await axiosInstance.put('/user/' + id, {
      body: JSON.stringify({ ...data }),
    });
    if (!res) throw new Error('No pudimos conectar con el servidor');

    const { user, error } = res.data;
    if (error) throw new Error(error);

    return { user };
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
    return { error: 'Algo salió mal...' };
  }
};

export const deleteUser = async ({ password }: { password: string }) => {
  try {
    const res = await axiosInstance.delete(`/user/${password}`);
    if (!res) throw new Error('No pudimos conectar con el servidor');
    const { ok, error } = res.data;
    if (error) throw new Error(error);
    return { ok };
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
    return { error: 'Algo salió mal...' };
  }
};

export const verifyToken = async () => {
  const token = window.localStorage.getItem('token');
  try {
    const res = await axiosInstance.get(`/user/isLogged/${token}`);
    if (!res) throw new Error('No pudimos conectar con el servidor');

    if (res.status === 401) throw new Error('Acceso no autorizado');

    return res.data;
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
  }
};
