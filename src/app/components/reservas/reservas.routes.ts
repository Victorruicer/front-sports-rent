import { RouterModule, Routes } from '@angular/router';
import { ConfirmacionComponent } from './confirmacion/confirmacion.component';
import { ReservasComponent } from './reservas.component';


const RESERVAS_ROUTES: Routes = [
    { path: '', component: ReservasComponent },
    { path: 'confirmacion', component: ConfirmacionComponent },

];

export const RESERVAS_ROUTING = RouterModule.forChild(RESERVAS_ROUTES);
