//Rutas
import { GESTION_TARIFAS_ROUTING } from './gestion-tarifas.routes';

//@Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//Componentes
import { GestionTarifasComponent } from './gestion-tarifas.component';
import { CrearTarifaComponent } from './crear-tarifa/crear-tarifa.component';
import { ListaTarifasComponent } from './lista-tarifas/lista-tarifas.component';

@NgModule({
  declarations: [
    GestionTarifasComponent,
    CrearTarifaComponent,
    ListaTarifasComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    GESTION_TARIFAS_ROUTING
  ],
  providers: [

  ]
})
export class GestionTarifasModule { }
