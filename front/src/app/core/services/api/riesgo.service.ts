import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ObjectId } from 'mongodb';
import { Riesgo } from '../../../models/interfaces/riesgo.interface';
import { ApiResponse } from '../../../models/interfaces/utils/api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class RiesgoService {
  private readonly API_URL = `${environment.apiUrl}/risks`;

  constructor(private http: HttpClient) {}

  getAllRiesgos(): Observable<Riesgo[]> {
    return this.http
      .get<ApiResponse<Riesgo[]>>(this.API_URL)
      .pipe(map(response => response.data));
  }

  getRiesgoById(id: ObjectId): Observable<Riesgo> {
    return this.http
      .get<ApiResponse<Riesgo>>(`${this.API_URL}/${id}`)
      .pipe(map(response => response.data));
  }

  createRiesgo(riesgo: Omit<Riesgo, 'id'>): Observable<Riesgo> {
    return this.http
      .post<ApiResponse<Riesgo>>(this.API_URL, riesgo)
      .pipe(map(response => response.data));
  }

  updateRiesgo(id: ObjectId, riesgo: Riesgo): Observable<Riesgo> {
    return this.http
      .put<ApiResponse<Riesgo>>(`${this.API_URL}/${id}`, riesgo)
      .pipe(map(response => response.data));
  }

  deleteRiesgo(id: ObjectId): Observable<void> {
    return this.http
      .delete<ApiResponse<void>>(`${this.API_URL}/${id}`)
      .pipe(map(response => response.data));
  }
}
