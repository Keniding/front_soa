import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import {HeaderComponent} from "../../shared/components/header/header.component";
import {SidebarModule} from "../../shared/components/sidebar/sidebar.module";

@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SidebarModule
  ],
  exports: [
    HeaderComponent,
  ]
})
export class AdminModule { }
