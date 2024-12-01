import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProyectoComponent} from "./project.component";

const routes: Routes = [
  {
    path: '',
    component: ProyectoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
