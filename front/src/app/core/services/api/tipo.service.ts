import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ObjectId } from 'mongodb';
import { Tipo } from '../../../models/interfaces/tipo.interface';
import { ApiResponse } from '../../../models/interfaces/utils/api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class TipoService {
  private readonly API_URL = `${environment.apiUrl}/types`;

  constructor(private http: HttpClient) {}

  getAllTipos(): Observable<Tipo[]> {
    return this.http
      .get<ApiResponse<Tipo[]>>(this.API_URL)
      .pipe(map(response => response.data));
  }

  getTipoById(id: ObjectId): Observable<Tipo> {
    return this.http
      .get<ApiResponse<Tipo>>(`${this.API_URL}/${id}`)
      .pipe(map(response => response.data));
  }

  createTipo(tipo: Omit<Tipo, 'id'>): Observable<Tipo> {
    return this.http
      .post<ApiResponse<Tipo>>(this.API_URL, tipo)
      .pipe(map(response => response.data));
  }

  updateTipo(id: ObjectId, tipo: Tipo): Observable<Tipo> {
    return this.http
      .put<ApiResponse<Tipo>>(`${this.API_URL}/${id}`, tipo)
      .pipe(map(response => response.data));
  }

  deleteTipo(id: ObjectId): Observable<void> {
    return this.http
      .delete<ApiResponse<void>>(`${this.API_URL}/${id}`)
      .pipe(map(response => response.data));
  }
}
