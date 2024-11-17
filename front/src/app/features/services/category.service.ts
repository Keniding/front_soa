import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ObjectId } from 'mongodb';
import { Categoria } from '../../models/interfaces/categoria.interface';
import { ApiResponse } from '../../models/interfaces/utils/api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private readonly API_URL = `${environment.apiUrl}/categories`;

  constructor(private http: HttpClient) {}

  getAllCategorias(): Observable<Categoria[]> {
    return this.http
      .get<ApiResponse<Categoria[]>>(this.API_URL)
      .pipe(map(response => response.data));
  }

  getCategoriaById(id: ObjectId): Observable<Categoria> {
    return this.http
      .get<ApiResponse<Categoria>>(`${this.API_URL}/${id}`)
      .pipe(map(response => response.data));
  }

  createCategoria(categoria: Omit<Categoria, 'id'>): Observable<Categoria> {
    return this.http
      .post<ApiResponse<Categoria>>(this.API_URL, categoria)
      .pipe(map(response => response.data));
  }

  updateCategoria(id: ObjectId, categoria: Categoria): Observable<Categoria> {
    return this.http
      .put<ApiResponse<Categoria>>(`${this.API_URL}/${id}`, categoria)
      .pipe(map(response => response.data));
  }

  deleteCategoria(id: ObjectId): Observable<void> {
    return this.http
      .delete<ApiResponse<void>>(`${this.API_URL}/${id}`)
      .pipe(map(response => response.data));
  }
}
