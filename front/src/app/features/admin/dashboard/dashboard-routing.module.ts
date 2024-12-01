// src/app/features/admin/dashboard/dashboard-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'activities', pathMatch: 'full' },
      {
        path: 'activities',
        loadChildren: () => import('../modules/activity/activity.module')
          .then(m => m.ActivityModule)
      },
      {
        path: 'categories',
        loadChildren: () => import('../modules/category/category.module')
          .then(m => m.CategoryModule)
      },
      {
        path: 'locations',
        loadChildren: () => import('../modules/location/location.module')
          .then(m => m.LocationModule)
      },
      {
        path: 'risks',
        loadChildren: () => import('../modules/risk/risk.module')
          .then(m => m.RiskModule)
      },
      {
        path: 'milestones',
        loadChildren: () => import('../modules/milestone/milestone.module')
          .then(m => m.MilestoneModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
