import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ReservaModel } from './model/reservaModel';

@Injectable({
  providedIn: 'root'
})
export class ListadoReservasService {

  historicoUrl = "/api/reserva/historico";
  deleteUrl = "/api/reserva/deleteReserva";
  lista: ReservaModel[] = [];

  constructor(private http: HttpClient) { }

  historicoReservas(){
    this.http.post<ReservaModel[]>(environment.apiUrl+this.historicoUrl, {Email: "todos", Estado: "en reserva"}).toPromise().then(data => {this.lista = data as ReservaModel[]});
  }

  borrarReserva(id: number): Observable<ReservaModel>{
    const reservaID = { ID_Reserva: id };
    return this.http.post<ReservaModel>(environment.apiUrl + this.deleteUrl, reservaID);
  }

}
