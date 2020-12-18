import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DatosLogin } from '../ident/models/datosLogin';
import { ReservasUser } from './models/reservasUser';
import { ResetPass } from './models/resetPass';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  updatePerfilUrl = "/api/usuario/updateUser";
  historicoUrl = "/api/reserva/historico";
  deleteUrl = "/api/reserva/deleteReserva";
  cambioPassUrl = "/api/usuario/changePass";

  constructor(private http: HttpClient) { }

  updateUser(datos: DatosLogin): Observable<DatosLogin>{
    return this.http.post<DatosLogin>(environment.apiUrl+this.updatePerfilUrl, datos);
  }

  borrarReserva(id: number): Observable<ReservasUser>{
    const reservaID = { ID_Reserva: id };
    return this.http.post<ReservasUser>(environment.apiUrl + this.deleteUrl, reservaID);
  }

  cambioPassword(datos: ResetPass): Observable<DatosLogin>{
    console.log("OldPass = " + datos.Oldpass);
    return this.http.post<DatosLogin>(environment.apiUrl+this.cambioPassUrl, datos);
  }

  historicoReservas(email: string, estado: string): Observable<ReservasUser[]>{
    return this.http.post<ReservasUser[]>(environment.apiUrl+this.historicoUrl, {email, estado});
  }


}
