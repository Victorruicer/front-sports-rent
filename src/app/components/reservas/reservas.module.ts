import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservasComponent } from './reservas.component';
import { RESERVAS_ROUTING } from './reservas.routes';
import { CardReservaComponent } from './card-reserva/card-reserva.component';
import { SelectorReservaComponent } from './selector-reserva/selector-reserva.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ReservasComponent,
    CardReservaComponent,
    SelectorReservaComponent,
    ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RESERVAS_ROUTING
  ]
})
export class ReservasModule { }
