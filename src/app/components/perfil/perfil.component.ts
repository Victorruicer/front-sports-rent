import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DatosLogin } from '../ident/models/datosLogin';
import { PerfilService } from './perfil.service';
import { AppState } from '../../app.reducer';
import { UpdateCurrentUser } from '../ident/redux/store/login.actions';
import { ToastrService } from 'ngx-toastr';
import { HistorialReservas } from './redux/store/perfil.actions';
import { iif } from 'rxjs';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor(private router:Router,
             private perfilService: PerfilService,
             private store: Store<AppState>) {

  }

  ngOnInit(): void {
    var currentUser = JSON.parse(sessionStorage.getItem('login'));
    if(currentUser.isAuthenticated){
    //recuperamos historico del usuario y las cargamos en el store
    this.perfilService.historicoReservas(currentUser.user.Email, "finalizada").subscribe(
      listaReservas => {
        console.log("lista de reservas : "+ listaReservas[0].Id_Reserva)
        this.store.dispatch(new HistorialReservas({lista: listaReservas}));
      })
    }else{
      //Si no hay ningún usuario logado se vuelve al home
      this.router.navigateByUrl('#');
    }
  }
}
