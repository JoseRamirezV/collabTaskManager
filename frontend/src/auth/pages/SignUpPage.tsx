import { useState } from 'react';
// import { Helmet } from "react-helmet-async";
import { Toaster } from 'sonner';

import { useLogin } from '@/auth/hooks/useLogIn';
import { sleep } from '@/dashboard/utils/sleep';
import { useFormik } from 'formik';
import { Helmet } from 'react-helmet-async';
import * as Yup from 'yup';
import { LoadingIcon } from '../components/LoadingIcon';
import { PasswordInput } from '../components/PasswordInput';
import SignUpHero from '../components/SignUpHero';

const initialValues = {
  name: '',
  email: '',
  password: '',
  password2: '',
};

export default function SignUpPage() {
  const { createUser } = useLogin();
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().required('Campo requerido'),
    email: Yup.string()
      .email('Formato de email invalido')
      .required('Campo requerido'),
    password: Yup.string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .matches(/^[^ñ]+$/, "La contraseña no puede contener la letra 'ñ'")
      .required('Campo requerido'),
    password2: Yup.string()
      .oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir')
      .required('Campo requerido'),
  });

  const { errors, touched, handleSubmit, getFieldProps } = useFormik({
    initialValues,
    onSubmit: async (values) => {
      setIsLoading(true);
      await sleep(3);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password2, ...data } = values;
      console.log(values);
      await createUser({ ...data });
      setIsLoading(false);
    },
    validationSchema,
  });

  return (
    <>
      <Helmet>
        <title>Registro</title>
      </Helmet>
      <section className='flex justify-around mx-auto py-12 px-8'>
        <form
          className='flex flex-col gap-4 rounded-lg bg-white shadow-lg p-8'
          onSubmit={handleSubmit}
        >
          <header className='flex justify-between items-center'>
            <h1 className='text-xl text-gray-700'>Registro</h1>
          </header>
          <label className='flex flex-col gap-1'>
            <legend className='relative flex items-center gap-2 w-fit'>
              Nombre
              {touched.name && errors.name && (
                <span className='absolute left-[105%] text-nowrap block text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full'>
                  {errors.name}
                </span>
              )}
            </legend>
            <input type='text' {...getFieldProps('name')} />
          </label>
          <label className='flex flex-col gap-1'>
            <legend className='relative flex items-center gap-2 w-fit'>
              Email
              {touched.email && errors.email && (
                <span className='absolute left-[105%] text-nowrap block text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full'>
                  {errors.email}
                </span>
              )}
            </legend>
            <input type='text' {...getFieldProps('email')} />
          </label>
          <label className='flex flex-col gap-1'>
            <legend className='relative flex items-center gap-2 w-fit'>
              Contraseña
              {touched.password && errors.password && (
                <span className='absolute left-[105%] text-nowrap block text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full'>
                  {errors.password}
                </span>
              )}
            </legend>
            <PasswordInput {...getFieldProps('password')} />
          </label>
          <label className='flex flex-col gap-1'>
            <legend className='relative flex items-center gap-2 w-fit'>
              Confirmar contraseña
              {touched.password2 && errors.password2 && (
                <span className='absolute left-[105%] text-nowrap block text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full'>
                  {errors.password2}
                </span>
              )}
            </legend>
            <PasswordInput {...getFieldProps('password2')} />
          </label>
          <button
            type='submit'
            className='bg-blue-500 rounded-lg text-white py-2'
            disabled={isLoading}
          >
            {isLoading ? (
              <LoadingIcon className='fill-white size-6' />
            ) : (
              'Registrarse'
            )}
          </button>
        </form>
        <SignUpHero />
      </section>
      <Toaster richColors closeButton />
    </>
  );
}
