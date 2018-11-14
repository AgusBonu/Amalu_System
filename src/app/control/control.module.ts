import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';
import { NouisliderModule } from 'ng2-nouislider';
import { TagInputModule } from 'ngx-chips';

import { ControlRoutes } from './control.routing';
import { ProductosComponent } from './productos/productos.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

import { NuevaCategoriaComponent } from './nuevacategoria/nuevacategoria.component';
import { NuevoProductoComponent } from './nuevoproducto/nuevoproducto.component';
import { NuevoUsuarioComponent } from './nuevousuario/nuevousuario.component';

import { ListadoComponent } from './listadoproducto/listadoproducto.component';
import { ListadoCategoriaComponent } from './listadocategoria/listadocategoria.component';
import { ListadoUsuarioComponent } from './listadousuario/listadousuario.component';



import { FieldErrorDisplayComponent } from './field-error-display/field-error-display.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ControlRoutes),
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    NouisliderModule,
    TagInputModule,
    MaterialModule
  ],
  declarations: [
    ListadoComponent,
    FieldErrorDisplayComponent,
    ProductosComponent,
    NuevoProductoComponent,
    CategoriasComponent,
    NuevaCategoriaComponent,
    ListadoCategoriaComponent,
    ListadoUsuarioComponent,
    NuevoUsuarioComponent,
    UsuariosComponent
  ]
})

export class ControlModule {}
