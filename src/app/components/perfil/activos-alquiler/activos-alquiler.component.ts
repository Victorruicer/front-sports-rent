import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { AppState } from 'src/app/app.reducer';
import { ReservasUser } from '../models/reservasUser';
import { PerfilService } from '../perfil.service';
import { ReservasActivas } from '../redux/store/perfil.actions';

@Component({
  selector: 'app-activos-alquiler',
  templateUrl: './activos-alquiler.component.html',
  styleUrls: ['./activos-alquiler.component.css']
})
export class ActivosAlquilerComponent implements OnInit {

  listaReservas: ReservasUser[] = [];


  constructor(private store: Store<AppState>,
             private perfilService: PerfilService,
             private router: Router,
             private toastr: ToastrService) { }

  ngOnInit(): void {
    var currentUser = JSON.parse(sessionStorage.getItem('login'));
    if(currentUser.isAuthenticated){
      //recuperamos historico del usuario y las cargamos en el store
      this.perfilService.historicoReservas(currentUser.user.Email, "en reserva").subscribe(
        listaReservas => {
          if(listaReservas.length > 0){
            this.store.dispatch(new ReservasActivas({lista: listaReservas}));
            this.listaReservas = listaReservas
          }else{
            console.log("borramos historial");
            this.store.dispatch(new ReservasActivas({lista: null}));
          }
        })
    }else{
      //Si no hay ningún usuario logado se vuelve al home
      this.router.navigateByUrl('/home');
    }
  }

  cancelarReserva(idReserva:number){
    if(confirm('¿Estás seguro de que quieres cancelar esta reserva?')){
      var currentUser = JSON.parse(sessionStorage.getItem('login'));
      if(currentUser.isAuthenticated){
        //Borramos la reserva
        this.perfilService.borrarReserva(idReserva).subscribe(data => {
          //Refrescamos la lista de reservas
          this.perfilService.historicoReservas(currentUser.user.Email, "en reserva").subscribe(
            listaReservas => {
              if(listaReservas.length > 0){
                this.store.dispatch(new ReservasActivas({lista: listaReservas}));
                this.listaReservas = listaReservas
              }else{
                console.log("borramos historial");
                this.store.dispatch(new ReservasActivas({lista: null}));
              }
            })
          if(data['Retcode'] === 0){
            this.toastr.success("La reserva se ha cancelado correctamente");
          }else{
            this.toastr.error("No se ha podido cancelar la reserva");
          }
        });
      }else{
        this.toastr.error("Tienes que estar logado");
      }
    }
  }
}
