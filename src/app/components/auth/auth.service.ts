import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DatosLogin } from '../ident/models/datosLogin';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { LoginFailure, LoginSuccess, Logout } from '../ident/redux/store/login.actions';
import { InicializaUsers } from '../gestion-usuarios/redux/store/usuario.actions';
import { RegistroSuccess, RegistroFailure } from '../ident/redux/store/registro.actions';
import { ToastrService } from 'ngx-toastr';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: Observable<DatosLogin>;
  private userSubject: BehaviorSubject<DatosLogin>;

 constructor(private http: HttpClient,
             private router: Router,
             private store: Store<AppState>,
             ) {
    this.userSubject = new BehaviorSubject<DatosLogin>(JSON.parse(localStorage.getItem('currentUser')));
    this.user = this.userSubject.asObservable();
  }

    comprobarLogin(datoslogin: DatosLogin): Observable<any> {
    const url = `${environment.apiUrl}/api/usuario/login`;
    return this.http.post(url, datoslogin).pipe(map(data => {
      console.log("datos recibidos: "+ data['Token']);
      if(data['Token'] != null && data['Id_Usuario'] > 0){
        //creamos datos user en localstorage
        localStorage.setItem('currentUser', JSON.stringify(data));
        //lanzamos accion de login correcto
        this.store.dispatch(new LoginSuccess({token: data['Token'], email: data['Email']}));
        this.userSubject.next(data);
      }else{
        //data["mensaje"] = "Error en las credenciales;";
        this.store.dispatch(new LoginFailure({message: data["mensaje"]}));
      }
      return data;
      }));
  }

    registro(datosRegistro: DatosLogin): Observable<any> {
    const url = `${environment.apiUrl}/api/usuario/registro`;
    return this.http.post(url, datosRegistro).pipe(map(data => {
      if(data['Retcode'] === 0){
        this.store.dispatch(new RegistroSuccess({Nombre: data['Nombre'], Apellido1: data['Apellido1'], Email: data['Email']}));
      }else{
        this.store.dispatch(new RegistroFailure({message: data["Mensaje"]}));
      }
      return data;
      }));
  }

  logout(){
    localStorage.removeItem('currentUser');
    console.log("se han limpiado los datos del user: " );
    //reseteamos datos
    this.store.dispatch(new Logout());
    this.store.dispatch(new InicializaUsers());
    this.userSubject.next(null);
    this.router.navigate(['/home']);
  }

}
