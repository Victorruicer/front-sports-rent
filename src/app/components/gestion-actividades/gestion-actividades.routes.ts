import { GestionActividadesComponent } from './gestion-actividades.component';
import { Routes, RouterModule } from '@angular/router';


const GESTION_ACTIVIDADES_ROUTES: Routes = [
    { path: '', component: GestionActividadesComponent},
    
];

export const GESTION_ACTIVIDADES_ROUTING = RouterModule.forChild(GESTION_ACTIVIDADES_ROUTES);