//Rutas
import { PERFIL_ROUTING } from './perfil.routes';

//@Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//Components
import { PerfilComponent } from './perfil.component';
import { ActivosAlquilerComponent } from './activos-alquiler/activos-alquiler.component';
import { HistorialAlquilerComponent } from './historial-alquiler/historial-alquiler.component';
import { PerfilService } from './perfil.service';
import { DatosComponent } from './datos/datos.component';
import { PassComponent } from './pass/pass.component';


@NgModule({
  declarations: [
    PerfilComponent,
    HistorialAlquilerComponent,
    ActivosAlquilerComponent,
    DatosComponent,
    PassComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PERFIL_ROUTING
  ],
  providers: [PerfilService]
})
export class PerfilModule { }
