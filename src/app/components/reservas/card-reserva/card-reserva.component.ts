import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { PistaReservaModel } from '../models/pistaReservaModel';
import { AppState } from '../../../app.reducer';
import { ReservasService } from '../reservas.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { EnReserva } from '../redux/store/reserva.actions';

@Component({
  selector: 'app-card-reserva',
  templateUrl: './card-reserva.component.html',
  styleUrls: ['./card-reserva.component.css']
})
export class CardReservaComponent implements OnInit {

  @Input() pista: string;
  @Input() fecha: string;
  horarios: string[];
  formulario: FormGroup;
  datosPista: PistaReservaModel;
  precioFinal = 0;
  totalHoras = 0 ;
  cambia = true;
  radios = false;
  verDetalleReserva = false;
  pagada: number;

  constructor(private fb: FormBuilder,
              private store: Store<AppState>,
              private reservasService: ReservasService,
              private toastr: ToastrService,
              private router: Router) {
    this.crearFormulario();
    this.pagada = 1;
   }

  ngOnInit(): void {
    this.store.select('reserva').subscribe(
      reservas =>{
        reservas.pistasDisponibles.map(
          pista => {
            if(pista.Pista == this.pista){
              this.datosPista = pista;
              this.horarios = this.creaSelectHorario(this.datosPista.LibresReservadas, this.cambia);
            }
          })
        }
        )
    }

    //al cambiar la seleccion del radio cambiamos los valores del select que se mostrará
    cambiaHora(evt) {
      if(evt.target.value == "option1"){
        this.totalHoras = 1;
        this.cambia = true;
        this.radios = true;
        this.precioFinal = this.datosPista.Precio_hora;
      }else{
        this.totalHoras = 2;
        this.radios = true;
        this.cambia = false;
        this.precioFinal = this.datosPista.Precio_hora * this.totalHoras;
      }
      this.horarios = this.creaSelectHorario(this.datosPista.LibresReservadas, this.cambia);
    }

  crearFormulario(){

    this.formulario = this.fb.group({
      horaUno: ['', Validators.required],
      horaDos: ['', Validators.required],
      radio: ['', Validators.required]
    });
  }

  limpiar(){
    this.precioFinal = 0;
    this.radios = false;
    this.formulario.reset();
  }

  creaSelectHorario(horas: string[], opcion: boolean){
    var ini = 8;
    var selecthora = [];
      //console.log("las horas "+horas)
      for(var x = 0; x < horas.length; x++){
        if(horas[x] == "libre"){
          switch(x){
            case (horas.length -2):
              if(opcion){
                selecthora.push(this.transformaHora(ini, opcion));
              }
              break;
            default:
              if(opcion){
                selecthora.push(this.transformaHora(ini, opcion));
              }else{
                if(horas[x+1] != 'reservada'){
                selecthora.push(this.transformaHora(ini, opcion));
                }
              }
              break;
          }
        }
        ini++;
      }
    //console.log("horas libres = "+ selecthora);
    return selecthora;
  }

    transformaHora(ini: number, opcion: boolean) {
      if(opcion){
      var hini = (ini < 10) ? "0"+ini+":00" : ini+":00";
      var hfin = (ini+1 < 10) ? "0"+(ini+1)+":00" : (ini+1)+":00";
      }else{
      var hini = (ini < 10) ? "0"+ini+":00" : ini+":00";
      var hfin = (ini+2 < 10) ? "0"+(ini+1)+":00" : (ini+2)+":00";
      }
      return "de "+hini+" a "+hfin;
    }

  reservar(){

    if(this.formulario.get('radio').value === 'option1'
     || this.formulario.get('radio').value === 'option2'){

    var datosUser = JSON.parse(sessionStorage.getItem('login'));
    var h_ini: string;
    var h_fin: string;

    if(this.formulario.get('radio').value == "option1"){
        var hora = this.formulario.get('horaUno').value;
    }else{
        var hora = this.formulario.get('horaDos').value;
    }
        h_ini = hora.substring(3, 8);
        h_fin = hora.substring(11, 16);

    //Cargar datos del formulario
    const datosR: PistaReservaModel = {
      Fecha: this.datosPista.Fecha,
      H_ini: h_ini,
      H_fin: h_fin,
      Pista: this.datosPista.Pista,
      Id_pista: this.datosPista.Id_pista,
      Id_usuario: datosUser.user.Id_Usuario,
      Instalacion: this.datosPista.Instalacion,
      Id_estado: 1,
      Precio: this.precioFinal,
      Horas: this.totalHoras,
    }

    //RESERVA DE PRUEBA , DEBE RESERVARSE DESDE LA PASARELA DE PAGO

    console.log(datosR);
    this.reservasService.createReserva(datosR).subscribe(
      reserva => {
        if(reserva['Retcode'] === 0){
          this.toastr.success("La reserva con ID: "+ reserva['Id_Reserva'] + " se debe hacer efectiva en 5 minutos");
          const datosReserva: PistaReservaModel = {
            Fecha: this.datosPista.Fecha,
            H_ini: h_ini,
            H_fin: h_fin,
            Pista: this.datosPista.Pista,
            Id_pista: this.datosPista.Id_pista,
            Id_usuario: datosUser.user.Id_Usuario,
            Id_reserva: reserva['Id_Reserva'],
            Instalacion: this.datosPista.Instalacion,
            Id_estado: 1,
            Precio: this.precioFinal,
            Horas: this.totalHoras,
          }
          this.store.dispatch(new EnReserva({reserva: datosReserva}));
          const source = timer(1200000);
          const subscribe = source.subscribe(val => {
            this.store.select('reserva').subscribe(
              pagada => {
                this.pagada = pagada.enReserva.Id_estado
                if(this.pagada != 2){
                  const cancela: PistaReservaModel = {Id_reserva: reserva['Id_Reserva'], Id_estado: 3}
                  this.reservasService.updateReserva(cancela).subscribe(
                    cancelada => {
                      if(cancelada['Retcode'] == 0){
                        console.log("reserva cancelada")
                      }else{
                        console.log(cancelada['Mensaje'])
                      }
                    })
                  this.toastr.success("La reserva ha caducado");
                }
              })
          });
        }else{
          this.toastr.error("Error: la reserva con solicitada no se generó => " + reserva['Mensaje']);
        }
      })


    //PARA CUANDO SE USE RESUMEN
    this.store.dispatch(new EnReserva({reserva: datosR}));
    //this.router.navigate(['gestionPago/resumen']);
    console.log(datosR)
    }else{
      this.toastr.warning("Debes seleccionar el tiempo de reserva");
    }
  }

}



