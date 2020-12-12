import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ActividadModel } from './models/actividadModel';

@Injectable({
  providedIn: 'root'
})
export class GestionActividadesService {

  private listUrl = "/api/actividad/listActividades";
  private deleteUrl = "/api/actividad/deleteActividad";
  private updateUrl = "/api/actividad/updateActividad";
  private createUrl = "/api/actividad/createActividad";

  lista: ActividadModel[] = [];
  private actualizarFormulario = new BehaviorSubject<ActividadModel>({} as any);

  constructor(private http: HttpClient) { }

  getListaActividades(){
    this.http.get<ActividadModel[]>(environment.apiUrl + this.listUrl).toPromise().then(data => {this.lista = data as ActividadModel[]});
  }

  getActividades(){
    return this.http.get<ActividadModel[]>(environment.apiUrl + this.listUrl);
  }

  borrarActividad(id: number): Observable<ActividadModel>{
    const actividadID = { ID_actividad: id };
    return this.http.post<ActividadModel>(environment.apiUrl + this.deleteUrl, actividadID);
  }

  crearActividad(actividadData: ActividadModel): Observable<ActividadModel>{
    return this.http.post<ActividadModel>(environment.apiUrl + this.createUrl, actividadData);
  }

  actualizarActividad(actividad: ActividadModel): Observable<ActividadModel>{
    return this.http.post<ActividadModel>(environment.apiUrl + this.updateUrl, actividad);
  }


  //Actualizar formulario
  actualizar(actividad: ActividadModel){
    this.actualizarFormulario.next(actividad);
  }
  obtenerActividad$(): Observable<ActividadModel>{
    return this.actualizarFormulario.asObservable();
  }
}