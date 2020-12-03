import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DatosLogin } from '../ident/models/datosLogin';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  updatePerfilUrl = "/api/usuario/updateUser";

  constructor(private http: HttpClient) { }

  updateUser(datos: DatosLogin): Observable<DatosLogin>{
    return this.http.post<DatosLogin>(environment.apiUrl+this.updatePerfilUrl, datos);
  }


}
