import { GestionTarifasComponent } from './gestion-tarifas.component';
import { Routes, RouterModule } from '@angular/router';


const GESTION_TARIFAS_ROUTES: Routes = [
    { path: '', component: GestionTarifasComponent},
    
];

export const GESTION_TARIFAS_ROUTING = RouterModule.forChild(GESTION_TARIFAS_ROUTES);