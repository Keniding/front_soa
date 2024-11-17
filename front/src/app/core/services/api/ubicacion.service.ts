import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ObjectId } from 'mongodb';
import { Ubicacion } from '../../../models/interfaces/ubicacion.interface';
import { ApiResponse } from '../../../models/interfaces/utils/api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {
  private readonly API_URL = `${environment.apiUrl}/locations`;

  constructor(private http: HttpClient) {}

  getAllUbicaciones(): Observable<Ubicacion[]> {
    return this.http
      .get<ApiResponse<Ubicacion[]>>(this.API_URL)
      .pipe(map(response => response.data));
  }

  getUbicacionById(id: ObjectId): Observable<Ubicacion> {
    return this.http
      .get<ApiResponse<Ubicacion>>(`${this.API_URL}/${id}`)
      .pipe(map(response => response.data));
  }

  createUbicacion(ubicacion: Omit<Ubicacion, 'id'>): Observable<Ubicacion> {
    return this.http
      .post<ApiResponse<Ubicacion>>(this.API_URL, ubicacion)
      .pipe(map(response => response.data));
  }

  updateUbicacion(id: ObjectId, ubicacion: Ubicacion): Observable<Ubicacion> {
    return this.http
      .put<ApiResponse<Ubicacion>>(`${this.API_URL}/${id}`, ubicacion)
      .pipe(map(response => response.data));
  }

  deleteUbicacion(id: ObjectId): Observable<void> {
    return this.http
      .delete<ApiResponse<void>>(`${this.API_URL}/${id}`)
      .pipe(map(response => response.data));
  }
}
