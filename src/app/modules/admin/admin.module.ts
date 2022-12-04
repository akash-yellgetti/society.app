import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { AdminRoutingModule } from './admin-routing.module';
import { RoleComponent } from './role/role.component';
import { CommonComponent } from './common/common.component';
import { MaterialModule } from 'src/app/material.module';
import { FieldModule } from '../field/field.module';
import { PaymentComponent } from './payment/payment.component';
import { SanitizeHtmlPipe } from '../../core/pipes/sanitize-html/sanitize-html.pipe';
import { PaymentInfoComponent } from './payment-info/payment-info.component';


@NgModule({
  declarations: [RoleComponent, CommonComponent, PaymentComponent, SanitizeHtmlPipe, PaymentInfoComponent],
  imports: [
    CommonModule,
    MaterialModule,
    NgbDropdownModule,
    FieldModule,
    AdminRoutingModule
  ],
  exports: [
    SanitizeHtmlPipe
  ],
  providers: [
    SanitizeHtmlPipe
  ]
})
export class AdminModule { }
