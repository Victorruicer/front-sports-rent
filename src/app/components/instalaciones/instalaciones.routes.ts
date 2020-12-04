
import { Routes, RouterModule } from '@angular/router';
import { InstalacionesComponent } from './instalaciones.component';


const INSTALACIONES_ROUTES: Routes = [
    { path: '', component: InstalacionesComponent },
    
];

export const INSTALACIONES_ROUTING = RouterModule.forChild(INSTALACIONES_ROUTES);