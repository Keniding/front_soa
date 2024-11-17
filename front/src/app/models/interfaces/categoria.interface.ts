import { ObjectId } from 'mongodb';

export interface Categoria {
  id: ObjectId;
  nombre: string;
  descripcion: string;
}
