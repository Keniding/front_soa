// src/app/features/admin/admin.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { HeaderComponent } from "../../shared/components/header/header.component";
import {AdminLayoutComponent} from "./layout/admin-layout.component";
import {FooterComponent} from "../../shared/components/footer/footer.component";

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FooterComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class AdminModule { }
