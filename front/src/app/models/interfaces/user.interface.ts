import { ObjectId } from 'mongodb';
import { Rol } from './rol.interface';

export interface User {
  id: ObjectId;
  username: string;
  password: string;
  active: boolean;
  rol: Rol;
}
