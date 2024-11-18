// app.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthStateService } from './core/services/state/auth-state.service';
import { Router, NavigationEnd } from '@angular/router';
import { Observable, map, filter } from 'rxjs';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  template: `
    <ng-container *ngIf="shouldShowContent$ | async; else loading">
      <router-outlet></router-outlet>
    </ng-container>
    <ng-template #loading>
      <div class="loading-spinner">
        <div class="spinner">Cargando...</div>
      </div>
    </ng-template>
  `,
  styles: [`
    .loading-spinner {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      width: 100vw;
    }
    .spinner {
      padding: 20px;
    }
  `]
})
export class AppComponent implements OnInit {
  shouldShowContent$: Observable<boolean>;

  constructor(
    public authState: AuthStateService,
    private router: Router,
    private titleService: Title) {

    this.titleService.setTitle('Provias+');

    this.shouldShowContent$ = this.authState.initialized$.pipe(
      map(initialized => {
        const isAuthRoute = this.router.url.includes('/auth');
        console.log('Auth State:', {
          initialized,
          currentUrl: this.router.url,
          isAuthRoute,
          shouldShow: initialized || isAuthRoute,
          isAuthenticated: this.authState.getAuthenticationState()
        });
        return initialized || isAuthRoute;
      })
    );
  }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      console.log('Route changed:', {
        currentUrl: this.router.url,
        isAuthenticated: this.authState.getAuthenticationState()
      });
    });
  }
}
