import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from 'src/app/material.module';
import { LayoutRoutingModule } from './layout-routhing.module';
import { MainComponent } from './main/main.component';
import { AuthComponent } from './auth/auth.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AdminModule } from '../admin/admin.module';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SidenavComponent } from './shared/sidenav/sidenav.component';
import { SidenavMenuComponent } from './shared/sidenav-menu/sidenav-menu.component';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';
import { SidenavChatComponent } from './shared/sidenav-chat/sidenav-chat.component';



@NgModule({
  declarations: [MainComponent, AuthComponent, BreadcrumbComponent, HeaderComponent, FooterComponent, SidenavComponent, SidenavMenuComponent, SidenavChatComponent],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    MaterialModule,
    LayoutRoutingModule,
    AdminModule,
    NgbDropdownModule,
    NgbCollapseModule
  ]
})
export class LayoutModule { }
