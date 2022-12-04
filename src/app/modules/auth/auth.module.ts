import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { AuthRoutingModule } from './auth-routhing.module';
import { HttpClientModule } from '@angular/common/http';
import { FieldModule } from '../field/field.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { UserModule } from '../user/user.module';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, ForgotPasswordComponent],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    AuthRoutingModule,
    FieldModule,
    UserModule
  ]
})
export class AuthModule { }
