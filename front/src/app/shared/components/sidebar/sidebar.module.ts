// src/app/shared/components/sidebar/sidebar.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import {SidebarRoutingModule} from "./sidebar-routing.module";

@NgModule({
  declarations: [
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SidebarRoutingModule,
  ],
  exports: [SidebarComponent]
})
export class SidebarModule { }
