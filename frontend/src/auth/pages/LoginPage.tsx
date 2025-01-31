import { type FormEvent, useEffect, useState } from 'react';
// import { Helmet } from "react-helmet-async";
import { Link, useLocation } from 'react-router';
import { Toaster, toast } from 'sonner';

// import Hero from "@/auth/components/Hero";
import Hero from '@/auth/components/Hero';
import { useLogin } from '@/auth/hooks/useLogIn';
import { PasswordInput } from '../components/PasswordInput';
import { Helmet } from 'react-helmet-async';

const LoginPage = () => {
  const { authenticateUser } = useLogin();
  const [isLoading, setIsLoading] = useState(false);
  const { state } = useLocation();

  useEffect(() => {
    if (state?.error) {
      toast.error('Error', {
        description: state.error,
      });
      window.history.replaceState({}, '');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const { email, password } = Object.fromEntries(new window.FormData(form));
    setIsLoading(true);
    authenticateUser(email as string, password as string).finally(() => {
      setIsLoading(false);
    });
  }


  return (
    <>
      <Helmet>
        <title>Iniciar sesión</title>
      </Helmet>
      <section className='relative flex max-sm:flex-col justify-around items-center p-4'>
        <Hero />
        <form
          onSubmit={handleLogin}
          className='flex flex-col gap-4 rounded-lg shadow-lg bg-white p-8'
        >
          <h1 className='text-lg py-2 text-gray-700'>Inicia Sesión</h1>
          <label className='flex flex-col'>
            Correo electrónico
            <input type='email' name='email' placeholder='user@example.com' />
          </label>
          <label className='flex flex-col'>
            Contraseña
            <PasswordInput
              name={'password'}
            />
          </label>
          <button
            type='submit'
            className='bg-blue-500 rounded-lg py-2 text-white'
            disabled={isLoading}
          >
            Iniciar sesión
          </button>
          <div className='flex flex-col items-start justify-between'>
            <Link to={'/auth/sign-up'} className='text-sm text-blue-500'>
              Registrarme
            </Link>
            <Link
              to={'/auth/forgot-my-password'}
              className='text-sm text-blue-500'
            >
              Olvidé mi contraseña
            </Link>
          </div>
        </form>
        <span style={{ position: 'absolute' }}>
          <Toaster richColors />
        </span>
      </section>
    </>
  );
};

export default LoginPage;
