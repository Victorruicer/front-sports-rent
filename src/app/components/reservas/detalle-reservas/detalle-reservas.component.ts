import { Component, OnInit, Output } from '@angular/core';
import {Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { AppState } from '../../../app.reducer';
import { PistaPagada } from '../../gestion-pistas/redux/store/pistas.actions';
import { PistaReservaModel } from '../models/pistaReservaModel';
import { EnReserva } from '../redux/store/reserva.actions';
import { ReservasService } from '../reservas.service';



@Component({
  selector: 'app-detalle-reservas',
  templateUrl: './detalle-reservas.component.html',
  styleUrls: ['./detalle-reservas.component.css']
})
export class DetalleReservasComponent implements OnInit {

  datosReserva: PistaReservaModel;
  @Output() pagada: boolean;

  constructor(private store: Store<AppState>,
              private reservasService: ReservasService,
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit(): void {
      this.store.select('reserva').subscribe(
        datos =>{
          this.datosReserva = datos.enReserva
        })
  }

  pagar(){

    //this.toastr.success("La reserva con ID: "+ this.datosReserva.Id_reserva + " se ha confirmado");
    const confirmacion: PistaReservaModel = {Id_reserva: this.datosReserva.Id_reserva, Id_estado: 2}
    this.reservasService.updateReserva(confirmacion).subscribe(
      confirmado =>{
        if(confirmado["Retcode"] === 0){
          this.router.navigate(['/reservas/confirmacion']);
        }
      }
    )
  }

}

