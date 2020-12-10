import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DatosLogin } from '../ident/models/datosLogin';
import { ReservasUser } from './models/reservasUser';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  updatePerfilUrl = "/api/usuario/updateUser";
  historicoUrl = "/api/reserva/historico";

  constructor(private http: HttpClient) { }

  updateUser(datos: DatosLogin): Observable<DatosLogin>{
    return this.http.post<DatosLogin>(environment.apiUrl+this.updatePerfilUrl, datos);
  }

  historicoReservas(email: string, estado: string): Observable<ReservasUser[]>{
    return this.http.post<ReservasUser[]>(environment.apiUrl+this.historicoUrl, {email, estado});
  }


}
