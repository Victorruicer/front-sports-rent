import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TarifaModel } from './models/TarifaModel';


@Injectable({
  providedIn: 'root'
})
export class GestionTarifasService {

  private listUrl = "/api/tarifa/listTarifas";
  private deleteUrl = "/api/tarifa/deleteTarifa";
  private updateUrl = "/api/tarifa/updateTarifa";
  private createUrl = "/api/tarifa/createTarifa";

  lista: TarifaModel[] = [];
  private actualizarFormulario = new BehaviorSubject<TarifaModel>({} as any);

  constructor(private http: HttpClient) { }

  getListaTarifas(){
    this.http.get<TarifaModel[]>(environment.apiUrl + this.listUrl).toPromise().then(data => {this.lista = data as TarifaModel[]});
  }

  getTarifas(){
    return this.http.get<TarifaModel[]>(environment.apiUrl + this.listUrl);
  }

  borrarTarifa(id: number): Observable<TarifaModel>{
    const tarifaID = { ID_Tarifa: id };
    return this.http.post<TarifaModel>(environment.apiUrl + this.deleteUrl, tarifaID);
  }

  crearTarifa(tarifaData: TarifaModel): Observable<TarifaModel>{
    return this.http.post<TarifaModel>(environment.apiUrl + this.createUrl, tarifaData);
  }

  actualizarTarifa(tarifa: TarifaModel): Observable<TarifaModel>{
    return this.http.post<TarifaModel>(environment.apiUrl + this.updateUrl, tarifa);
  }


  //Actualizar formulario
  actualizar(tarifa: TarifaModel){
    this.actualizarFormulario.next(tarifa);
  }
  obtenerTarifa$(): Observable<TarifaModel>{
    return this.actualizarFormulario.asObservable();
  }
}
