import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonComponent } from '../admin/common/common.component';
import { MaintenanceGenerateComponent } from './maintenance-generate/maintenance-generate.component';
import { MaintenanceTemplateComponent } from './maintenance-template/maintenance-template.component';

const routes: Routes = [
  {
    path: 'maintenance-template',
    component: MaintenanceTemplateComponent
  },
  {
    path: 'maintenance-generate',
    component: MaintenanceGenerateComponent
  },
  {
    path: ':_sub_module',
    component: CommonComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenanceRoutingModule { }
