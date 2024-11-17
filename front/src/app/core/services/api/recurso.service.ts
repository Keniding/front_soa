import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ObjectId } from 'mongodb';
import { Recurso } from '../../../models/interfaces/recurso.interface';
import { ApiResponse } from '../../../models/interfaces/utils/api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class RecursoService {
  private readonly API_URL = `${environment.apiUrl}/resources`;

  constructor(private http: HttpClient) {}

  getAllRecursos(): Observable<Recurso[]> {
    return this.http
      .get<ApiResponse<Recurso[]>>(this.API_URL)
      .pipe(
        map(response => response.data),
        map(recursos => recursos.map(recurso => ({
          ...recurso,
          fechaAdquisicion: new Date(recurso.fechaAdquisicion)
        })))
      );
  }

  getRecursoById(id: ObjectId): Observable<Recurso> {
    return this.http
      .get<ApiResponse<Recurso>>(`${this.API_URL}/${id}`)
      .pipe(
        map(response => response.data),
        map(recurso => ({
          ...recurso,
          fechaAdquisicion: new Date(recurso.fechaAdquisicion)
        }))
      );
  }

  createRecurso(recurso: Omit<Recurso, 'id'>): Observable<Recurso> {
    return this.http
      .post<ApiResponse<Recurso>>(this.API_URL, recurso)
      .pipe(
        map(response => response.data),
        map(savedRecurso => ({
          ...savedRecurso,
          fechaAdquisicion: new Date(savedRecurso.fechaAdquisicion)
        }))
      );
  }

  updateRecurso(id: ObjectId, recurso: Recurso): Observable<Recurso> {
    return this.http
      .put<ApiResponse<Recurso>>(`${this.API_URL}/${id}`, recurso)
      .pipe(
        map(response => response.data),
        map(updatedRecurso => ({
          ...updatedRecurso,
          fechaAdquisicion: new Date(updatedRecurso.fechaAdquisicion)
        }))
      );
  }

  deleteRecurso(id: ObjectId): Observable<void> {
    return this.http
      .delete<ApiResponse<void>>(`${this.API_URL}/${id}`)
      .pipe(map(response => response.data));
  }
}
