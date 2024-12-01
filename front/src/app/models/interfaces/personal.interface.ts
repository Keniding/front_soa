import { ObjectId } from 'mongodb';
import {Cargo} from "./cango.interface";

export interface Personal {
  id: string;
  nombre: string;
  cargo: Cargo;
  telefono: string;
  correo: string;
}
