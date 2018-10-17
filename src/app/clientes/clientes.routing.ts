import { Routes } from '@angular/router';

import { ListadoComponent } from './listado/listado.component';
import { TimeLineComponent } from './timeline/timeline.component';


export const ClientesRoutes: Routes = [
    {
      path: '',
      children: [ {
        path: 'timeline',
        component: TimeLineComponent
    }]}, {
    path: '',
    children: [ {
      path: 'listado',
      component: ListadoComponent
    }]}
];
