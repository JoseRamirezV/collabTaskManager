import { create } from 'zustand';
import { Task } from '../interfaces/task.interface';
import {
  addTaskService,
  deleteTaskService,
  getTasksService,
  updateTaskService,
} from '../services/task.service';

type TaskStore = {
  tasks: Task[];
  error: string | null;
  isLoading: boolean;
  getTasks: () => Promise<void>;
  addTask: (task: Task) => Promise<void>;
  updateTask: (id: string, task: Task) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
};

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  error: null,
  isLoading: false,
  getTasks: async () => {
    set({ isLoading: true });
    const { tasks, error } = await getTasksService();
    if (error) {
      set({ error, isLoading: false });
    } else {
      set({ tasks, isLoading: false });
    }
  },
  addTask: async (newTask: Task) => {
    set({ isLoading: true });
    const { task, error } = await addTaskService(newTask);
    if (error) {
      set({ error, isLoading: false });
    } else {
      set(({ tasks }) => {
        return { tasks: [task,...tasks], isLoading: false };
      });
    }
  },
  updateTask: async (id: string, newData: Task) => {
    set({ isLoading: true });
    const { task, error } = await updateTaskService(id, newData);
    if (error) {
      set({ error, isLoading: false });
    } else {
      set(({ tasks }) => {
        const taskIndex = tasks.findIndex((t) => t._id === id);
        return { tasks: tasks.toSpliced(taskIndex, 1, task), isLoading: false };
      });
    }
  },
  deleteTask: async (id: string) => {
    set({ isLoading: true });
    const { error } = await deleteTaskService(id);
    if (error) {
      set({ error, isLoading: false });
    } else {
      set(({ tasks }) => ({
        tasks: tasks.filter((task) => task._id !== id),
        isLoading: false,
      }));
    }
  },
}));
