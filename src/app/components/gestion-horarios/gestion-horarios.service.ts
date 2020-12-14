import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HorarioModel } from './models/HorarioModel';


@Injectable({
  providedIn: 'root'
})
export class GestionHorariosService {

  private listUrl = "/api/horario/listHorarios";
  private deleteUrl = "/api/horario/deleteHorario";
  private updateUrl = "/api/horario/updateHorario";
  private createUrl = "/api/horario/createHorario";

  lista: HorarioModel[] = [];
  private actualizarFormulario = new BehaviorSubject<HorarioModel>({} as any);

  constructor(private http: HttpClient) { }

  getListaHorarios(){
    this.http.get<HorarioModel[]>(environment.apiUrl + this.listUrl).toPromise().then(data => {this.lista = data as HorarioModel[]});
  }

  getHorarios(){
    return this.http.get<HorarioModel[]>(environment.apiUrl + this.listUrl);
  }

  borrarHorarios(id: number): Observable<HorarioModel>{
    const HorarioID = { ID_horario: id };
    return this.http.post<HorarioModel>(environment.apiUrl + this.deleteUrl, HorarioID);
  }

  crearHorario(horarioData: HorarioModel): Observable<HorarioModel>{
    return this.http.post<HorarioModel>(environment.apiUrl + this.createUrl, horarioData);
  }

  actualizarHorario(horario: HorarioModel): Observable<HorarioModel>{
    return this.http.post<HorarioModel>(environment.apiUrl + this.updateUrl, horario);
  }


  //Actualizar formulario
  actualizar(horario: HorarioModel){
    this.actualizarFormulario.next(horario);
  }
  obtenerHorario$(): Observable<HorarioModel>{
    return this.actualizarFormulario.asObservable();
  }
}
