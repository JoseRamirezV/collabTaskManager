import { createContext, useState } from 'react';
import { Status } from '../interfaces/task.interface';

interface Props {
  children: React.ReactNode;
}

interface Filters {
  priority: boolean | null;
  status: Status | 'All';
}

interface Context {
  filters: Filters;
  updateFilters: (filters: Filters) => void;
}

export const FiltersContext = createContext<Context>({
  filters: {
    priority: null,
    status: 'All',
  },
  updateFilters: () => {},
});

export function FiltersContextProvider({ children }: Props) {
  const [filters, setFilters] = useState<Filters>({
    priority: null,
    status: 'All',
  });

  const updateFilters = (filters: Filters) => {
    setFilters(filters);
  };
  return (
    <FiltersContext.Provider
      value={{
        filters,
        updateFilters,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
}
