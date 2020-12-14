import { RouterModule, Routes } from '@angular/router';
import { GestionPagoComponent } from './gestion-pago.component';
import { ResumenComponent } from './resumen/resumen.component';



const GESTION_PAGO_ROUTES: Routes = [
    { path: '', component: GestionPagoComponent },
    { path: 'resumen', component: ResumenComponent },

];

export const GESTION_PAGO_ROUTING = RouterModule.forChild(GESTION_PAGO_ROUTES);
