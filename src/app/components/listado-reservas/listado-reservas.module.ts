//Rutas
import { LISTADO_RESERVAS_ROUTING } from './listado-reservas.routes';

//@Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//Componentes
import { ListadoReservasComponent } from './listado-reservas.component';

@NgModule({
  declarations: [
    ListadoReservasComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LISTADO_RESERVAS_ROUTING
  ],
  providers: [

  ]
})
export class ListadoReservasModule { }
