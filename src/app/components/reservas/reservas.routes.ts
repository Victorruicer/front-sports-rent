import { RouterModule, Routes } from '@angular/router';
import { ReservasComponent } from './reservas.component';


const RESERVAS_ROUTES: Routes = [
    { path: '', component: ReservasComponent },

];

export const RESERVAS_ROUTING = RouterModule.forChild(RESERVAS_ROUTES);
