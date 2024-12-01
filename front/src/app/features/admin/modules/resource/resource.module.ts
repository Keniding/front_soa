import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResourceRoutingModule } from './resource-routing.module';
import {ResourceComponent} from "./resource.component";


@NgModule({
  declarations: [
    ResourceComponent
  ],
  imports: [
    CommonModule,
    ResourceRoutingModule
  ]
})
export class ResourceModule { }
