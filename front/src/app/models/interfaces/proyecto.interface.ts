import { ObjectId } from 'mongodb';
import {Actividad} from "./actividad.interface";
import {Estado} from "../enums/estado.enum";
import {Ubicacion} from "./ubicacion.interface";
import {Hito} from "./hito.interface";
import {Recurso} from "./recurso.interface";
import {Riesgo} from "./riesgo.interface";
import {Personal} from "./personal.interface";

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
