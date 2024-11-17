import { ObjectId } from 'mongodb';

export interface Rol {
  id: ObjectId;
  name: string;
  description: string;
  permisos: string[];
}
