export interface User {
  id: string;
  phoneNumber: string;
  firstName: string;
  role : string ;
  lastName: string;
  isVerified: boolean;
  lastLogin: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
}