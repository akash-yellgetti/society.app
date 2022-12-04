import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChatComponent } from './chat/chat.component';
import { PaymentComponent } from '../admin/payment/payment.component';
import { CommonComponent } from '../admin/common/common.component';
import { PaymentInfoComponent } from '../admin/payment-info/payment-info.component';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'chat',
    component: ChatComponent
  },
  {
    path: 'payment',
    component: PaymentComponent
  },
  {
    path: 'payment/:order_id',
    component: PaymentInfoComponent
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent
  },
  {
    path: ':_sub_module',
    component: CommonComponent
  },
  // {
  //   path: 'vendor',
  //   component: VendorComponent
  // },
  // {
  //   path: 'vehicle',
  //   component: VehicleComponent
  // },
  // {
  //   path: 'education',
  //   component: EducationComponent
  // },
  // {
  //   path: 'work-experience',
  //   component: WorkExperienceComponent
  // },
  // {
  //   path: 'change-password',
  //   component: ChangePasswordComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
