import { Injectable } from '@angular/core';
import { CanLoad, Route, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DatosLogin } from '../ident/models/datosLogin';
import { AppState } from '../../app.reducer';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceCanloadGuard implements CanLoad {

  user: DatosLogin = null;
   isAuthenticated: boolean = false;

  constructor(private router: Router, private store: Store<AppState>, private toastr: ToastrService){
    this.store.select('login').subscribe(
      login => {
        this.isAuthenticated = login.isAuthenticated
        if(this.isAuthenticated){
          this.user = login.user
        }
      })
  }

  canLoad(route: Route ){
      //var user = JSON.parse(sessionStorage.getItem('login'));
      if (this.isAuthenticated && this.user.Token != null) {
        console.log("Comprobando Admin...");
          let url: string = route.path;
          console.log('Url: '+ url + ' perfil = ' + this.user.Id_Perfil);

          switch(url){
            case "gestionUsuarios":
              if(this.user.Id_Perfil != 1){
                console.log("no tiene permiso");
                setTimeout(() => {this.toastr.warning("acceso restringido a este contenido CL")}, 100);
                this.router.navigate(['/home']);
                return false;
              }
              break;
            default:
              return true;
          }
        return true;
      }
    // Si no se logeado se redirecciona
    setTimeout(() => {this.toastr.warning("Debes iniciar sesión para acceder al contenido CL")}, 100);

    console.log("no hay usuario logado canLoad");
    this.router.navigate(['/login']);
    return false;
  }

}
