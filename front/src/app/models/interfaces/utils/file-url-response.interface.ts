export interface FileUrlResponse {
  estado: string;
  url: string;
  nombreArchivo: string;
  metadata: { [key: string]: string };
  tamanio: number;
  tipoContenido: string;
  ultimaModificacion: string;
  tiempoExpiracion: string;
}
