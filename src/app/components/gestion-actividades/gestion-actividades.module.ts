import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
    CommonModule
  ]
})
export class GestionActividadesModule { }
