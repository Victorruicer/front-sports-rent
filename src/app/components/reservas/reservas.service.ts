import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActividadModel } from '../gestion-actividades/models/actividadModel';
import { environment } from '../../../environments/environment';
import { PistaReservaModel } from './models/pistaReservaModel';


@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  getActividadesUrl = "/api/actividad/listActividades";
  getPistaReservaUrl = "/api/pista/pistasReserva";

  constructor(private http: HttpClient) { }

  getActividades(): Observable<ActividadModel[]>{
    return this.http.get<ActividadModel[]>(environment.apiUrl + this.getActividadesUrl);
  }

  getPistasReserva(actividad: string, fecha: string):Observable<PistaReservaModel[]>{
    return this.http.post<PistaReservaModel[]>(environment.apiUrl + this.getPistaReservaUrl, {Actividad: actividad, Fecha: fecha});
  }

}
