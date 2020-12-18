import { Component, OnInit } from '@angular/core';
<<<<<<< Updated upstream
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
=======
>>>>>>> Stashed changes
import {Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { AppState } from '../../../app.reducer';
import { PistaReservaModel } from '../models/pistaReservaModel';
import { EnReserva } from '../redux/store/reserva.actions';
import { ReservasService } from '../reservas.service';

<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
@Component({
  selector: 'app-detalle-reservas',
  templateUrl: './detalle-reservas.component.html',
  styleUrls: ['./detalle-reservas.component.css']
})
export class DetalleReservasComponent implements OnInit {

  formulario: FormGroup;
  datosReserva: PistaReservaModel;
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
  constructor(private store: Store<AppState>,
              private reservasService: ReservasService,
              private toastr: ToastrService,
              private router: Router,
              private fb: FormBuilder)
  {
    this.formulario = this.fb.group({
      numTarjeta   : ['', [Validators.required, Validators.minLength(12), Validators.maxLength(12)]],
      cvc    : ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      mes    : ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      year    : ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
    });
  }

  ngOnInit(): void {
    this.store.select('reserva').subscribe(
      datos =>{
        this.datosReserva = datos.enReserva
      })
  }

  get numTarjetaNoValido(){
    return this.formulario.get('numTarjeta').invalid && this.formulario.get('numTarjeta').touched;
  }
  get cvcNoValido(){
    return this.formulario.get('cvc').invalid && this.formulario.get('cvc').touched;
  }
  get mesNoValido(){
    return this.formulario.get('mes').invalid && this.formulario.get('mes').touched;
  }
  get yearNoValido(){
    return this.formulario.get('year').invalid && this.formulario.get('year').touched;
  }

  pagar(){

    //Control de validación del formulario
    if(this.formulario.invalid){

      return Object.values(this.formulario.controls).forEach( control =>{

        if(control instanceof FormGroup){
          Object.values(control.controls).forEach(control => control.markAsTouched());
        }else{
          control.markAsTouched();
        }

        control.markAsTouched();
      });
    }

    //Cargar datos del formulario
    const datosTarjeta: any = {
      numTarjeta: this.formulario.get('numTarjeta')?.value,
      cvc: this.formulario.get('cvc')?.value,
      mes: this.formulario.get('mes')?.value,
      year: this.formulario.get('year')?.value,
    }

    //this.toastr.success("La reserva con ID: "+ this.datosReserva.Id_reserva + " se ha confirmado");
    const confirmacion: PistaReservaModel = {Id_reserva: this.datosReserva.Id_reserva, Id_estado: 2}
    this.reservasService.updateReserva(confirmacion).subscribe(
      confirmado =>{
        if(confirmado["Retcode"] === 0){
          const datosR: PistaReservaModel = {
            Fecha: this.datosReserva.Fecha,
            H_ini: this.datosReserva.H_ini,
            H_fin: this.datosReserva.H_fin,
            Pista: this.datosReserva.Pista,
            Id_pista: this.datosReserva.Id_pista,
            Id_usuario: this.datosReserva.Id_usuario,
            Id_reserva: this.datosReserva.Id_reserva,
            Instalacion: this.datosReserva.Instalacion,
            Id_estado: 2,
            Precio: 0,
            Horas: 0,
          }
          this.store.dispatch(new EnReserva({reserva: datosR}));
          this.router.navigate(['/reservas/confirmacion']);
        }
      }
    )
  }

}

