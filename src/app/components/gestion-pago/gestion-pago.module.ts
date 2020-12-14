import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumenComponent } from './resumen/resumen.component';
import { GESTION_PAGO_ROUTING } from './gestion-pago.routes';
import { GestionPagoComponent } from './gestion-pago.component';



@NgModule({
  declarations: [
    GestionPagoComponent,
    ResumenComponent
  ],
  imports: [
    CommonModule,
    GESTION_PAGO_ROUTING
  ]
})
export class GestionPagoModule { }
