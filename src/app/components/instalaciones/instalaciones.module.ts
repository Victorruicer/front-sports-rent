//Rutas
import { INSTALACIONES_ROUTING } from './instalaciones.routes';

//@Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

//Components
import { InstalacionesComponent } from './instalaciones.component';
import { CardInstalacionComponent } from './card-instalacion/card-instalacion.component';


@NgModule({
  declarations: [
      InstalacionesComponent,
      CardInstalacionComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    INSTALACIONES_ROUTING
  ]
})
export class InstalacionesModule { }
