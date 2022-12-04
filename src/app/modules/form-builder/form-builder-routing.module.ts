import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuilderComponent } from './builder/builder.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  // {
  //   path: 'form',
  //   component: FormComponent
  // },
  {
      path: 'builder',
      component: BuilderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormBuilderRoutingModule { }
