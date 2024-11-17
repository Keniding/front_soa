// token.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }
}
