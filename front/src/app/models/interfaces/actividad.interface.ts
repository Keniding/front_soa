import { ObjectId } from 'mongodb';
import {Estado} from "../enums/state";

export interface Actividad {
  id?: ObjectId;
  nombre: string;
  descripcion: string;
  fechaInicio: Date;
  fechaFin: Date;
  estado: Estado;
}
