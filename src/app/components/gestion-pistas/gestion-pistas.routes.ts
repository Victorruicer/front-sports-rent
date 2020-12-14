import { GestionPistasComponent } from './gestion-pistas.component';
import { Routes, RouterModule } from '@angular/router';


const GESTION_PISTAS_ROUTES: Routes = [
    { path: '', component: GestionPistasComponent},
    
];

export const GESTION_PISTAS_ROUTING = RouterModule.forChild(GESTION_PISTAS_ROUTES);