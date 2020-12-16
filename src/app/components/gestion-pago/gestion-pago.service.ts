import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PagoModel } from './models/pagoModel';

@Injectable({
  providedIn: 'root'
})
export class GestionPagoService {

  private checkoutUrl = "/api/gestionPago/checkout";

  constructor(private http: HttpClient) { }

  checkout(datosPago: PagoModel): Observable<PagoModel>{
    return this.http.post<PagoModel>(environment.apiUrl + this.checkoutUrl, datosPago);
  }


}
