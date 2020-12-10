import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { PerfilService } from '../perfil.service';
import { DatosLogin } from '../../ident/models/datosLogin';
import { ReservasUser } from '../models/reservasUser';

@Component({
  selector: 'app-historial-alquiler',
  templateUrl: './historial-alquiler.component.html',
  styleUrls: ['./historial-alquiler.component.css']
})
export class HistorialAlquilerComponent implements OnInit {

  reservas: ReservasUser[] =[];
  usuario: DatosLogin;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {

    //Nos subscribimos a la propiedad login del AppState para mantener la vista actualizada
    this.store.select('login').subscribe(currentUser => {
      //si hay usuario logado
      if(currentUser.isAuthenticated){
        //Cargamos datos del usuario
        this.usuario = currentUser.user;
      }
    });
    //Nos subscribimos a la propiedad perfil del AppState para cargar el historial
    this.store.select('perfil').subscribe(historial => {
      this.reservas = historial.historialReservas
    });
  }

}
