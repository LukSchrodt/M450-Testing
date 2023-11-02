import { Role } from './Role.model';

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: Role[];
};
