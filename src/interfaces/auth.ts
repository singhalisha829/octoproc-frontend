export interface LoginInfo {
  email: string;
  phone: string;
  password: string;
}
export interface RegisterInfo extends LoginInfo {
  firstName: string;
  confirmPassword: string;
  lastName: string;
}
