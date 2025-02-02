import { lazy, Suspense, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import LoadingIcon from '@/auth/components/LoadingIcon';
import useFilter from '../hooks/useFilter';
import { useTaskStore } from '../store/TaskStore';
import Filter from './Filter';
import TaskListItem from './TaskListItem';
const TaskForm = lazy(() => import('./TaskForm'));

export function TaskList() {
  const { tasks, getTasks } = useTaskStore();
  const { filterTasks } = useFilter()
  
  const MySwal = withReactContent(Swal);
  const filteredTasks = filterTasks(tasks)

  useEffect(() => {
    getTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openForm = () => {
    MySwal.fire({
      html: (
        <Suspense fallback={<LoadingIcon />}>
          <TaskForm close={Swal.close} />
        </Suspense>
      ),
      title: 'Nueva tarea',
      width: '25rem',
      showConfirmButton: false,
      showCloseButton: true,
    });
  };

  return (
    <div className='sm:p-2'>
      <header className='flex max-md:items-end justify-between mb-2 gap-2'>
        <Filter />
        <div className='flex items-center gap-2'>
          {/* TODO: delete selected tasks feature */}
          {/* <button className='shadow rounded-lg p-2 bg-red-500 text-white hover:scale-105 transition'>
            <FaTrash className='size-4.5' />
          </button> */}
          <button
            className='shadow rounded-lg p-2 bg-blue-500 text-white hover:scale-105 transition'
            onClick={() => openForm()}
          >
            <FaPlus className='size-4.5 mx-auto' />
          </button>
        </div>
      </header>
      <main className='flex max-sm:flex-col gap-2 sm:flex-wrap'>
        {filteredTasks.map((task) => (
          <TaskListItem key={task._id} task={task} />
        ))}
      </main>
    </div>
  );
}
