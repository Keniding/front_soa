import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ObjectId } from 'mongodb';
import { Rol } from '../../../models/interfaces/rol.interface';
import { ApiResponse } from '../../../models/interfaces/utils/api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private readonly API_URL = `${environment.apiUrl}/roles`;

  constructor(private http: HttpClient) {}

  getAllRoles(): Observable<Rol[]> {
    return this.http
      .get<ApiResponse<Rol[]>>(this.API_URL)
      .pipe(map(response => response.data));
  }

  getRolById(id: ObjectId): Observable<Rol> {
    return this.http
      .get<ApiResponse<Rol>>(`${this.API_URL}/${id}`)
      .pipe(map(response => response.data));
  }

  createRol(rol: Omit<Rol, 'id'>): Observable<Rol> {
    return this.http
      .post<ApiResponse<Rol>>(this.API_URL, rol)
      .pipe(map(response => response.data));
  }

  updateRol(id: ObjectId, rol: Rol): Observable<Rol> {
    return this.http
      .put<ApiResponse<Rol>>(`${this.API_URL}/${id}`, rol)
      .pipe(map(response => response.data));
  }

  deleteRol(id: ObjectId): Observable<void> {
    return this.http
      .delete<ApiResponse<void>>(`${this.API_URL}/${id}`)
      .pipe(map(response => response.data));
  }
}
