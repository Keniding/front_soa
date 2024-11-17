import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AdminModule } from '../admin.module';
import {SidebarModule} from "../../../shared/components/sidebar/sidebar.module";

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SidebarModule,
    AdminModule
  ]
})
export class DashboardModule { }
