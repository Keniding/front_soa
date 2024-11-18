// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, from } from 'rxjs';
import { environment } from "../../../../../environments/environment";
import { AuthRequest, AuthResponse } from "../../../../models/interfaces/utils/auth.interface";
import { AuthStateService } from '../../state/auth-state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = `${environment.apiUrl}/auth`;

  constructor(
    private http: HttpClient,
    private authStateService: AuthStateService
  ) {}

  initializeAuth(): Promise<void> {
    return new Promise((resolve) => {
      const token = this.authStateService.getToken();
      console.log('Token al inicializar:', token);
      if (token) {
        this.validateToken(token).subscribe({
          next: () => {
            console.log('Token validado exitosamente');
            this.authStateService.setAuthenticated(true);
            resolve();
          },
          error: (error) => {
            console.log('Error validando token:', error);
            this.logout();
            resolve();
          }
        });
      } else {
        console.log('No hay token almacenado');
        this.authStateService.setAuthenticated(false);
        resolve();
      }
    });
  }

  login(credentials: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, credentials).pipe(
      tap(response => {
        if (response.token) {
          this.authStateService.setToken(response.token);
        }
      })
    );
  }

  validateToken(token: string): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/validate`, token);
  }

  logout(): void {
    this.authStateService.clearToken();
  }

  get isAuthenticated$() {
    return this.authStateService.isAuthenticated$;
  }
}
