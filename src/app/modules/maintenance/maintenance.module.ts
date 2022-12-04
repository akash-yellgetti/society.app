import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { MaintenanceTemplateComponent } from './maintenance-template/maintenance-template.component';
import { MaterialModule } from '../../material.module';
import { FieldModule } from '../field/field.module';
import { MaintenanceGenerateComponent } from './maintenance-generate/maintenance-generate.component';


@NgModule({
  declarations: [MaintenanceTemplateComponent, MaintenanceGenerateComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FieldModule,
    MaintenanceRoutingModule
  ]
})
export class MaintenanceModule { }
