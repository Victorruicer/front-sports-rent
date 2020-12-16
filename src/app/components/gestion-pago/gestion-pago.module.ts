import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumenComponent } from './resumen/resumen.component';
import { GESTION_PAGO_ROUTING } from './gestion-pago.routes';
import { GestionPagoComponent } from './gestion-pago.component';
import { TokenComponent } from './token/token.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxStripeModule } from 'ngx-stripe';
import { SuccessComponent } from './success/success.component';
import { FailureComponent } from './failure/failure.component';
import { ProductComponent } from './product/product.component';


@NgModule({
  declarations: [
    TokenComponent,
    GestionPagoComponent,
    ResumenComponent,
    SuccessComponent,
    FailureComponent,
    ProductComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgxStripeModule.forRoot('pk_test_51Hyg3jC5SO2pUrdtEB4x6UN0ntTrIVnFUO3iMwJHJf0OJoMHE5nucqzymOF8j28X6XLMaaEbijgbj0Md448JAtLR00xBVZlnqU'),
    GESTION_PAGO_ROUTING
  ]
})
export class GestionPagoModule { }
