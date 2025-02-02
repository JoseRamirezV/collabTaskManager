import { useUserStore } from '@/auth/store/user';
import { useFormik } from 'formik';
import { toast } from 'sonner';
import * as Yup from 'yup';
import { Task } from '../interfaces/task.interface';
import { useTaskStore } from '../store/TaskStore';
import { MdOutlineKeyboardDoubleArrowUp, MdOutlineKeyboardArrowUp } from 'react-icons/md';
import { parse } from '@formkit/tempo';

interface Props {
  task?: Task;
  close: () => void;
}

export default function TaskForm({ task, close }: Props) {
  const { updateTask, addTask, isLoading, error } = useTaskStore();
  const { session } = useUserStore();

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const limitDate = (task ? new Date(task.limitDate) : today)
    .toISOString()
    .split('T')[0];

  const validationSchema = Yup.object({
    title: Yup.string()
      .max(100, 'Debe tener máximo 100 caracteres')
      .required('Requerido'),
    description: Yup.string().required('Requerido'),
    limitDate: Yup.date()
      .min(today, 'La fecha no puede anterior a hoy')
      .required('Requerido')
      .typeError('Introduce una fecha válida'),
  });

  const { errors, touched, handleSubmit, getFieldProps, values } = useFormik({
    initialValues: {
      title: task?.title ?? '',
      description: task?.description ?? '',
      limitDate: limitDate,
      priority: task?.priority ?? false,
      status: task?.status ?? 'Pending',
    },
    onSubmit: (values) => {
      const limitDate = parse(values.limitDate, 'YYYY-MM-DD')
      console.log(limitDate);
      const data = {
        ...values,
        limitDate,
        user: {
          name: session.name,
          email: session.email,
        },
      };
      if (task) {
        return updateTask(task._id!, data).then(() => {
          if (error) toast.error(error);
          close();
        });
      } else {
        return addTask(data).then(() => {
          if (error) toast.error(error);
          close();
        });
      }
    },
    validationSchema,
  });

  const isPriority = values.priority;

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-5 p-2 pt-0 max-sm:text-sm'>
      <label className='relative flex flex-col items-start gap-1'>
        <legend className='flex items-center gap-2'>
          Titulo
          {touched.title && errors.title && (
            <span className='block text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full'>
              {errors.title}
            </span>
          )}
        </legend>
        <input
          type='text'
          className='w-full'
          placeholder='Tarea'
          autoFocus
          {...getFieldProps('title')}
        />
      </label>
      <label className='relative flex flex-col items-start gap-1'>
        <legend className='flex items-center gap-2'>
          Descripción
          {touched.description && errors.description && (
            <span className='block text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full'>
              {errors.description}
            </span>
          )}
        </legend>
        <textarea
          rows={4}
          className='w-full'
          placeholder='Avance primer entregable'
          {...getFieldProps('description')}
        ></textarea>
      </label>
      <label className='relative flex flex-col items-start gap-1'>
        <legend className='flex items-center gap-2'>
          Fecha limite
          {touched.limitDate &&
            errors.limitDate &&
            typeof errors.limitDate === 'string' && (
              <span className='block text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full'>
                {errors.limitDate}
              </span>
            )}
        </legend>
        <input className='w-full' type='date' {...getFieldProps('limitDate')} />
      </label>
      <label className='relative flex flex-col items-start gap-1'>
        <legend>Estado</legend>
        <select className='w-full' {...getFieldProps('status')}>
          <option value='Pending'>Pendiente</option>
          <option value='In process'>En proceso</option>
          <option value='Completed'>Completado</option>
        </select>
      </label>
      <footer className='flex items-center justify-between'>
        <label
          className={`flex items-center gap-1 rounded-lg px-3 py-2 cursor-pointer transition hover: active:scale-95 text-white ${
            isPriority ? 'bg-red-500' : 'bg-green-600'
          }`}
        >
          {isPriority ? (
            <MdOutlineKeyboardDoubleArrowUp className='size-5'/>
          ) : (
            <MdOutlineKeyboardArrowUp className='size-5'/>
          )}
          <input
            type='checkbox'
            defaultChecked={isPriority}
            className='appearance-none'
            {...getFieldProps('priority')}
          />
          {isPriority ? 'Prioridad' : 'No prioridad'}
        </label>
        <button
          type='submit'
          className='w-fit self-end px-3 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600'
          disabled={isLoading}
        >
          Guardar
        </button>
      </footer>
    </form>
  );
}
