import { useUserStore } from '@/auth/store/user';
import { IoIosArrowDown } from 'react-icons/io';
import { PiSignOutBold } from 'react-icons/pi';

export default function Navbar() {
  const { session, logout } = useUserStore();
  const dividedName = session.name.split(/\s+/)
  const userName = dividedName.length >= 2 ? `${dividedName[0]} ${dividedName[1]}` : dividedName[0]
  
  return (
    <header className='z-10'>
      <nav className='text-gray-700 w-3/6 flex items-center justify-between mx-auto mt-5 bg-white shadow ps-5 pe-3 py-2 rounded-full'>
        <span>logo</span>
        <div className='relative group rounded-full px-3 py-1 hover:shadow transition cursor-pointer'>
          <p className='max-w-24 truncate inline'>{userName}</p>
          <IoIosArrowDown className='inline ms-2 size-3 text-gray-700' />
          <div className='absolute scale-0 top-full right-0 group-hover:scale-100 transition origin-top-right'>
            <ul className='flex flex-col items-center gap-2 rounded-lg bg-white shadow rounded-tr-none mt-4 [&>li]:px-3.5 [&>li]:py-2'>
              <li>
                <button className='flex items-center gap-2 group/btn' onClick={logout}>
                  <p className='text-sm text-nowrap'>Cerrar sesión</p>
                  <PiSignOutBold className='size-4white group-hover/btn:fill-red-400 transition' />
                </button>
                {/*TODO: profile link*/}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
