import { RouterModule, Routes } from '@angular/router';
import { FailureComponent } from './failure/failure.component';
import { GestionPagoComponent } from './gestion-pago.component';
import { ProductComponent } from './product/product.component';
import { ResumenComponent } from './resumen/resumen.component';
import { SuccessComponent } from './success/success.component';
import { TokenComponent } from './token/token.component';



const GESTION_PAGO_ROUTES: Routes = [
    { path: '', component: GestionPagoComponent },
    { path: 'resumen', component: ResumenComponent },
    { path: 'token', component: TokenComponent },
{
        path: '',
        component: ProductComponent
      },
      {
        path: 'success',
        component: SuccessComponent
      },
      {
        path: 'failure',
        component: FailureComponent
      },
      {
        path: '**',
        component: ProductComponent
      }
];

export const GESTION_PAGO_ROUTING = RouterModule.forChild(GESTION_PAGO_ROUTES);
