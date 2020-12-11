//Rutas
import { GESTION_HORARIOS_ROUTING } from './gestion-horarios.routes';

//@Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//Componentes
import { GestionHorariosComponent } from './gestion-horarios.component';
import { CrearHorarioComponent } from './crear-horario/crear-horario.component';
import { ListaHorariosComponent } from './lista-horarios/lista-horarios.component';

@NgModule({
  declarations: [
    GestionHorariosComponent,
    CrearHorarioComponent,
    ListaHorariosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    GESTION_HORARIOS_ROUTING
  ],
  providers: [

  ]
})
export class GestionHorariosModule { }
