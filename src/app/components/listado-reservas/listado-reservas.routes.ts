import { ListadoReservasComponent } from './listado-reservas.component';
import { Routes, RouterModule } from '@angular/router';


const LISTADO_RESERVAS_ROUTES: Routes = [
    { path: '', component: ListadoReservasComponent},
    
];

export const LISTADO_RESERVAS_ROUTING = RouterModule.forChild(LISTADO_RESERVAS_ROUTES);