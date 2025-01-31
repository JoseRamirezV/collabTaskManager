import { lazy, Suspense } from 'react';
import { FaPencil, FaTrash } from 'react-icons/fa6';
import {
  IoIosCheckmarkCircle,
  IoIosInformationCircle,
  IoIosRemoveCircle,
} from 'react-icons/io';
import { IoEllipsisHorizontalCircleSharp } from 'react-icons/io5';
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardDoubleArrowUp,
} from 'react-icons/md';
import { toast } from 'sonner';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { LoadingIcon } from '@/auth/components/LoadingIcon';
import { Status, Task } from '../interfaces/task.interface';
import { useTaskStore } from '../store/TaskStore';
const TaskForm = lazy(() => import('./TaskForm'));

interface Props {
  task: Task;
}

const AllowedStatuses = ['Pending', 'In process', 'Completed', 'Expired'];

const STATUS = {
  Pending: {
    label: 'Pendiente',
    bg: 'bg-amber-200',
    color: 'fill-amber-500',
    Icon: IoIosInformationCircle,
  },
  'In process': {
    label: 'En proceso',
    bg: 'bg-blue-300',
    color: 'fill-blue-600',
    Icon: IoEllipsisHorizontalCircleSharp,
  },
  Completed: {
    label: 'Completado',
    bg: 'bg-green-300',
    color: 'fill-green-600',
    Icon: IoIosCheckmarkCircle,
  },
  Expired: {
    label: 'Vencido',
    bg: 'bg-red-300',
    color: 'fill-red-600',
    Icon: IoIosRemoveCircle,
  },
};

type updatableKeys = 'status' | 'priority';

export function TaskListItem({ task }: Props) {
  const { deleteTask, updateTask, error, isLoading } = useTaskStore();
  const status = STATUS[task.status];
  const StatusIcon = status.Icon;

  const MySwal = withReactContent(Swal);

  const openForm = (task: Task) => {
    MySwal.fire({
      html: (
        <Suspense fallback={<LoadingIcon />}>
          <TaskForm task={task} close={Swal.close} />
        </Suspense>
      ),
      title: 'Edición',
      width: '25rem',
      showConfirmButton: false,
      showCloseButton: true,
    });
  };

  const update = (key: updatableKeys, value: string | boolean) => {
    updateTask(task._id!, { ...task, [key]: value }).then(
      () => error && toast.error(error)
    );
  };

  return (
    <div className='flex shadow bg-white rounded-md h-20 group/card'>
      <div className='flex items-center flex-col justify-between p-2'>
        <span
          className={
            'relative flex basis-1/2 items-center group cursor-pointer'
          }
        >
          {task.priority ? (
            <MdOutlineKeyboardDoubleArrowUp className='size-5 text-white bg-red-500 rounded-full' />
          ) : (
            <MdOutlineKeyboardArrowUp className='size-5 text-white bg-green-600 rounded-full' />
          )}
          <div className='absolute right-full text-xs text-nowrap p-1 space-y-1 scale-0 group-hover:scale-100 origin-right transition'>
            <button
              className='ms-auto flex items-center gap-1 shadow rounded px-2 py-1 bg-white disabled:bg-red-200'
              onClick={() => update('priority', true)}
              disabled={task.priority}
            >
              <MdOutlineKeyboardDoubleArrowUp className='size-4 text-white bg-red-500 rounded-full' />
              Prioridad
            </button>
            <button
              className='ms-auto flex items-center gap-1 shadow rounded px-2 py-1 bg-white disabled:bg-green-200'
              onClick={() => update('priority', false)}
              disabled={!task.priority}
            >
              <MdOutlineKeyboardArrowUp className='size-4 text-white bg-green-600 rounded-full' />
              No prioridad
            </button>
          </div>
        </span>
        <span
          className={`relative flex basis-1/2 items-center group cursor-pointer`}
        >
          <StatusIcon className={`size-6 ${status.color}`} />
          <div className='absolute right-full text-xs text-nowrap p-1 space-y-1 scale-0 group-hover:scale-100 origin-right transition'>
            {Object.keys(STATUS).map((key, i) => {
              const statusIndex = AllowedStatuses.findIndex(
                (s) => s === task.status
              );
              const isPrevStatus = statusIndex >= i;
              if (key === 'Expired') return;
              const status = STATUS[key as Status];
              const StatusIcon = status.Icon;
              return (
                <button
                  key={i}
                  className={`ms-auto flex items-center gap-1 shadow rounded px-2 py-1 me-2 ${
                    isPrevStatus ? status.bg : 'bg-white'
                  }`}
                  onClick={() => update('status', key)}
                  disabled={isLoading || task.status === key || isPrevStatus}
                >
                  <StatusIcon className={`size-5 ${status.color}`} />
                  {status.label}
                </button>
              );
            })}
          </div>
        </span>
      </div>
      <div className='text-sm flex flex-col grow max-w-2/3 p-2'>
        <b>
          {task.title}
          <span className='block text-xs opacity-40 font-normal'>
            {STATUS[task.status].label}
          </span>
        </b>

        <p className='text-lg truncate'>{task.description}</p>
      </div>
      <div className='relative flex flex-col items-end p-3 grow overflow-x-clip'>
        <small className={`${task.priority}`}>
          {task.priority ? 'Prioridad' : 'No prioridad'}
        </small>
        <div className='absolute bottom-2 flex gap-1 opacity-0 w-0 group-hover/card:w-12 group-hover/card:opacity-100 transition-all'>
          <button
            className='p-1.5 rounded-lg text-white bg-amber-500 hover:scale-105 transition-transform'
            onClick={() => openForm(task)}
          >
            <FaPencil className='size-3' />
          </button>
          <button className='p-1.5 rounded-lg text-white bg-red-500 hover:scale-105 transition-transform'>
            <FaTrash className='size-3' onClick={() => deleteTask(task._id!)} />
          </button>
        </div>
      </div>
    </div>
  );
}
