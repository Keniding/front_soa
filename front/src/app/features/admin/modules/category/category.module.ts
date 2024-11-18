// src/app/features/admin/modules/category/category.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryRoutingModule } from './category-routing.module';
import {CategoryComponent} from "./category.component";
import {ObjectidPipe} from "../../../../shared/pipes/objectid.pipe";

@NgModule({
  declarations: [
    CategoryComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    ObjectidPipe
  ]
})
export class CategoryModule { }
