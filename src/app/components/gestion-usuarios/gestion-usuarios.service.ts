import { UserModel } from './models/UserModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class GestionUsuariosService {

  private listUrl = "/api/usuario/listUsers";
  private deleteUrl = "/api/usuario/deleteUser";
  private updateUrl = "/api/usuario/updateUser";
  private createUrl = "/api/usuario/createUser";

  lista: UserModel[] = [];
  private actualizarFormulario = new BehaviorSubject<UserModel>({} as any);

  constructor(private http: HttpClient) { }

  getListaUsuarios(){
    this.http.get<UserModel[]>(environment.apiUrl + this.listUrl).toPromise().then(data => {this.lista = data as UserModel[]});
  }

  getUsuarios(){
    return this.http.get<UserModel[]>(environment.apiUrl + this.listUrl);
  }

  borrarUsuario(id: number): Observable<UserModel>{
    const userID = {
      ID_Usuario: id
    };
    return this.http.post<UserModel>(environment.apiUrl + this.deleteUrl, userID);
  }

  crearUsuario(userData: UserModel): Observable<UserModel>{
    return this.http.post<UserModel>(environment.apiUrl + this.createUrl, userData);
  }

  actualizarUsuario(user: UserModel): Observable<UserModel>{
    return this.http.post<UserModel>(environment.apiUrl + this.updateUrl, user);
  }


  //Actualizar formulario
  actualizar(usuario: UserModel){
    this.actualizarFormulario.next(usuario);
  }
  obtenerUsuario$(): Observable<UserModel>{
    return this.actualizarFormulario.asObservable();
  }
}
