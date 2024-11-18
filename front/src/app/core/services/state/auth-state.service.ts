// auth-state.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private initializedSubject = new BehaviorSubject<boolean>(false);

  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  public initialized$ = this.initializedSubject.asObservable();

  constructor(private router: Router) {
    this.checkInitialAuth();
  }
  private async checkInitialAuth(): Promise<void> {
    try {
      const token = this.getToken();
      this.isAuthenticatedSubject.next(!!token);
    } catch (error) {
      console.error('Error checking initial auth:', error);
      this.clearToken();
    } finally {
      this.setInitialized(true);
    }
  }

  public setAuthenticated(value: boolean): void {
    this.isAuthenticatedSubject.next(value);
  }

  public setInitialized(value: boolean): void {
    this.initializedSubject.next(value);
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

  public reset(): void {
    this.clearToken();
    this.setInitialized(false);
    this.checkInitialAuth().then(r => console.log(r));
  }
}
