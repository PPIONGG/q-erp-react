export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  role: string;
}

export interface LoginDto {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token?: string;
  user?: User;
  message?: string;
}