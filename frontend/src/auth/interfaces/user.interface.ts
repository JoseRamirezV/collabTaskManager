export interface UserSession {
  name: string;
  email: string;
  password?: string;
  isLogged?: boolean;
}