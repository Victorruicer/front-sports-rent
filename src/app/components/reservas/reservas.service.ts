import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ActividadModel } from '../gestion-actividades/models/actividadModel';
import { PistaReservaModel } from './models/pistaReservaModel';


@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  getActividadesUrl = "/api/actividad/listActividades";
  getPistaReservaUrl = "/api/pista/pistasReserva";
  createReservaUrl = "/api/reserva/createReserva";
  updateReservaUrl = "/api/reserva/updateReserva";

  constructor(private http: HttpClient) { }

  getActividades(): Observable<ActividadModel[]>{
    return this.http.get<ActividadModel[]>(environment.apiUrl + this.getActividadesUrl);
  }

  getPistasReserva(actividad: string, fecha: string):Observable<PistaReservaModel[]>{
    return this.http.post<PistaReservaModel[]>(environment.apiUrl + this.getPistaReservaUrl, {Actividad: actividad, Fecha: fecha});
  }

  createReserva(reserva: PistaReservaModel):Observable<PistaReservaModel[]>{
    return this.http.post<PistaReservaModel[]>(environment.apiUrl + this.createReservaUrl, reserva);
  }

  updateReserva(reserva: PistaReservaModel):Observable<PistaReservaModel[]>{
    console.log(reserva)
    return this.http.post<PistaReservaModel[]>(environment.apiUrl + this.updateReservaUrl, reserva);
  }

}
