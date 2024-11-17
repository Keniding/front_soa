import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Proyecto } from "../../../models/interfaces/proyecto.interface";
import { ApiResponse } from "../../../models/interfaces/utils/api-response.interface";
import { ObjectId } from 'mongodb';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  private readonly API_URL = `${environment.apiUrl}/projects`;

  constructor(private http: HttpClient) {}

  getAllProyectos(): Observable<Proyecto[]> {
    return this.http
      .get<ApiResponse<Proyecto[]>>(this.API_URL)
      .pipe(map(response => response.data));
  }

  getProyectoById(id: ObjectId): Observable<Proyecto> {
    return this.http
      .get<ApiResponse<Proyecto>>(`${this.API_URL}/${id}`)
      .pipe(map(response => response.data));
  }

  createProyecto(proyecto: Omit<Proyecto, 'id'>): Observable<Proyecto> {
    return this.http
      .post<ApiResponse<Proyecto>>(this.API_URL, proyecto)
      .pipe(map(response => response.data));
  }

  updateProyecto(id: ObjectId, proyecto: Proyecto): Observable<Proyecto> {
    return this.http
      .put<ApiResponse<Proyecto>>(`${this.API_URL}/${id}`, proyecto)
      .pipe(map(response => response.data));
  }

  deleteProyecto(id: ObjectId): Observable<void> {
    return this.http
      .delete<ApiResponse<void>>(`${this.API_URL}/${id}`)
      .pipe(map(response => response.data));
  }
}
