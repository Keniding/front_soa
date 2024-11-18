import { ObjectId } from 'mongodb';
import { Nivel } from '../enums/nivel.enum';

export interface Riesgo {
  id: ObjectId;
  nombre: string;
  descripcion: string;
  nivel: Nivel;
  planMitigacion: string;
  probabilidad: number; // 1-5
  impacto: number; // 1-5
}
