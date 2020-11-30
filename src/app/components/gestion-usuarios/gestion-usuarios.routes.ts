import { GestionUsuariosComponent } from './gestion-usuarios.component';
import { Routes, RouterModule } from '@angular/router';


const GESTION_USUARIOS_ROUTES: Routes = [
    { path: '', component: GestionUsuariosComponent},
    
];

export const GESTION_USUARIOS_ROUTING = RouterModule.forChild(GESTION_USUARIOS_ROUTES);