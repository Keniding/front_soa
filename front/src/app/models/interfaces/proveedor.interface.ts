import { ObjectId } from 'mongodb';

export interface Proveedor {
  id: ObjectId;
  nombre: string;
  contacto: string;
  telefono: string;
  correo: string;
}
