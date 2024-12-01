import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolRoutingModule } from './rol-routing.module';
import {RolComponent} from "./rol.component";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    RolComponent
  ],
  imports: [
    CommonModule,
    RolRoutingModule,
    FormsModule
  ]
})
export class RolModule { }
