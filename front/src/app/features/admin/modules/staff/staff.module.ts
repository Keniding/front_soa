import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffRoutingModule } from './staff-routing.module';
import {StaffComponent} from "./staff.component";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    StaffComponent
  ],
  imports: [
    CommonModule,
    StaffRoutingModule,
    FormsModule
  ]
})
export class StaffModule { }
