import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../md/md.module';
import { MaterialModule } from '../app.module';

import { InicioComponent } from './inicio.component';
import { InicioRoutes } from './inicio.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(InicioRoutes),
        FormsModule,
        MdModule,
        MaterialModule
    ],
    declarations: [InicioComponent]
})

export class InicioModule {}
