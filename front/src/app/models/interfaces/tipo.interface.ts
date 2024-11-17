import { ObjectId } from 'mongodb';
import { Categoria } from './categoria.interface';

export interface Tipo {
  id: ObjectId;
  nombre: string;
  descripcion: string;
  subcategorias: Categoria[];
}
