import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';
import { NouisliderModule } from 'ng2-nouislider';
import { TagInputModule } from 'ngx-chips';

import { ListadoComponent } from './listado/listado.component';
import { TimeLineComponent } from './timeline/timeline.component';
import { ClientesRoutes } from './clientes.routing';
import { FieldErrorDisplayComponent } from './timeline/field-error-display/field-error-display.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ClientesRoutes),
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    NouisliderModule,
    TagInputModule,
    MaterialModule
  ],
  declarations: [
      ListadoComponent,
      TimeLineComponent,
      FieldErrorDisplayComponent
  ]
})

export class ClientesModule {}
