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


@NgModule({
  declarations: [
    PerfilComponent,
    HistorialAlquilerComponent,
    ActivosAlquilerComponent,
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
