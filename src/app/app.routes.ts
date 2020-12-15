import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from './components/shared/home/home.component';
import { AuthServiceCanloadGuard } from './components/auth/auth-service-canload.guard';
import { Perfil } from "./components/ident/models/Perfil";
import { AuthServiceCanActivateGuard } from "./components/auth/auth-service-canactivate.guard";

const APP_ROUTES: Routes = [
    { path: 'home', component: HomeComponent},

    { path: 'ident', loadChildren: () => import('./components/ident/ident.module').then(m => m.IdentModule) },

    { path: 'perfil', loadChildren: () => import('./components/perfil/perfil.module').then(m => m.PerfilModule) },

    { path: 'instalaciones', loadChildren: () => import('./components/instalaciones/instalaciones.module').then(m => m.InstalacionesModule), },

    { path: 'gestionUsuarios', loadChildren: () => import('./components/gestion-usuarios/gestion-usuarios.module').then(m => m.GestionUsuariosModule),
     canLoad: [AuthServiceCanloadGuard],
     canActivate: [AuthServiceCanActivateGuard],
     data: { perfiles: [Perfil.administrador] } },

    { path: 'gestionInstalaciones', loadChildren: () => import('./components/gestion-instalaciones/gestion-instalaciones.module').then(m => m.GestionInstalacionesModule),
     canLoad: [AuthServiceCanloadGuard],
     canActivate: [AuthServiceCanActivateGuard],
     data: { perfiles: [Perfil.administrador] } },

    { path: 'gestionPistas', loadChildren: () => import('./components/gestion-pistas/gestion-pistas.module').then(m => m.GestionPistasModule),
     canLoad: [AuthServiceCanloadGuard],
     canActivate: [AuthServiceCanActivateGuard],
     data: { perfiles: [Perfil.administrador] } },

    { path: 'gestionTarifas', loadChildren: () => import('./components/gestion-tarifas/gestion-tarifas.module').then(m => m.GestionTarifasModule),
     canLoad: [AuthServiceCanloadGuard],
     canActivate: [AuthServiceCanActivateGuard],
     data: { perfiles: [Perfil.administrador] } },

    { path: 'gestionHorarios', loadChildren: () => import('./components/gestion-horarios/gestion-horarios.module').then(m => m.GestionHorariosModule),
     canLoad: [AuthServiceCanloadGuard],
     canActivate: [AuthServiceCanActivateGuard],
     data: { perfiles: [Perfil.administrador] } },

    { path: 'gestionActividades', loadChildren: () => import('./components/gestion-actividades/gestion-actividades.module').then(m => m.GestionActividadesModule),
     canLoad: [AuthServiceCanloadGuard],
     canActivate: [AuthServiceCanActivateGuard],
     data: { perfiles: [Perfil.administrador] } },

    { path: 'listadoReservas', loadChildren: () => import('./components/listado-reservas/listado-reservas.module').then(m => m.ListadoReservasModule),
     canLoad: [AuthServiceCanloadGuard],
     canActivate: [AuthServiceCanActivateGuard],
     data: { perfiles: [Perfil.administrador] } },

    { path: 'reservas', loadChildren: () => import('./components/reservas/reservas.module').then(m => m.ReservasModule),
     canLoad: [AuthServiceCanloadGuard],
     canActivate: [AuthServiceCanActivateGuard],
    data: { perfiles: [Perfil.usuario, Perfil.gestor] }
    },

    { path: 'gestionPago', loadChildren: () => import('./components/gestion-pago/gestion-pago.module').then(m => m.GestionPagoModule) },

    { path: '**', pathMatch: 'full', redirectTo: 'home'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
