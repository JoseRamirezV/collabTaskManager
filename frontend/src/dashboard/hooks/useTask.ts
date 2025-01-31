import { useState } from 'react';
import { toast } from 'sonner';
import { Task } from '../interfaces/task.interface';
import {
  addTaskService,
  deleteTaskService,
  getTasksService,
  updateTaskService,
} from '../services/task.service';

export const useTask = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const getTasks = async () => {
    const { tasks, error } = await getTasksService();
    if (error) return toast.error(error);

    setTasks(tasks);
  };

  const addTask = async (newTask: Task) => {
    const { task, error } = await addTaskService(newTask);
    if (error) return toast.error(error);

    setTasks((prev) => ({ ...prev, task }));
  };

  const updateTask = async (id: string, newData: Task) => {
    const { task, error } = await updateTaskService(id, newData);
    if (error) return toast.error(error);

    setTasks((prev) => {
      const taskIndex = prev.findIndex((t) => t._id === id);
      return prev.toSpliced(taskIndex, 1, task);
    });
  };

  const deleteTask = async (id: string) => {
    const { ok, error } = await deleteTaskService(id);
    if (!ok) return toast.error('Algo salió mal');
    if (error) return toast.error(error);

    setTasks((prev) => prev.filter((task) => task._id !== id));
  };

  return {
    tasks,
    getTasks,
    addTask,
    updateTask,
    deleteTask,
  };
};
