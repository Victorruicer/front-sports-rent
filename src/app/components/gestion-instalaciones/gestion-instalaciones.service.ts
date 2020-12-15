import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HorarioModel } from '../gestion-horarios/models/HorarioModel';
import { InstalacionModel } from './models/InstalacionModel';
import { AppState } from '../../app.reducer';
import { GestionHorariosService } from '../gestion-horarios/gestion-horarios.service';


@Injectable({
  providedIn: 'root'
})
export class GestionInstalacionesService {

  private listUrl = "/api/instalacion/listInst";
  private deleteUrl = "/api/instalacion/deleteInst";
  private updateUrl = "/api/instalacion/updateInst";
  private createUrl = "/api/instalacion/createInst";
  private listHorariosUrl = "/api/horario/listHorarios";

  horarios: HorarioModel[] = [];
  lista: InstalacionModel[] = [];
  private actualizarFormulario = new BehaviorSubject<InstalacionModel>({} as any);

  constructor(private http: HttpClient, private store: Store<AppState>, private gestionhorariosservice: GestionHorariosService) {
/*     this.store.select('horario').subscribe(
      horarios => {
        this.horarios = horarios.horario
      }) */
      this.gestionhorariosservice.getHorarios().subscribe(horarios => { this.horarios = horarios})
   }

  getListaInstalaciones(){
    console.log('horarios' + this.horarios)
    this.lista = [];
    console.log('lista' + this.lista)

    this.http.get<InstalacionModel[]>(environment.apiUrl + this.listUrl).toPromise().then(data => {
      data.map(instalacion => {
        var instTemp = {...instalacion}
        for(let horario of this.horarios){
          if(instTemp.Id_horario == horario.Id_horario){
            instTemp.Horario = horario.Horario
          }
        }
        this.lista.push(instTemp)
      })

    });
  }

  getInstalaciones(){
    return this.http.get<InstalacionModel[]>(environment.apiUrl + this.listUrl);
  }

  borrarInstalacion(id: number): Observable<InstalacionModel>{
    const InstalacionID = { ID_Instalacion: id };
    return this.http.post<InstalacionModel>(environment.apiUrl + this.deleteUrl, InstalacionID);
  }

  crearInstalacion(instalacionData: InstalacionModel): Observable<InstalacionModel>{
    return this.http.post<InstalacionModel>(environment.apiUrl + this.createUrl, instalacionData);
  }

  actualizarInstalacion(instalacion: InstalacionModel): Observable<InstalacionModel>{
    return this.http.post<InstalacionModel>(environment.apiUrl + this.updateUrl, instalacion);
  }

  getHorarios(){
    return this.http.get<HorarioModel[]>(environment.apiUrl + this.listHorariosUrl);
  }


  //Actualizar formulario
  actualizar(instalacion: InstalacionModel){
    this.actualizarFormulario.next(instalacion);
  }
  obtenerInstalacion$(): Observable<InstalacionModel>{
    return this.actualizarFormulario.asObservable();
  }
}
