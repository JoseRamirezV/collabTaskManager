import useFilter from '../hooks/useFilter';
import type { Status } from '../interfaces/task.interface';
import { StatusConfig } from './TaskListItem';

const AllowedStatuses = Object.keys(StatusConfig).map((s) => ({
  status: s,
  label: StatusConfig[s as Status].label,
}));

export default function Filter() {
  const { filters, updateFilters } = useFilter();

  const handleChangePriority = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value;
    const priority = value === 'All' ? null : value === 'false' ? false : true;
    updateFilters({ ...filters, priority });
  };

  const handleChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.currentTarget.value as Status;
    updateFilters({ ...filters, status });
  };

  return (
    <ul className='flex items-baseline gap-2'>
      <legend>Filtrar por</legend>
      <li className='relative'>
        <select
          name='priority'
          id='priority'
          className='bg-white cursor-pointer peer'
          onChange={handleChangePriority}
        >
          <option value='All'>Todas</option>
          <option value='true'>Alta</option>
          <option value='false'>Baja</option>
        </select>
        <label htmlFor='priority' className='absolute left-1 -top-3.5 px-2 py-0.5 text-xs bg-blue-50 peer-focus:bg-blue-300 peer-focus:text-white rounded cursor-pointer'>
          Prioridad
        </label>
      </li>
      <li className='relative'>
        <select
          name='status'
          id='status'
          className='bg-white cursor-pointer peer'
          onChange={handleChangeStatus}
        >
          <option value='All'>Todas</option>
          {AllowedStatuses.map(({ status, label }) => (
            <option key={status} value={status}>{label}</option>
          ))}
        </select>
        <label htmlFor='status' className='absolute left-1 -top-3.5 px-2 py-0.5 text-xs bg-blue-50 peer-focus:bg-blue-300 peer-focus:text-white rounded cursor-pointer'>
          Estado
        </label>
      </li>
    </ul>
  );
}
