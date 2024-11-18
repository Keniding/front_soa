// src/app/features/dashboard/dashboard.component.ts
import { Component } from '@angular/core';
import {ViewService} from "../../../core/services/utils/view/view.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  currentView: string = 'dashboard';

  constructor(private viewService: ViewService) {
    this.viewService.currentView$.subscribe(view => {
      this.currentView = view;
    });
  }
}
