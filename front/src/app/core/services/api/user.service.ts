import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ObjectId } from 'mongodb';
import { User } from '../../../models/interfaces/user.interface';
import { Rol } from '../../../models/interfaces/rol.interface';
import { ApiResponse } from '../../../models/interfaces/utils/api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly API_URL = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http
      .get<ApiResponse<User[]>>(this.API_URL)
      .pipe(map(response => response.data));
  }

  getUserById(id: ObjectId): Observable<User> {
    return this.http
      .get<ApiResponse<User>>(`${this.API_URL}/${id}`)
      .pipe(map(response => response.data));
  }

  createUser(user: Omit<User, 'id'>): Observable<User> {
    return this.http
      .post<ApiResponse<User>>(this.API_URL, user)
      .pipe(map(response => response.data));
  }

  updateUser(id: ObjectId, user: User): Observable<User> {
    return this.http
      .put<ApiResponse<User>>(`${this.API_URL}/${id}`, user)
      .pipe(map(response => response.data));
  }

  deleteUser(id: ObjectId): Observable<void> {
    return this.http
      .delete<ApiResponse<void>>(`${this.API_URL}/${id}`)
      .pipe(map(response => response.data));
  }

  updateUserRole(id: ObjectId, role: Rol): Observable<void> {
    return this.http
      .put<ApiResponse<void>>(`${this.API_URL}/${id}/role`, role)
      .pipe(map(response => response.data));
  }
}
