import { UserModel } from './models/UserModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GestionUsuariosService {

  private listurl = "http://localhost:44303/api/usuario/listUser";
  private deleteurl = "http://localhost:44303/api/usuario/deleteUser";
  private updateurl = "http://localhost:44303/api/usuario/updateUser";
  private url = "http://localhost:44303/api/usuario/createUser";

  lista: UserModel[] = [];
  private actualizarFormulario = new BehaviorSubject<UserModel>({} as any);

  constructor(private http: HttpClient) { }

  getListaUsuarios(){
    this.http.get<UserModel[]>(this.listurl).toPromise().then(data => {this.lista = data as UserModel[]});
  }

  borrarUsuario(id: number): Observable<UserModel>{
    const userID = {
      ID_Usuario: id
    };
    return this.http.post<UserModel>(this.deleteurl, userID);
  }

  crearUsuario(userData: UserModel): Observable<UserModel>{
    return this.http.post<UserModel>(this.url, userData);
  }

  actualizarUsuario(user: UserModel): Observable<UserModel>{
    return this.http.post<UserModel>(this.updateurl, user);
  }


  //Actualizar formulario
  actualizar(usuario: UserModel){
    this.actualizarFormulario.next(usuario);
  }
  obtenerUsuario$(): Observable<UserModel>{
    return this.actualizarFormulario.asObservable();
  }
}
