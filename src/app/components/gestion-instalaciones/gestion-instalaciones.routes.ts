import { GestionInstalacionesComponent } from './gestion-instalaciones.component';
import { Routes, RouterModule } from '@angular/router';


const GESTION_INSTALACIONES_ROUTES: Routes = [
    { path: '', component: GestionInstalacionesComponent},
    
];

export const GESTION_INSTALACIONES_ROUTING = RouterModule.forChild(GESTION_INSTALACIONES_ROUTES);