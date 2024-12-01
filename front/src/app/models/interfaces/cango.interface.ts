import { ObjectId } from 'mongodb';
import {Rango} from "../enums/rango.enum";

export interface Cargo {
  id: string;
  nombre: string;
  descripcion: string;
  rango: Rango;
  departamento: string;
}
