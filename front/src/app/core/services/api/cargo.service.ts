import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ObjectId } from 'mongodb';
import { ApiResponse } from '../../../models/interfaces/utils/api-response.interface';
import {Cargo} from "../../../models/interfaces/cango.interface";

@Injectable({
  providedIn: 'root'
})
export class CargoService {
  private readonly API_URL = `${environment.apiUrl}/posts`;

  constructor(private http: HttpClient) {}

  getAllCargos(): Observable<Cargo[]> {
    return this.http
      .get<ApiResponse<Cargo[]>>(this.API_URL)
      .pipe(map(response => response.data));
  }

  getCargoById(id: ObjectId): Observable<Cargo> {
    return this.http
      .get<ApiResponse<Cargo>>(`${this.API_URL}/${id}`)
      .pipe(map(response => response.data));
  }

  createCargo(cargo: Omit<Cargo, 'id'>): Observable<Cargo> {
    return this.http
      .post<ApiResponse<Cargo>>(this.API_URL, cargo)
      .pipe(map(response => response.data));
  }

  updateCargo(id: ObjectId, cargo: Cargo): Observable<Cargo> {
    return this.http
      .put<ApiResponse<Cargo>>(`${this.API_URL}/${id}`, cargo)
      .pipe(map(response => response.data));
  }

  deleteCargo(id: ObjectId): Observable<void> {
    return this.http
      .delete<ApiResponse<void>>(`${this.API_URL}/${id}`)
      .pipe(map(response => response.data));
  }
}
