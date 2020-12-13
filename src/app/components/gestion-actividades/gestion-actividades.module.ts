//Rutas
import { GESTION_ACTIVIDADES_ROUTING } from './gestion-actividades.routes';

//@Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//Componentes
import { GestionActividadesComponent } from './gestion-actividades.component';
import { ListaActividadesComponent } from './lista-actividades/lista-actividades.component';
import { CrearActividadComponent } from './crear-actividad/crear-actividad.component';

@NgModule({
  declarations: [
    GestionActividadesComponent, 
    ListaActividadesComponent, 
    CrearActividadComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    GESTION_ACTIVIDADES_ROUTING
  ],
  providers: [

  ]
})
export class GestionActividadesModule { }
