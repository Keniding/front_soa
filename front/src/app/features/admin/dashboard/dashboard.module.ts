// src/app/features/admin/dashboard/dashboard.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SidebarModule } from '../../../shared/components/sidebar/sidebar.module';
import { AdminModule } from "../admin.module";
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    DashboardRoutingModule,
    SidebarModule,
    AdminModule,
  ]
})
export class DashboardModule { }
