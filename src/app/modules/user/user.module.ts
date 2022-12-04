import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { NgbDropdownModule, NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileComponent } from './profile/profile.component';
import { UserRoutingModule } from './user-routhing.module';
import { UserComponent } from './user.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { FieldModule } from '../field/field.module';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [ProfileComponent, UserComponent, ChangePasswordComponent, ChatComponent],
  imports: [
    CommonModule,
    MaterialModule,
    NgbDropdownModule,
    NgbAccordionModule,
    FieldModule,
    UserRoutingModule
  ],
  exports: [ChangePasswordComponent]
})
export class UserModule { }
