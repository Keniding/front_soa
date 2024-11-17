import { ObjectId } from 'mongodb';

export interface Ubicacion {
  id: ObjectId;
  latitud: number;
  longitud: number;
  direccion: string;
}
