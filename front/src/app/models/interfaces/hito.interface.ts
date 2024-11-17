import { ObjectId } from 'mongodb';

export interface Hito {
  id: ObjectId;
  nombre: string;
  descripcion: string;
  fecha: Date;
}
