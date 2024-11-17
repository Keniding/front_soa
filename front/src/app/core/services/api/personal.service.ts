import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ObjectId } from 'mongodb';
import { Personal } from '../../../models/interfaces/personal.interface';
import { ApiResponse } from '../../../models/interfaces/utils/api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {
  private readonly API_URL = `${environment.apiUrl}/staff`;

  constructor(private http: HttpClient) {}

  getAllPersonal(): Observable<Personal[]> {
    return this.http
      .get<ApiResponse<Personal[]>>(this.API_URL)
      .pipe(map(response => response.data));
  }

  getPersonalById(id: ObjectId): Observable<Personal> {
    return this.http
      .get<ApiResponse<Personal>>(`${this.API_URL}/${id}`)
      .pipe(map(response => response.data));
  }

  createPersonal(personal: Omit<Personal, 'id'>): Observable<Personal> {
    return this.http
      .post<ApiResponse<Personal>>(this.API_URL, personal)
      .pipe(map(response => response.data));
  }

  updatePersonal(id: ObjectId, personal: Personal): Observable<Personal> {
    return this.http
      .put<ApiResponse<Personal>>(`${this.API_URL}/${id}`, personal)
      .pipe(map(response => response.data));
  }

  deletePersonal(id: ObjectId): Observable<void> {
    return this.http
      .delete<ApiResponse<void>>(`${this.API_URL}/${id}`)
      .pipe(map(response => response.data));
  }
}
