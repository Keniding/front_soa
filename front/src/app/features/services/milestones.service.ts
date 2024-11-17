import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ObjectId } from 'mongodb';
import { Hito } from '../../models/interfaces/hito.interface';
import { ApiResponse } from '../../models/interfaces/utils/api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class HitoService {
  private readonly API_URL = `${environment.apiUrl}/milestones`;

  constructor(private http: HttpClient) {}

  getAllHitos(): Observable<Hito[]> {
    return this.http
      .get<ApiResponse<Hito[]>>(this.API_URL)
      .pipe(
        map(response => response.data),
        map(hitos => hitos.map(hito => ({
          ...hito,
          fecha: new Date(hito.fecha)
        })))
      );
  }

  getHitoById(id: ObjectId): Observable<Hito> {
    return this.http
      .get<ApiResponse<Hito>>(`${this.API_URL}/${id}`)
      .pipe(
        map(response => response.data),
        map(hito => ({
          ...hito,
          fecha: new Date(hito.fecha)
        }))
      );
  }

  createHito(hito: Omit<Hito, 'id'>): Observable<Hito> {
    return this.http
      .post<ApiResponse<Hito>>(this.API_URL, hito)
      .pipe(
        map(response => response.data),
        map(savedHito => ({
          ...savedHito,
          fecha: new Date(savedHito.fecha)
        }))
      );
  }

  updateHito(id: ObjectId, hito: Hito): Observable<Hito> {
    return this.http
      .put<ApiResponse<Hito>>(`${this.API_URL}/${id}`, hito)
      .pipe(
        map(response => response.data),
        map(updatedHito => ({
          ...updatedHito,
          fecha: new Date(updatedHito.fecha)
        }))
      );
  }

  deleteHito(id: ObjectId): Observable<void> {
    return this.http
      .delete<ApiResponse<void>>(`${this.API_URL}/${id}`)
      .pipe(map(response => response.data));
  }
}
