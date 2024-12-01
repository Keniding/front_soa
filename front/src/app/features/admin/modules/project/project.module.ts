import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import {ProyectoComponent} from "./project.component";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ProyectoComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    FormsModule
  ]
})
export class ProjectModule { }
