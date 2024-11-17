import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ObjectId } from 'mongodb';
import {Actividad} from "../../models/interfaces/actividad.interface";
import {ApiResponse} from "../../models/interfaces/utils/api-response.interface";

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private readonly API_URL = `${environment.apiUrl}/activities`;

  constructor(private http: HttpClient) {}

  getAllActividades(): Observable<Actividad[]> {
    return this.http
      .get<ApiResponse<Actividad[]>>(this.API_URL)
      .pipe(map(response => response.data));
  }

  getActividadById(id: ObjectId): Observable<Actividad> {
    return this.http
      .get<ApiResponse<Actividad>>(`${this.API_URL}/${id}`)
      .pipe(map(response => response.data));
  }

  createActividad(actividad: Omit<Actividad, 'id'>): Observable<Actividad> {
    return this.http
      .post<ApiResponse<Actividad>>(this.API_URL, actividad)
      .pipe(map(response => response.data));
  }

  updateActividad(id: ObjectId, actividad: Actividad): Observable<Actividad> {
    return this.http
      .put<ApiResponse<Actividad>>(`${this.API_URL}/${id}`, actividad)
      .pipe(map(response => response.data));
  }

  deleteActividad(id: ObjectId): Observable<void> {
    return this.http
      .delete<ApiResponse<void>>(`${this.API_URL}/${id}`)
      .pipe(map(response => response.data));
  }
}
