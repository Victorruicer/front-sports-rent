import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { DatosLogin } from '../ident/models/datosLogin';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Logout } from '../ident/redux/store/login.actions';
import { InicializaUsers } from '../gestion-usuarios/redux/store/usuario.actions';
import { InicializaRegistro } from '../ident/redux/store/registro.actions';
import { InicializaPerfil } from '../perfil/redux/store/perfil.actions';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

 constructor(private http: HttpClient,
             private router: Router,
             private store: Store<AppState>,
             ) {}


    comprobarLogin(datoslogin: DatosLogin): Observable<any> {
    const url = `${environment.apiUrl}/api/usuario/login`;
    return this.http.post(url, datoslogin);
  }

    registro(datosRegistro: DatosLogin): Observable<any> {
    const url = `${environment.apiUrl}/api/usuario/registro`;
    return this.http.post(url, datosRegistro);
  }

  logout(){
    localStorage.removeItem('currentUser');
    console.log("se han limpiado los datos del user: " );
    //reseteamos datos
    this.store.dispatch(new Logout());
    this.store.dispatch(new InicializaUsers());
    this.store.dispatch(new InicializaPerfil());
    this.store.dispatch(new InicializaRegistro());
    this.router.navigate(['/home']);
  }

}
