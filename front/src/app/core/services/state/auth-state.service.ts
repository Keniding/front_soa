// auth-state.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private router: Router) {
    this.isAuthenticatedSubject.next(!!localStorage.getItem('token'));
  }

  public setAuthenticated(value: boolean): void {
    this.isAuthenticatedSubject.next(value);
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public setToken(token: string): void {
    localStorage.setItem('token', token);
    this.setAuthenticated(true);
  }

  public clearToken(): void {
    localStorage.removeItem('token');
    this.setAuthenticated(false);
  }

  public getAuthenticationState(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  public handleUnauthorized(): void {
    this.clearToken();
    this.router.navigate(['/auth/login']).then(r => console.log(r));
  }
}
