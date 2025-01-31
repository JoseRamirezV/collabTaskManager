import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

interface Props {
  name: string;
}

export function PasswordInput({ name, ...props }: Props) {
  const [showPassword, setShowPassword] = useState(false);

  function toggleShow() {
    setShowPassword(!showPassword);
  }
  return (
    <div className='relative flex items-center w-fit'>
      <input
        type={showPassword ? 'text' : 'password'}
        name={name}
        placeholder={'Contraseña'}
        {...props}
      />
      <button
        type='button'
        className='[&>*]:size-4 p-1 rounded-full absolute right-2 focus:bg-gray-200 focus:outline-none'
        onClick={toggleShow}
        aria-label='Toggle password visibility'
      >
        {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
      </button>
    </div>
  );
}
