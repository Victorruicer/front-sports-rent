import { GestionHorariosComponent } from './gestion-horarios.component';
import { Routes, RouterModule } from '@angular/router';


const GESTION_HORARIOS_ROUTES: Routes = [
    { path: '', component: GestionHorariosComponent},
    
];

export const GESTION_HORARIOS_ROUTING = RouterModule.forChild(GESTION_HORARIOS_ROUTES);