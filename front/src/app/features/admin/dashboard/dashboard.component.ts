// src/app/features/admin/dashboard/dashboard.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ViewService } from "../../../core/services/utils/view/view.service";
import { Router, NavigationEnd, Event } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  currentView: string = 'activities';
  private destroy$ = new Subject<void>();

  constructor(
    private viewService: ViewService,
    private router: Router
  ) {}

  ngOnInit() {
    this.viewService.currentView$
      .pipe(takeUntil(this.destroy$))
      .subscribe(view => {
        this.currentView = view;
        this.updateView();
      });

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((event) => {
        const urlParts = event.url.split('/');
        const viewId = urlParts[urlParts.length - 1];
        if (this.currentView !== viewId) {
          this.viewService.changeView(viewId);
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateView() {
    console.log('Vista actual:', this.currentView);
  }
}
