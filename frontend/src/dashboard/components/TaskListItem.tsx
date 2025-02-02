import { lazy, Suspense } from 'react';
import { FaEye, FaPencil, FaTrash } from 'react-icons/fa6';
import { IoIosCheckmarkCircle, IoIosInformationCircle } from 'react-icons/io';
import { IoEllipsisHorizontalCircleSharp } from 'react-icons/io5';
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardDoubleArrowUp,
} from 'react-icons/md';
import { toast } from 'sonner';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import LoadingIcon from '@/auth/components/LoadingIcon';
import { Status, Task } from '../interfaces/task.interface';
import { useTaskStore } from '../store/TaskStore';
const TaskView = lazy(() => import('./TaskView'));
const TaskForm = lazy(() => import('./TaskForm'));

interface Props {
  task: Task;
}

export const StatusConfig = {
  Pending: {
    label: 'Pendiente',
    bg: 'bg-amber-100',
    color: 'text-amber-500',
    Icon: IoIosInformationCircle,
  },
  'In process': {
    label: 'En proceso',
    bg: 'bg-blue-200',
    color: 'text-blue-600',
    Icon: IoEllipsisHorizontalCircleSharp,
  },
  Completed: {
    label: 'Completado',
    bg: 'bg-green-200',
    color: 'text-green-600',
    Icon: IoIosCheckmarkCircle,
  },
};

const AllowedStatuses = Object.keys(StatusConfig);

type updatableKeys = 'status' | 'priority';

export default function TaskListItem({ task }: Props) {
  const { deleteTask, updateTask, error, isLoading } = useTaskStore();
  const status = StatusConfig[task.status];
  const StatusIcon = status.Icon;

  const dividedName = task.user.name.split(/\s+/);
  const userName =
    dividedName.length >= 2 ? dividedName[0] + dividedName[1] : dividedName[0];

  const removeTask = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    deleteTask(task._id!);
  };

  const update = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    key: updatableKeys,
    value: string | boolean
  ) => {
    e.stopPropagation();
    updateTask(task._id!, { ...task, [key]: value }).then(
      () => error && toast.error(error)
    );
  };

  const MySwal = withReactContent(Swal);

  const openForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
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

  const viewTask = () => {
    MySwal.fire({
      html: (
        <Suspense fallback={<LoadingIcon />}>
          <TaskView task={task} />
        </Suspense>
      ),
      width: '25rem',
      showConfirmButton: false,
      showCloseButton: true,
    });
  };

  return (
    <div
      className='flex shadow bg-white rounded-md h-20 group/card cursor-pointer'
      onClick={viewTask}
    >
      <div className='flex items-center flex-col justify-between p-2'>
        <span className='relative flex basis-1/2 items-center group cursor-pointer'>
          {task.priority ? (
            <MdOutlineKeyboardDoubleArrowUp className='size-5 text-white bg-red-500 rounded-full' />
          ) : (
            <MdOutlineKeyboardArrowUp className='size-5 text-white bg-green-600 rounded-full' />
          )}
          <div className='absolute right-full text-xs text-nowrap p-1 space-y-1 scale-0 group-hover:scale-100 origin-right transition bg-white'>
            <button
              className='ms-auto flex items-center gap-1 shadow rounded px-2 py-1 me-2.5 bg-white disabled:bg-red-200'
              onClick={(e) => update(e, 'priority', true)}
              disabled={task.priority}
            >
              <MdOutlineKeyboardDoubleArrowUp className='size-4 text-white bg-red-500 rounded-full' />
              Prioridad
            </button>
            <button
              className='ms-auto flex items-center gap-1 shadow rounded px-2 py-1 me-2.5 bg-white disabled:bg-green-200'
              onClick={(e) => update(e, 'priority', false)}
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
          <div className='absolute right-full text-xs text-nowrap p-1 space-y-1 scale-0 group-hover:scale-100 origin-right transition bg-white'>
            {Object.keys(StatusConfig).map((key, i) => {
              const statusIndex = AllowedStatuses.findIndex(
                (s) => s === task.status
              );
              const isPrevStatus = statusIndex >= i;
              const { Icon, bg, color, label } = StatusConfig[key as Status];

              return (
                <button
                  key={i}
                  className={`ms-auto flex items-center gap-1 shadow rounded px-2 py-1 me-2 ${
                    isPrevStatus ? bg : 'bg-white'
                  }`}
                  onClick={(e) => update(e, 'status', key)}
                  disabled={isLoading || task.status === key || isPrevStatus}
                >
                  <Icon className={`size-5 ${color}`} />
                  {label}
                </button>
              );
            })}
          </div>
        </span>
      </div>
      <div className='flex flex-col grow max-w-2/3 p-2'>
        <span>
          <strong className='flex items-center gap-1 text-sm'>
            {task.title}
            <small className='font-normal'>| @{userName}</small>
          </strong>
          <p className='truncate'>{task.description}</p>
        </span>

        <span
          className={`text-xs font-normal px-2 py-0.5 ${status.bg} ${status.color} rounded w-fit`}
        >
          {status.label}
        </span>
      </div>
      <div className='relative flex flex-col items-end p-3 grow overflow-x-clip'>
        <small>{task.priority ? 'Prioridad' : 'No prioridad'}</small>
        <div className='absolute bottom-2 flex gap-1 opacity-0 translate-x-full origin-right group-hover/card:translate-x-1 group-hover/card:opacity-100 transition-all'>
          <button
            className='p-1.5 rounded-lg text-gray-700 bg-gray-200 hover:scale-105 transition-transform'
            onClick={viewTask}
          >
            <FaEye className='size-3' />
          </button>
          <button
            className='p-1.5 rounded-lg text-white bg-amber-500 hover:scale-105 transition-transform'
            onClick={openForm}
          >
            <FaPencil className='size-3' />
          </button>
          <button
            className='p-1.5 rounded-lg text-white bg-red-500 hover:scale-105 transition-transform'
            onClick={removeTask}
          >
            <FaTrash className='size-3' />
          </button>
        </div>
      </div>
    </div>
  );
}
