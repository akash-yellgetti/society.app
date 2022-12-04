import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FieldBuilderComponent } from './field-builder/field-builder.component';

const routes: Routes = [
  {
    path: 'builder',
    component: FieldBuilderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FieldRoutingModule { }
