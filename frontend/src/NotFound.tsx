import { Link } from 'react-router';

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center h-screen w-screen bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]'>
      <strong className='text-9xl'>404</strong>
      <p className='text-4xl'>Pagina no encontrada</p>
      <small className='text-xl mt-1'>
        Que tal si volvamos al <Link className='text-blue-500 hover:animate-pulse' to={'/ '}>inicio</Link>?
      </small>
    </div>
  );
}
