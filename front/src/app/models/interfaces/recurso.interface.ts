import { ObjectId } from 'mongodb';
import { Proveedor } from './proveedor.interface';

export interface Recurso {
  id: ObjectId;
  nombre: string;
  descripcion: string;
  costo: number;
  unidad: string;
  cantidadDisponible: number;
  fechaAdquisicion: Date;
  proveedor: Proveedor[];
}
