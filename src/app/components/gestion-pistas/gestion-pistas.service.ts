import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PistaModel } from './models/PistaModel';


@Injectable({
  providedIn: 'root'
})
export class GestionPistasService {

  private listUrl = "/api/pista/listPistas";
  private deleteUrl = "/api/pista/deletePista";
  private updateUrl = "/api/pista/updatePista";
  private createUrl = "/api/pista/createPista";

  lista: PistaModel[] = [];
  private actualizarFormulario = new BehaviorSubject<PistaModel>({} as any);

  constructor(private http: HttpClient) { }

  getListaPistas(){
    this.http.get<PistaModel[]>(environment.apiUrl + this.listUrl).toPromise().then(data => {this.lista = data as PistaModel[]});
  }

  getPistas(){
    return this.http.get<PistaModel[]>(environment.apiUrl + this.listUrl);
  }

  borrarPista(id: number): Observable<PistaModel>{
    const pistaID = { ID_Pista: id };
    return this.http.post<PistaModel>(environment.apiUrl + this.deleteUrl, pistaID);
  }

  crearPista(pistaData: PistaModel): Observable<PistaModel>{
    return this.http.post<PistaModel>(environment.apiUrl + this.createUrl, pistaData);
  }

  actualizarPista(pista: PistaModel): Observable<PistaModel>{
    return this.http.post<PistaModel>(environment.apiUrl + this.updateUrl, pista);
  }


  //Actualizar formulario
  actualizar(pista: PistaModel){
    this.actualizarFormulario.next(pista);
  }
  obtenerPista$(): Observable<PistaModel>{
    return this.actualizarFormulario.asObservable();
  }
}
