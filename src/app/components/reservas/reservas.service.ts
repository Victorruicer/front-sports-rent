import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActividadModel } from './models/actividadModel';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  getActividadesUrl = "/api/actividad/listActividades";

  constructor(private http: HttpClient) { }

  getActividades(): Observable<ActividadModel[]>{
    return this.http.get<ActividadModel[]>(environment.apiUrl + this.getActividadesUrl);
  }

}
