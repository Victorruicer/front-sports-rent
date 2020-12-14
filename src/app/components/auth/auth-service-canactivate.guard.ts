import { Injectable } from "@angular/core";

import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from "@ngrx/store";
import { ToastrService } from "ngx-toastr";
import { AppState } from "src/app/app.reducer";
import { DatosLogin } from "../ident/models/datosLogin";


@Injectable()
export class AuthServiceCanActivateGuard implements CanActivate{

  user: DatosLogin = null;
  isAuthenticated: boolean = false;

  constructor(private router:Router, private store: Store<AppState>, private toastr: ToastrService){
    this.store.select('login').subscribe(
      login => {
        this.isAuthenticated = login.isAuthenticated
        if(this.isAuthenticated){
          this.user = login.user
        }
      })
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        if (this.isAuthenticated && this.user.Token != null) {
          console.log("comprobando acceso perfil......."+ this.user.Id_Perfil);
          if(this.user.Id_Perfil != 1){//dejamos pasar siempre al admin
            if(route.data.perfiles && route.data.perfiles.indexOf(this.user.Id_Perfil) === -1){
                //existe restriccion de perfil en la ruta y no coincide con el perfil que intenta acceder
                setTimeout(() => {this.toastr.warning("Acceso restringido a este contenido CA")}, 100);
                this.router.navigate(['/home']);
                //Si no esta autorizado devuelve false
                return false;
            }
          }


            //Si esta autorizado devuelve true
            return true;
        }
        setTimeout(() => {this.toastr.warning("Debes iniciar sesión para acceder al contenido CA")}, 100);

        console.log("no hay usuario logado canActivate");
        this.router.navigate(['/home'], {queryParams: {returnUrl: state.url} });
        return false;
    }
}
