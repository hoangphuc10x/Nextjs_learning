import { Role } from '@/enum/role.enum';

export interface Payload {
  sub: string;
  username: string;
  role: Role;
  iat: number;
  exp: number;
}
