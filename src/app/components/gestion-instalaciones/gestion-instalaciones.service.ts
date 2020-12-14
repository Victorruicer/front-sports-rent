import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HorarioModel } from '../gestion-horarios/models/HorarioModel';
import { InstalacionModel } from './models/InstalacionModel';


@Injectable({
  providedIn: 'root'
})
export class GestionInstalacionesService {

  private listUrl = "/api/instalacion/listInst";
  private deleteUrl = "/api/instalacion/deleteInst";
  private updateUrl = "/api/instalacion/updateInst";
  private createUrl = "/api/instalacion/createInst";
  private listHorariosUrl = "/api/horario/listHorarios";


  lista: InstalacionModel[] = [];
  private actualizarFormulario = new BehaviorSubject<InstalacionModel>({} as any);

  constructor(private http: HttpClient) { }

  getListaInstalaciones(){
    this.http.get<InstalacionModel[]>(environment.apiUrl + this.listUrl).toPromise().then(data => {this.lista = data as InstalacionModel[]});
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
