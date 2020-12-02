import { RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from './perfil.component';

const PERFIL_ROUTES: Routes = [
    { path: '', component: PerfilComponent },
    
];

export const PERFIL_ROUTING = RouterModule.forChild(PERFIL_ROUTES);