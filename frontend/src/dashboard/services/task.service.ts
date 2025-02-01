import axiosInstance from '@/config/axiosInstance';
import { Task } from '../interfaces/task.interface';

const getToken = () => window.localStorage.getItem('token');

export const getTasksService = async () => {
  try {
    const res = await axiosInstance.get(`/task/`, {
      headers: {
        authorization: `Bearer ${getToken()}`,
      },
    });
    if (!res) throw new Error('No pudimos conectar con el servidor');

    const { ok, data, error } = res.data;

    if (!ok) throw new Error(error);

    return { tasks: data };
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
    return { error: 'Algo salió mal...' };
  }
};

export const getUserTasksService = async () => {
  try {
    const res = await axiosInstance.get('userTasks', {
      headers: {
        authorization: `Bearer ${getToken()}`,
      },
    });
    if (!res) throw new Error('No pudimos conectar con el servidor');

    const { ok, data, error } = res.data;
    if (!ok) throw new Error(error);

    return { tasks: data };
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
    return { error: 'Algo salió mal...' };
  }
};

export const addTaskService = async (task: Task) => {
  try {
    const res = await axiosInstance.post(
      '/task/',
      { ...task },
      {
        headers: {
          authorization: `Bearer ${getToken()}`,
        },
      }
    );
    if (!res) throw new Error('No pudimos conectar con el servidor');

    const { ok, data, error } = res.data;
    if (!ok) throw new Error(error);

    return { task: data };
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
    return { error: 'Algo salió mal...' };
  }
};

export const updateTaskService = async (id: string, task: Task) => {
  try {
    const res = await axiosInstance.put(
      `/task/${id}`,
      { ...task },
      {
        headers: {
          authorization: `Bearer ${getToken()}`,
        },
      }
    );
    if (!res) throw new Error('No pudimos conectar con el servidor');

    const { ok, data, error } = res.data;
    if (!ok) throw new Error(error);

    return { task: data };
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
    return { error: 'Algo salió mal...' };
  }
};

export const deleteTaskService = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`/task/${id}`, {
      headers: {
        authorization: `Bearer ${getToken()}`,
      },
    });
    if (!res) throw new Error('No pudimos conectar con el servidor');
    const { ok, error } = res.data;
    if (!ok) throw new Error(error);

    return { ok };
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
    return { error: 'Algo salió mal...' };
  }
};
