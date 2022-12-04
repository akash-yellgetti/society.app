import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { MainComponent } from './main/main.component';
import { UserComponent } from '../user/user.component';
import { CommonComponent } from '../admin/common/common.component';
import { PaymentComponent } from '../admin/payment/payment.component';



const routes: Routes = [
    { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
    {
        path: 'auth',
        component: AuthComponent,
        loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'main',
        component: MainComponent,
        children: [
            {
                path: 'society',
                loadChildren: () => import('../society/society.module').then(m => m.SocietyModule)
            },
            {
                path: 'user',
                component: UserComponent,
                loadChildren: () => import('../user/user.module').then(m => m.UserModule)
            },
            {
                path: 'maintenance',
                loadChildren: () => import('../maintenance/maintenance.module').then(m => m.MaintenanceModule)
            },
            {
                path: 'payment',
                component: PaymentComponent
            },
            {
                path: 'form-builder',
                loadChildren: () => import('../form-builder/form-builder.module').then(m => m.FormBuilderModule)
            },
            {
                path: ':_module/:_sub_module',
                component: CommonComponent
            },
        ]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
