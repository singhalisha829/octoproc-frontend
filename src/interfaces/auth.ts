export interface LoginInfo {
  email: string | null;
  phone: string | null;
  password: string;
}
export interface RegisterInfo extends LoginInfo {
  firstName: string;
  confirmPassword: string;
  lastName: string;
}
