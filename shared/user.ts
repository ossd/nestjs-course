export interface User {
  _id: number;
  email: string;
  roles: string[];
  passwordHash: string;
}
