import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from './components/shared/home/home.component';

const APP_ROUTES: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'ident', loadChildren: () => import('./components/ident/ident.module').then(m => m.IdentModule) },
    { path: 'gestionUsuarios', loadChildren: () => import('./components/gestion-usuarios/gestion-usuarios.module').then(m => m.GestionUsuariosModule) },
    { path: 'perfil', loadChildren: () => import('./components/perfil/perfil.module').then(m => m.PerfilModule) },
    { path: 'instalaciones', loadChildren: () => import('./components/instalaciones/instalaciones.module').then(m => m.InstalacionesModule) },
    
    { path: '**', pathMatch: 'full', redirectTo: 'home'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);