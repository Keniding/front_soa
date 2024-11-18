import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RiskRoutingModule } from './risk-routing.module';
import {NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RiskRoutingModule,
    NgbTooltipModule

  ]
})
export class RiskModule { }
