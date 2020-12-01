import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DatosLogin } from '../ident/models/datosLogin';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: Observable<DatosLogin>;
  private userSubject: BehaviorSubject<DatosLogin>;

 constructor(private http: HttpClient,
             private router: Router,
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
        //this.store.dispatch(new LoginSuccess({token: data['Token'], email: data['Email']}));
        this.userSubject.next(data);
      }else{
        data["mensaje"] = "Error en las credenciales;";
        //this.store.dispatch(new LoginFailure({message: data["mensaje"]}));

      }
      return data;
      }));
  }

    registro(datosRegistro: DatosLogin): Observable<any> {
    const url = `${environment.apiUrl}/api/usuario/registro`;
    return this.http.post(url, datosRegistro).pipe(map(data => {
      console.log("datos recibidos: "+ data['nombre']);
      return data;
      }));
  }

  logout(){
    localStorage.removeItem('currentUser');
    console.log("se han limpiado los datos del user: " );
    //this.store.dispatch(new Logout());
    this.userSubject.next(null);
    this.router.navigate(['/home']);
  }

}
