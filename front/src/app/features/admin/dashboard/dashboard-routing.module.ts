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
      },
      {
        path: 'posts',
        loadChildren: () => import('../modules/post/post.module')
          .then(m => m.PostModule)
      },
      {
        path: 'resources',
        loadChildren: () => import('../modules/resource/resource.module')
          .then(m => m.ResourceModule)
      },
      {
        path: 'suppliers',
        loadChildren: () => import('../modules/supplier/supplier.module')
          .then(m => m.SupplierModule)
      },
      {
        path: 'staff',
        loadChildren: () => import('../modules/staff/staff.module')
          .then(m => m.StaffModule)
      },
      {
        path: 'users',
        loadChildren: () => import('../modules/user/user.module')
          .then(m => m.UserModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
