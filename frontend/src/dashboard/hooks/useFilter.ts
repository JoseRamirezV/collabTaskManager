import { useContext } from 'react';
import type { Task } from '../interfaces/task.interface';
import { FiltersContext } from '../context/FilterContext';

export default function useFilter() {
  const { filters, updateFilters } = useContext(FiltersContext);

  const filterTasks = (tasks: Task[]) => {
    return tasks.filter((task) => {
      const matchesStatus =
        filters.status === 'All' || task.status === filters.status;

      const matchesPriority =
        filters.priority === null || task.priority === filters.priority;

      return matchesStatus && matchesPriority;
    });
  };

  return { filters, filterTasks, updateFilters };
}
