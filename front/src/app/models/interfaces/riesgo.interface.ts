import { ObjectId } from 'mongodb';
import { Nivel } from '../enums/nivel.enum';

export interface Riesgo {
  id: ObjectId;
  nombre: string;
  descripcion: string;
  nivel: Nivel;
  planMitigacion: string;
}
