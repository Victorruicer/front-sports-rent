//Rutas
import { GESTION_INSTALACIONES_ROUTING } from './gestion-instalaciones.routes';

//@Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//Componentes
import { GestionInstalacionesComponent } from './gestion-instalaciones.component';
import { CrearInstalacionComponent } from './crear-instalacion/crear-instalacion.component';
import { ListaInstalacionesComponent } from './lista-instalaciones/lista-instalaciones.component';

@NgModule({
  declarations: [
    GestionInstalacionesComponent,
    CrearInstalacionComponent,
    ListaInstalacionesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    GESTION_INSTALACIONES_ROUTING
  ],
  providers: [

  ]
})
export class GestionInstalacionesModule { }
