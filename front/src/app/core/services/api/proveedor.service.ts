import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ObjectId } from 'mongodb';
import { Proveedor } from '../../../models/interfaces/proveedor.interface';
import { ApiResponse } from '../../../models/interfaces/utils/api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  private readonly API_URL = `${environment.apiUrl}/suppliers`;

  constructor(private http: HttpClient) {}

  getAllProveedores(): Observable<Proveedor[]> {
    return this.http
      .get<ApiResponse<Proveedor[]>>(this.API_URL)
      .pipe(map(response => response.data));
  }

  getProveedorById(id: ObjectId): Observable<Proveedor> {
    return this.http
      .get<ApiResponse<Proveedor>>(`${this.API_URL}/${id}`)
      .pipe(map(response => response.data));
  }

  createProveedor(proveedor: Omit<Proveedor, 'id'>): Observable<Proveedor> {
    return this.http
      .post<ApiResponse<Proveedor>>(this.API_URL, proveedor)
      .pipe(map(response => response.data));
  }

  updateProveedor(id: ObjectId, proveedor: Proveedor): Observable<Proveedor> {
    return this.http
      .put<ApiResponse<Proveedor>>(`${this.API_URL}/${id}`, proveedor)
      .pipe(map(response => response.data));
  }

  deleteProveedor(id: ObjectId): Observable<void> {
    return this.http
      .delete<ApiResponse<void>>(`${this.API_URL}/${id}`)
      .pipe(map(response => response.data));
  }
}
