import useFilter from "../hooks/useFilter";
import type { Status } from "../interfaces/task.interface";

export default function Filter() {
  const { filters, updateFilters} = useFilter()

  const handleChangePriority = (e:React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value
    const priority = value === 'All' ? null : value === 'false' ? false : true
    updateFilters({...filters, priority })
  }
  
  const handleChangeStatus = (e:React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.currentTarget.value as Status
    updateFilters({...filters, status })
  }

  return (
    <div className='flex items-center gap-2'>
      <select name='priority' className='bg-white' onChange={handleChangePriority}>
        <option value='All'>Todas</option>
        <option value='true'>Alta</option>
        <option value='false'>Baja</option>
      </select>
      <select name='status' className='bg-white' onChange={handleChangeStatus}>
        <option value='All'>Todas</option>
        <option value='Pending'>Pendiente</option>
        <option value='In process'>En proceso</option>
        <option value='Completed'>Finalizado</option>
        <option value='Expired'>Vencido</option>
      </select>
    </div>
  );
}
