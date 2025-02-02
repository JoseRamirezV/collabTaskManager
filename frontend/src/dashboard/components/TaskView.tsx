import { format } from '@formkit/tempo';
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardDoubleArrowUp,
} from 'react-icons/md';
import { Task } from '../interfaces/task.interface';
import { StatusConfig } from './TaskListItem';

interface Props {
  task: Task;
}

export default function TaskView({ task }: Props) {
  const status = StatusConfig[task.status];
  const StatusIcon = status.Icon;
  const isPriority = task.priority;

  const limitDate = format({ date: task.limitDate, format: 'full', locale: 'es'})

  return (
    <article className='flex flex-col gap-3 items-start text-start'>
      <header className='self-center text-center'>
        <h2 className='text-4xl capitalize font-semibold'>{task.title}</h2>
        <div className='flex gap-2'>
          <span
            className={`flex items-center gap-1 w-fit px-2 py-1 rounded-lg text-xs ${status.bg}`}
          >
            <StatusIcon className={`${status.color} size-4`} />
            {status.label}
          </span>
          {isPriority ? (
            <span className='flex items-center gap-1 rounded-lg px-2 py-1 bg-red-200 text-xs w-fit'>
              <MdOutlineKeyboardDoubleArrowUp className='size-3 text-white bg-red-500 rounded-full' />
              Prioridad
            </span>
          ) : (
            <span className='flex items-center gap-1 rounded-lg px-2 py-1 bg-green-200 text-xs w-fit'>
              <MdOutlineKeyboardArrowUp className='size-3 text-white bg-green-600 rounded-full' />
              No prioridad
            </span>
          )}
        </div>
      </header>
      <section className='max-h-56 thin-scrollbar'>
        <strong>Descripción</strong>
        <p>
          {task.description}
        </p>
      </section>
      <footer>
        <span className='capitalize'>
          <strong className='block'>Fecha limite </strong>
          {limitDate}
        </span>
      </footer>
    </article>
  );
}
