//Rutas
import { GESTION_PISTAS_ROUTING } from './gestion-pistas.routes';

//@Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//Componentes
import { GestionPistasComponent } from './gestion-pistas.component';
import { CrearPistaComponent } from './crear-pista/crear-pista.component';
import { ListaPistasComponent } from './lista-pistas/lista-pistas.component';

@NgModule({
  declarations: [
      GestionPistasComponent,
      CrearPistaComponent,
      ListaPistasComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    GESTION_PISTAS_ROUTING
  ],
  providers: [

  ]
})
export class GestionPistasModule { }
