//Rutas
import { GESTION_USUARIOS_ROUTING } from './gestion-usuarios.routes';

//@Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//Componentes
import { GestionUsuariosComponent } from './gestion-usuarios.component';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';

@NgModule({
  declarations: [
    GestionUsuariosComponent,
    CrearUsuarioComponent,
    ListaUsuariosComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    GESTION_USUARIOS_ROUTING
  ],
  providers: [

  ]
})
export class GestionUsuariosModule { }
