import { UserSession } from '@/auth/interfaces/user.interface';
import { create } from 'zustand';

type UserStore = {
  session: {
    name: string;
    email: string;
    password?: string;
    isLogged?: boolean;
  };
  login: (session: UserSession) => void;
  logout: () => void;
};

const initialState = {
  name: '',
  email: '',
  password: '',
  isLogged: false,
};

export const useUserStore = create<UserStore>()((set) => ({
  session: { ...initialState },
  login: (session: UserSession) => set(() => ({ session })),
  logout: () => {
    window.localStorage.removeItem('token')
    set({ session: { ...initialState } })
  },
}));
