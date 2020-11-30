
import { Routes, RouterModule } from '@angular/router';
import { IdentComponent } from './ident.component';


const IDENT_ROUTES: Routes = [
    { path: '', component: IdentComponent },
    
];

export const IDENT_ROUTING = RouterModule.forChild(IDENT_ROUTES);