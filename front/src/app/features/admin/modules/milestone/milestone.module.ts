import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MilestoneRoutingModule } from './milestone-routing.module';
import { MilestoneComponent } from './milestone.component';

@NgModule({
  declarations: [
    MilestoneComponent
  ],
  imports: [
    CommonModule,
    MilestoneRoutingModule
  ]
})
export class MilestoneModule { }
