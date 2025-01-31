import { FaCircleCheck } from 'react-icons/fa6';

export default function Hero() {
  return (
    <div className='flex flex-col gap-4 sm:gap-8 basis-1/2'>
      <span>
        <h2 className='text-3xl sm:text-4xl'>
          Bienvenido a <strong className='text-blue-500'>TeamFlow.co!</strong>
        </h2>
        <p className='text-lg sm:text-xl mt-2'>
          ¿Alguna vez te has sentido abrumado por la cantidad de tareas
          pendientes que tienes? ¡No te preocupes más! Con TeamFlow, puedes
          guardar todas tus tareas pendientes y gestionarlas junto a tu equipo de trabajo.
        </p>
      </span>
      <ul className='space-y-2 w-full'>
        <li>
          <FaCircleCheck className='size-4 fill-green-600 inline me-2' />
          Mantente informado
        </li>
        <li>
          <FaCircleCheck className='size-4 fill-green-600 inline me-2' />
          ¡Aumenta tu productividad!
        </li>
        <li>
          <FaCircleCheck className='size-4 fill-green-600 inline me-2' />
          Sin enredos
        </li>
      </ul>
    </div>
  );
}
