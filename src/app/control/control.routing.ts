import { Routes } from '@angular/router';

import { ProductosComponent } from './productos/productos.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

export const ControlRoutes: Routes = [
    {
      path: '',
    children: [ {
      path: 'productos',
      component: ProductosComponent
    },
    {
      path: 'categorias',
      component: CategoriasComponent
    },
    {
      path: 'usuarios',
      component: UsuariosComponent
    }]}
];
