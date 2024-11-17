import { ObjectId } from 'mongodb';
import {Actividad} from "./actividad.interface";
import {Estado} from "../enums/state";

export interface Proyecto {
  id: ObjectId;
  nombre: string;
  descripcion: string;
  cantidadKm: number;
  tipo: Tipo;
  recursos: Recurso[];
  fechaInicio: Date;
  fechaFin: Date;
  ubicacion: Ubicacion;
  estado: Estado;
  responsable: Personal;
  actividades: Actividad[];
  hitos: Hito[];
  riesgos: Riesgo[];
}

export interface Tipo {
}

export interface Recurso {
}

export interface Ubicacion {
}

export interface Personal {
}

export interface Hito {
}

export interface Riesgo {
}
