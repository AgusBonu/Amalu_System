import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { AuthGuard } from './auth.guard';

export const AppRoutes: Routes = [
    {
      path: '',
      redirectTo: 'inicio',
      pathMatch: 'full',
    }, {
      path: '',
      component: AdminLayoutComponent,
      children: [
          {
        path: '',
        loadChildren: './inicio/inicio.module#InicioModule',
        canActivate: [AuthGuard]
    },{
        path: 'control',
        loadChildren: './control/control.module#ControlModule',
        canActivate: [AuthGuard]
    }, {
        path: 'clientes',
        loadChildren: './clientes/clientes.module#ClientesModule'
    }, {
        path: 'charts',
        loadChildren: './charts/charts.module#ChartsModule'
    }, {
        path: '',
        loadChildren: './userpage/user.module#UserModule'
    }
  ]}, {
      path: '',
      component: AuthLayoutComponent,
      children: [{
        path: 'pages',
        loadChildren: './pages/pages.module#PagesModule'
      }]
    }
];
