import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from './components/shared/home/home.component';

const APP_ROUTES: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'ident', loadChildren: () => import('./components/ident/ident.module').then(m => m.IdentModule) },
    { path: 'perfil', loadChildren: () => import('./components/perfil/perfil.module').then(m => m.PerfilModule) },
    { path: 'instalaciones', loadChildren: () => import('./components/instalaciones/instalaciones.module').then(m => m.InstalacionesModule) },
    { path: 'gestionUsuarios', loadChildren: () => import('./components/gestion-usuarios/gestion-usuarios.module').then(m => m.GestionUsuariosModule) },
    { path: 'gestionInstalaciones', loadChildren: () => import('./components/gestion-instalaciones/gestion-instalaciones.module').then(m => m.GestionInstalacionesModule) },
    { path: 'gestionTarifas', loadChildren: () => import('./components/gestion-tarifas/gestion-tarifas.module').then(m => m.GestionTarifasModule) },
    { path: 'gestionHorarios', loadChildren: () => import('./components/gestion-horarios/gestion-horarios.module').then(m => m.GestionHorariosModule) },
    { path: 'listadoReservas', loadChildren: () => import('./components/listado-reservas/listado-reservas.module').then(m => m.ListadoReservasModule) },

    { path: 'reservas', loadChildren: () => import('./components/reservas/reservas.module').then(m => m.ReservasModule) },

    { path: '**', pathMatch: 'full', redirectTo: 'home'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
