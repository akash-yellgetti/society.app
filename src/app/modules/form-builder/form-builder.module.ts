import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilderRoutingModule } from './form-builder-routing.module';
import { BuilderComponent } from './builder/builder.component';
import { FormComponent } from './form/form.component';


@NgModule({
  declarations: [BuilderComponent, FormComponent],
  imports: [
    CommonModule,
    FormBuilderRoutingModule
  ]
})
export class FormBuilderModule { }
